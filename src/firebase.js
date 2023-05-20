import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbD95CvkABcw5Asnv7lrqx4KvknCdmgIM",
  authDomain: "spe-unimag.firebaseapp.com",
  databaseURL: "https://spe-unimag-default-rtdb.firebaseio.com",
  projectId: "spe-unimag",
  storageBucket: "spe-unimag.appspot.com",
  messagingSenderId: "88178932667",
  appId: "1:88178932667:web:23ccfbfef1e988f267229e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
