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

async function getAllSurveys(event: any) {
  if (!AuthHelper.isAuthorized(event)) return { statusCode: 401, body: 'Unauthorized' };

  const snapshot = await db.collection('surveys').get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { statusCode: 200, body: JSON.stringify(data) };
}

async function getSurvey(event: any) {
  if (!AuthHelper.isAllowedOrigin(event)) return { statusCode: 403, body: 'Forbidden: Origin not allowed' };

  const id = event.queryStringParameters?.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing id parameter' }) };
  }
  const docRef = db.collection('surveys').doc(id);
  const docSnap = await docRef.get();
  if (!docSnap.exists) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Document not found' }) };
  }
  const data = { id: docSnap.id, ...docSnap.data() };
  return { statusCode: 200, body: JSON.stringify(data) };
}

async function createSurvey(event: any) {
  if (!AuthHelper.isAuthorized(event)) return { statusCode: 401, body: 'Unauthorized' };

  const body = JSON.parse(event.body || '{}');
  const docRef = await db.collection('surveys').add(body);
  return { statusCode: 201, body: JSON.stringify({ id: docRef.id }) };
}

async function updateSurvey(event: any) {
  if (!AuthHelper.isAuthorized(event)) return { statusCode: 401, body: 'Unauthorized' };

  const id = event.queryStringParameters?.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing id parameter' }) };
  }
  const body = JSON.parse(event.body || '{}');
  await db.collection('surveys').doc(id).update(body);
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
}

async function deleteSurvey(event: any) {
  if (!AuthHelper.isAuthorized(event)) return { statusCode: 401, body: 'Unauthorized' };

  const id = event.queryStringParameters?.id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing id parameter' }) };
  }
  await db.collection('surveys').doc(id).delete();
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
}

export const handler: Handler = async (event) => {
  try {
    let response;
    switch (event.httpMethod) {
      case 'GET': {
        const id = event.queryStringParameters?.id;
        if (id) {
          response = await getSurvey(event);
        } else {
          response = await getAllSurveys(event);
        }
        break;
      }
      case 'POST':
        response = await createSurvey(event);
        break;
      case 'PUT':
        response = await updateSurvey(event);
        break;
      case 'DELETE':
        response = await deleteSurvey(event);
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
