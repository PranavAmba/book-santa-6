import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDbsitzcGH_XHLYGueUUvFRX0HrpDzhN5M",
    authDomain: "booksanta-c4c18.firebaseapp.com",
    databaseURL: "https://booksanta-c4c18.firebaseio.com",
    projectId: "booksanta-c4c18",
    storageBucket: "booksanta-c4c18.appspot.com",
    messagingSenderId: "844113989342",
    appId: "1:844113989342:web:7a614ab6665fc3b0f57c4f"
  };

firebase.initializeApp(firebaseConfig)
export default firebase.firestore()
