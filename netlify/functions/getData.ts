import { type Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });
}

export const handler: Handler = async (event) => {
  try {
    const db = admin.firestore();
    const id = event.queryStringParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing id parameter' }),
      };
    }

    const docRef = db.collection('surveys').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Document not found' }),
      };
    }

    const data = { id: docSnap.id, ...docSnap.data() };

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
