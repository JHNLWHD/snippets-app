import firebase from 'firebase-admin'

export type FirebaseDocument = firebase.firestore.DocumentData

export type Document = { document?: FirebaseDocument }
