// src/firebase/auth.ts
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./firebase-config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signIn = () => signInWithPopup(auth, provider);
export const logOut = () => signOut(auth);
export { auth };
