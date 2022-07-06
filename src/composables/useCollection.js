import { ref } from "vue";
import { firebase } from "boot/firebase";
import { collection } from "firebase/firestore";
// declare the connection & refs inside the function
// because the collection state is not global (like a user)
// different collections may be used at once this way

const useCollection = ($collection) => {
  const error = ref(null);

  let _colRef = collection(firebase, $collection);

  const addDoc = async (doc) => {
    error.value = null;

    try {
      await _colRef.add(doc);
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
    }
  };

  return { error, addDoc };
};

export default useCollection;
