import {
  Auth,
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface loginParams {
  auth: Auth;
  email: string;
  password: string;
}

export async function login({ auth, email, password }: loginParams) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Login error:', error);
    throw error;
  }
}
