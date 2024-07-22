import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDGXBVRPVtZ4-h955aG4BR6aQuXJfP9754",
  authDomain: "projectmanager-ec087.firebaseapp.com",
  projectId: "projectmanager-ec087",
  storageBucket: "projectmanager-ec087.appspot.com",
  messagingSenderId: "32945221392",
  appId: "1:32945221392:web:2601462b6c5aadff2bbf95"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }