import firebase from 'firebase'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyBYzZw9ndZx8Xh600RxWBeETDOm9CKgIzo",
    authDomain: "manage-rcm.firebaseapp.com",
    databaseURL: "https://manage-rcm.firebaseio.com",
    projectId: "manage-rcm",
    storageBucket: "manage-rcm.appspot.com",
    messagingSenderId: "952151732877"
  };
firebase.initializeApp(config);

  // firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
var currentUser = false;

//get user
auth.onAuthStateChanged(function(user) {
  if(user){ currentUser = user  }
  else {currentUser = false }
});

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const iglesiasCollection = db.collection('Iglesias')

export {
    db,
    auth,
    currentUser,
    iglesiasCollection
}