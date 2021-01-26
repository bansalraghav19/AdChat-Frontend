import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDYdM2fEY-u_izcZw2r6URQnuyadebNVo4",
  authDomain: "imagestorageapp-e8907.firebaseapp.com",
  projectId: "imagestorageapp-e8907",
  storageBucket: "imagestorageapp-e8907.appspot.com",
  messagingSenderId: "209931526",
  appId: "1:209931526:web:1d93b6a7b958f188636287",
  measurementId: "G-WK9VK3GDJN",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };