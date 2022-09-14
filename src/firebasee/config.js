import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY8ZD1P_7yzokiJ7kWPdmJsdn5XJSLDuI",
  authDomain: "cooking-ninja-site-ce34e.firebaseapp.com",
  projectId: "cooking-ninja-site-ce34e",
  storageBucket: "cooking-ninja-site-ce34e.appspot.com",
  messagingSenderId: "622238726180",
  appId: "1:622238726180:web:1fd246c853eec57d8a80b1",
};

// init firebase (connect the frontend to the backend)
firebase.initializeApp(firebaseConfig);

// initialize services
export const projectFirestore = firebase.firestore();

// export { projectFirestore };
