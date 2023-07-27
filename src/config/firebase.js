import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { FIREBASE_CONFIG } from "../data/constants";

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

export { db };
