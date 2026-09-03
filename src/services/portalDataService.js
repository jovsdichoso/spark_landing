// services/portalDataService.js
//
// Read-only data access for the Patient Portal. Mirrors the shape of
// the SPARK mobile app's services (patientService / assessmentService /
// therapyService / feedbackService) but every function here only ever
// reads — a patient can view their own record, never edit it.

import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebaseConfig'

/**
 * ---------------------------------------------------------
 * PATIENT RECORD (profile + medical info)
 * ---------------------------------------------------------
 * Patients are stored in both `users/{uid}` and `patients/{uid}` in
 * SPARK; `patients/{uid}` carries the fuller clinical record.
 */
export async function getPatientRecord(uid) {
  try {
    const snapshot = await getDoc(doc(db, 'patients', uid))

    if (!snapshot.exists()) {
      return { data: null, error: { message: 'Patient record not found.' } }
    }

    return { data: { id: snapshot.id, ...snapshot.data() }, error: null }
  } catch (error) {
    return {
      data: null,
      error: { message: error.message || 'Unable to load patient record.', code: error.code },
    }
  }
}

/**
 * ---------------------------------------------------------
 * ASSESSMENTS
 * ---------------------------------------------------------
 */
export async function listAssessments(patientId) {
  try {
    const q = query(collection(db, 'assessments'), where('patientId', '==', patientId))
    const snapshot = await getDocs(q)

    const assessments = snapshot.docs
      .map((assessmentDoc) => ({ id: assessmentDoc.id, ...assessmentDoc.data() }))
      .sort((a, b) => getFirestoreTime(b.createdAt) - getFirestoreTime(a.createdAt))

    return { data: assessments, error: null }
  } catch (error) {
    console.error('[SPARK Portal] listAssessments error:', error)
    return { data: [], error: { message: error.message || 'Unable to load assessments.' } }
  }
}

/**
 * ---------------------------------------------------------
 * THERAPY SESSIONS
 * ---------------------------------------------------------
 */
export async function listTherapySessions(patientId) {
  try {
    const q = query(collection(db, 'therapySessions'), where('patientId', '==', patientId))
    const snapshot = await getDocs(q)

    const sessions = snapshot.docs
      .map((sessionDoc) => ({ id: sessionDoc.id, ...sessionDoc.data() }))
      .sort((a, b) => `${b.date || ''} ${b.time || ''}`.localeCompare(`${a.date || ''} ${a.time || ''}`))

    return { data: sessions, error: null }
  } catch (error) {
    console.error('[SPARK Portal] listTherapySessions error:', error)
    return { data: [], error: { message: error.message || 'Unable to load therapy sessions.' } }
  }
}

/**
 * ---------------------------------------------------------
 * FEEDBACK FROM PATHOLOGIST
 * ---------------------------------------------------------
 */
export async function listFeedback(patientId) {
  try {
    const q = query(collection(db, 'feedback'), where('patientId', '==', patientId))
    const snapshot = await getDocs(q)

    const feedback = snapshot.docs
      .map((feedbackDoc) => ({ id: feedbackDoc.id, ...feedbackDoc.data() }))
      .sort((a, b) => getFirestoreTime(b.createdAt) - getFirestoreTime(a.createdAt))

    return { data: feedback, error: null }
  } catch (error) {
    console.error('[SPARK Portal] listFeedback error:', error)
    return { data: [], error: { message: error.message || 'Unable to load feedback.' } }
  }
}

/**
 * ---------------------------------------------------------
 * FIRESTORE TIMESTAMP HELPER
 * ---------------------------------------------------------
 */
export function getFirestoreTime(value) {
  if (!value) return 0
  if (typeof value?.toDate === 'function') return value.toDate().getTime()
  if (typeof value === 'object' && typeof value.seconds === 'number') return value.seconds * 1000
  const time = new Date(value).getTime()
  return Number.isNaN(time) ? 0 : time
}

export function formatFirestoreDate(value, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  const time = getFirestoreTime(value)
  if (!time) return '—'
  return new Date(time).toLocaleDateString(undefined, options)
}
