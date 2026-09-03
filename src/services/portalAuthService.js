// services/portalAuthService.js
//
// Auth for the Patient Web Portal. Deliberately narrow: a patient can
// sign in, sign out, view their own profile, and change their own
// password. Nothing here writes to another patient's data, assigns
// therapy, etc. — that stays Pathologist-only in the mobile app.

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { auth, db } from '../lib/firebaseConfig'

/**
 * ---------------------------------------------------------
 * SIGN IN
 * ---------------------------------------------------------
 * Only allows role === 'patient' accounts through this portal. A
 * Pathologist account (or anything else) is signed back out
 * immediately with a clear error.
 */
export async function signInPatient(email, password) {
  try {
    const cleanEmail = email.trim().toLowerCase()

    const credential = await signInWithEmailAndPassword(auth, cleanEmail, password)
    const user = credential.user

    const profileRef = doc(db, 'users', user.uid)
    const profileSnap = await getDoc(profileRef)

    if (!profileSnap.exists() || profileSnap.data()?.role !== 'patient') {
      await firebaseSignOut(auth)

      return {
        data: null,
        error: { message: 'This account does not have access to the Patient Portal.' },
      }
    }

    return {
      data: {
        user,
        profile: { id: profileSnap.id, ...profileSnap.data() },
      },
      error: null,
    }
  } catch (error) {
    console.error('[SPARK Portal] Sign in error:', error)

    return {
      data: null,
      error: {
        message: getAuthErrorMessage(error),
        code: error.code,
      },
    }
  }
}

/**
 * ---------------------------------------------------------
 * SIGN OUT
 * ---------------------------------------------------------
 */
export async function signOutPatient() {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error) {
    console.error('[SPARK Portal] Sign out error:', error)
    return { error: { message: error.message || 'Unable to sign out.' } }
  }
}

/**
 * ---------------------------------------------------------
 * LISTEN FOR AUTH CHANGES
 * ---------------------------------------------------------
 */
export function subscribeToPortalAuthChanges(callback) {
  return onAuthStateChanged(auth, callback)
}

/**
 * ---------------------------------------------------------
 * GET PATIENT PROFILE
 * ---------------------------------------------------------
 */
export async function getPatientProfile(uid) {
  try {
    const snapshot = await getDoc(doc(db, 'users', uid))

    if (!snapshot.exists()) {
      return { data: null, error: { message: 'Profile not found.' } }
    }

    return { data: { id: snapshot.id, ...snapshot.data() }, error: null }
  } catch (error) {
    return {
      data: null,
      error: { message: error.message || 'Unable to load profile.', code: error.code },
    }
  }
}

/**
 * ---------------------------------------------------------
 * CHANGE OWN PASSWORD
 * ---------------------------------------------------------
 * Requires re-authenticating with the current password first (Firebase
 * requires a "recent" login before allowing a password change). This is
 * what a patient uses to replace the temporary password from their
 * welcome email.
 */
export async function changeOwnPassword(currentPassword, newPassword) {
  try {
    const user = auth.currentUser

    if (!user || !user.email) {
      return { error: { message: 'Your session has expired. Please sign in again.' } }
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)
    await updatePassword(user, newPassword)

    return { error: null }
  } catch (error) {
    console.error('[SPARK Portal] Change password error:', error)
    return { error: { message: getAuthErrorMessage(error), code: error.code } }
  }
}

/**
 * ---------------------------------------------------------
 * ERROR TRANSLATOR
 * ---------------------------------------------------------
 */
function getAuthErrorMessage(error) {
  switch (error?.code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.'
    case 'auth/weak-password':
      return 'New password must be at least 6 characters.'
    default:
      return error?.message || 'Something went wrong. Please try again.'
  }
}
