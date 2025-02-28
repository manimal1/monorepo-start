import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const accountKeyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH ?? '';
const serviceAccount = require(accountKeyPath);

initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

export { db };
