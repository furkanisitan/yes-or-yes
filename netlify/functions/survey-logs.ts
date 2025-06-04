import { type Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();

async function getSurveyLogs(event: any) {
  const surveyId = event.queryStringParameters?.surveyId;
  const userId = event.queryStringParameters?.userId;

  if (!surveyId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing surveyId parameter' }) };
  }

  if (userId) {
    // surveyLogs/{surveyId}/users/{userId}
    const userDocRef = db.collection('surveyLogs').doc(surveyId).collection('users').doc(userId);
    const userDocSnap = await userDocRef.get();
    if (!userDocSnap.exists) {
      return { statusCode: 404, body: JSON.stringify({ error: 'User log not found' }) };
    }
    const data = { userId: userDocSnap.id, ...userDocSnap.data() };
    return { statusCode: 200, body: JSON.stringify(data) };
  } else {
    // surveyLogs/{surveyId}/users
    const usersColRef = db.collection('surveyLogs').doc(surveyId).collection('users');
    const usersSnap = await usersColRef.get();
    const data = usersSnap.docs.map((doc) => ({ userId: doc.id, ...doc.data() }));
    return { statusCode: 200, body: JSON.stringify(data) };
  }
}

async function createSurveyLog(event: any) {
  const body = JSON.parse(event.body || '{}');
  const { surveyId, userId, type } = body;
  if (!surveyId || !userId || !type) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing surveyId, userId or type' }) };
  }

  if (!['login', 'correct'].includes(type)) return { statusCode: 400, body: JSON.stringify({ error: 'Invalid type' }) };

  const surveyDoc = await db.collection('surveys').doc(surveyId).get();
  if (!surveyDoc.exists) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Survey not found' }) };
  }

  const userLogRef = db.collection('surveyLogs').doc(surveyId).collection('users').doc(userId);

  const newLog = {
    type,
    timestamp: new Date().toISOString(),
    ip: getClientIp(event.headers, event.ip),
  };

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
    switch (event.httpMethod) {
      case 'GET':
        return await getSurveyLogs(event);
      case 'POST':
        return await createSurveyLog(event);
      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
