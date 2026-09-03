// lib/firebaseConfig.js
//
// Firebase Web SDK init for the Patient Web Portal. This points at the
// SAME Firebase project as the SPARK mobile app (see
// spark-mobile-app/src/lib/firebaseConfig.js) so that a patient created
// by a Pathologist in the mobile app can log in here with the same
// email + password, and reads the exact same Firestore data.

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAfSw70b-p5k8W42IyMe3H--APp_GaASpQ',
  authDomain: 'vitasense-14c8b.firebaseapp.com',
  projectId: 'vitasense-14c8b',
  storageBucket: 'vitasense-14c8b.firebasestorage.app',
  messagingSenderId: '653680604772',
  appId: '1:653680604772:web:ea543193ea09024b9d1171',
  measurementId: 'G-TGRKG6HG4G',
}

// Prevent Firebase from being initialized more than once (matters with
// Vite's fast refresh in dev).
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const db = getFirestore(app)

// Keep the patient signed in across page reloads/browser restarts,
// same as the mobile app's AsyncStorage-backed persistence.
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('[SPARK Portal] Failed to set auth persistence:', error)
})

export { app, auth, db }
export default app
