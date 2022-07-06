import _ from "lodash";
import { ref, watchEffect } from "vue";
import { firestore } from "boot/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const getCollection = (_collection) => {
  const documents = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  let collectionRef = collection(firestore, _collection);

  const unsub = onSnapshot(
    collectionRef,
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        // must wait for the server to create the timestamp & send it back
        // we don't want to edit data until it has done this

        results.push(_.extend({ ...doc.data() }, { id: doc.id }));
      });
      console.log("results:", results);
      // update values
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub());
  });
  if (_.isNull(error.value)) {
    return documents;
  } else {
    return error;
  }
};

export default getCollection;
