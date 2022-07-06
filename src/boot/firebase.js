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
import credentials from "../../config/firebase";

console.log("!!!!", credentials);

/* const firebaseApp = initializeApp(credentials);
firebase.initializeApp(credentials);

const firestore = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);
const storage = firebase.storage();
 */
/* const host = "localhost"

connectFirestoreEmulator(firestore,host,9090)
connectFunctionsEmulator(functions,host, 9093)
storage.useEmulator(host, 9096)
enableIndexedDbPersistence(firestore) */

/* export {
  firebase,
  firestore,
  collection,
  functions,
  httpsCallable,
  storage,
}; */
