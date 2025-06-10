import { type Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';
import { AuthHelper } from './utils/helpers';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();

async function getSurveyLogs(event: any) {
  if (!AuthHelper.isAuthorized(event)) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };

  const surveyId = event.queryStringParameters?.surveyId;
  if (!surveyId) return { statusCode: 400, body: JSON.stringify({ error: 'Missing surveyId parameter' }) };

  const ipsColRef = db.collection('surveyLogs').doc(surveyId).collection('ips');
  const ipsSnap = await ipsColRef.get();

  const data = await Promise.all(
    ipsSnap.docs.map(async (ipDoc) => {
      const usersColRef = ipDoc.ref.collection('users');
      const usersSnap = await usersColRef.get();
      return {
        ip: ipDoc.id,
        users: usersSnap.docs.map((doc) => ({ userId: doc.id, ...doc.data() })),
      };
    })
  );

  return { statusCode: 200, body: JSON.stringify(data) };
}

async function createSurveyLog(event: any) {
  if (!AuthHelper.isAllowedOrigin(event)) return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden: Origin not allowed' }) };
  
  const body = JSON.parse(event.body || '{}');
  const { surveyId, userId, eventType } = body;

  if (!surveyId || !userId || !eventType) return { statusCode: 400, body: JSON.stringify({ error: 'Missing surveyId, userId or eventType' }) };
  if (!['load', 'answer'].includes(eventType)) return { statusCode: 400, body: JSON.stringify({ error: 'Invalid eventType' }) };

  const surveyDoc = await db.collection('surveys').doc(surveyId).get();
  if (!surveyDoc.exists) return { statusCode: 404, body: JSON.stringify({ error: 'Survey not found' }) };

  const newLog = { eventType, timestamp: new Date().toISOString() };
  const ip = getClientIp(event.headers, event.ip) || 'none';
  const userLogRef = db.collection('surveyLogs').doc(surveyId).collection('ips').doc(ip).collection('users').doc(userId);

  await userLogRef.set({ logs: admin.firestore.FieldValue.arrayUnion(newLog) }, { merge: true });
  return { statusCode: 201, body: JSON.stringify({ success: true }) };
}

function getClientIp(headers: Record<string, string | undefined>, fallbackIp?: string): string | null {
  const lowerCaseHeaders: Record<string, string | undefined> = {};
  for (const key in headers) lowerCaseHeaders[key.toLowerCase()] = headers[key];

  const xForwardedFor = lowerCaseHeaders['x-forwarded-for'];
  if (xForwardedFor) return xForwardedFor.split(',')[0].trim();

  const alternativeHeaders = [
    'client-ip',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip',
    'fastly-client-ip',
    'true-client-ip',
    'x-cluster-client-ip',
    'x-forwarded',
    'forwarded-for',
    'forwarded',
  ];

  for (const header of alternativeHeaders) {
    const value = lowerCaseHeaders[header];
    if (value) return value.trim();
  }

  return fallbackIp ?? null;
}

export const handler: Handler = async (event) => {
  try {
    let response;
    switch (event.httpMethod) {
      case 'GET':
        response = await getSurveyLogs(event);
        break;
      case 'POST':
        response = await createSurveyLog(event);
        break;
      default:
        response = { statusCode: 405, body: 'Method Not Allowed' };
    }
    return { ...response, headers: AuthHelper.corsHeaders() };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }), headers: AuthHelper.corsHeaders() };
  }
};
