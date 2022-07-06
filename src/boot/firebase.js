import _ from "lodash";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {
  collection,
  getFirestore /* , enableIndexedDbPersistence, connectFirestoreEmulator */,
} from "firebase/firestore";
import {
  httpsCallable,
  getFunctions /* , connectFunctionsEmulator */,
} from "firebase/functions";
import "firebase/compat/storage";

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATA_BASE_URL,
  projectId: process.env.PROJECT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
};

const firebaseApp = initializeApp(config);
firebase.initializeApp(config);

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);
const storage = firebase.storage();

/* const host = "localhost"

connectFirestoreEmulator(firestore,host,9090)
connectFunctionsEmulator(functions,host, 9093)
storage.useEmulator(host, 9096)
enableIndexedDbPersistence(firestore) */

export {
  firebase,
  auth,
  firestore,
  collection,
  functions,
  httpsCallable,
  storage,
};
