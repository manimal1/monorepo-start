import {
  Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  runTransaction,
  collection,
  serverTimestamp,
} from 'firebase/firestore';

interface SignupParams {
  auth: Auth;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  password: string;
  type: 'business' | 'customer';
}

const db = getFirestore();

// Function to sign up a user in Firebase app
export async function signup({
  auth,
  email,
  firstName,
  lastName,
  name,
  password,
  type,
}: SignupParams) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    // Step 1: Create User Auth Account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const userID = userCredential.user.uid;

    // Step 2: Run Firestore Transaction
    await runTransaction(db, async (transaction) => {
      // 2A. Create User Document without businessID/customerID
      const userRef = doc(db, 'users', userID);
      transaction.set(userRef, {
        email,
        firstName,
        lastName,
        role: 'owner', // Always "owner" for now
        type,
        businessID: null,
        customerID: null,
        accessRights: {
          read: true,
          write: true,
          chat: true,
          modifyUsers: true,
          modifySettings: true,
        },
      });

      // 2B. Create Business or Customer Document
      const collectionRef = collection(
        db,
        type === 'business' ? 'businesses' : 'customers',
      );
      const newDocRef = doc(collectionRef); // Auto-generate ID

      transaction.set(newDocRef, {
        id: newDocRef.id,
        name,
        ownerID: userID,
        createdAt: serverTimestamp(),
      });

      // 2C. Update User with businessID/customerID
      transaction.update(userRef, {
        [`${type}ID`]: newDocRef.id,
      });
    });

    /* eslint-disable no-console */
    console.log('User and associated entity created successfully!');
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}
