import {
  doc,
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  serverTimestamp,
  type Unsubscribe
} from 'firebase/firestore';
import { db } from './firebase';
import { ReportState, initialReportData } from './report-data';
import { YearEndReportState, initialYearEndReportData } from './year-end-data';
import { TeacherRecord, INITIAL_TEACHERS_SEED } from './teacher-data';

const REPORT_DOC_PATH = 'schoolReports/rok_primary';
const YEAREND_REPORT_DOC_PATH = 'schoolReports/rok_primary_yearend';
const TEACHERS_COLLECTION = 'teacherData';

/**
 * Real-time subscription to the Year-End School Report document in Firestore.
 */
export function subscribeYearEndReport(
  onData: (data: YearEndReportState) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const reportRef = doc(db, YEAREND_REPORT_DOC_PATH);

  return onSnapshot(
    reportRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const cloudData = snapshot.data() as YearEndReportState;
        onData(cloudData);
      } else {
        setDoc(reportRef, {
          ...initialYearEndReportData,
          _updatedAt: serverTimestamp()
        }).catch((e) => console.warn('Init year-end report doc error:', e));
        onData(initialYearEndReportData);
      }
    },
    (err) => {
      console.error('Firestore year-end report subscribe error:', err);
      onError?.(err);
    }
  );
}

/**
 * Save / update the Year-End School Report in Firestore.
 */
export async function saveYearEndReportToFirestore(data: YearEndReportState): Promise<void> {
  const reportRef = doc(db, YEAREND_REPORT_DOC_PATH);
  await setDoc(reportRef, {
    ...data,
    _updatedAt: serverTimestamp()
  }, { merge: true });
}

/**
 * Real-time subscription to the School Report document in Firestore.
 */
export function subscribeSchoolReport(
  onData: (data: ReportState) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const reportRef = doc(db, REPORT_DOC_PATH);

  return onSnapshot(
    reportRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const cloudData = snapshot.data() as ReportState;
        onData(cloudData);
      } else {
        // If not exists in Firestore yet, initialize it with defaults
        setDoc(reportRef, {
          ...initialReportData,
          _updatedAt: serverTimestamp()
        }).catch((e) => console.warn('Init report doc error:', e));
        onData(initialReportData);
      }
    },
    (err) => {
      console.error('Firestore school report subscribe error:', err);
      onError?.(err);
    }
  );
}

/**
 * Save / update the School Report in Firestore.
 */
export async function saveSchoolReportToFirestore(data: ReportState): Promise<void> {
  const reportRef = doc(db, REPORT_DOC_PATH);
  await setDoc(reportRef, {
    ...data,
    _updatedAt: serverTimestamp()
  }, { merge: true });
}

/**
 * Real-time subscription to Teacher Data collection in Firestore.
 */
export function subscribeTeachers(
  onData: (teachers: TeacherRecord[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const teachersCol = collection(db, TEACHERS_COLLECTION);

  return onSnapshot(
    teachersCol,
    async (snapshot) => {
      if (snapshot.empty) {
        // Seed initial teacher data if completely empty
        try {
          for (const teacher of INITIAL_TEACHERS_SEED) {
            const tDoc = doc(db, TEACHERS_COLLECTION, teacher.id || `t_${Date.now()}`);
            await setDoc(tDoc, {
              ...teacher,
              _updatedAt: serverTimestamp()
            });
          }
        } catch (e) {
          console.warn('Teacher seeding error:', e);
        }
        onData(INITIAL_TEACHERS_SEED);
      } else {
        const teachers: TeacherRecord[] = [];
        let hasDummyData = false;
        snapshot.forEach((docSnap) => {
          const tData = docSnap.data();
          if (docSnap.id.startsWith('t-')) {
            hasDummyData = true;
          }
          teachers.push({
            id: docSnap.id,
            teacherName: (tData.teacherName as string) || '',
            ...tData
          } as TeacherRecord);
        });

        // If old placeholder data exists, seamlessly replace with 22 real records
        if (hasDummyData) {
          try {
            for (const docSnap of snapshot.docs) {
              if (docSnap.id.startsWith('t-')) {
                await deleteDoc(docSnap.ref);
              }
            }
            for (const teacher of INITIAL_TEACHERS_SEED) {
              const tDoc = doc(db, TEACHERS_COLLECTION, teacher.id || teacher.teacherId || `t_${Date.now()}`);
              await setDoc(tDoc, {
                ...teacher,
                _updatedAt: serverTimestamp()
              });
            }
          } catch (migrationErr) {
            console.warn('Auto migration error:', migrationErr);
          }
          onData(INITIAL_TEACHERS_SEED);
          return;
        }

        onData(teachers);
      }
    },
    (err) => {
      console.error('Firestore teachers subscribe error:', err);
      onError?.(err);
    }
  );
}

/**
 * Save or update a single teacher record in Firestore.
 */
export async function saveTeacherToFirestore(teacher: TeacherRecord): Promise<string> {
  const recordId = teacher.id || `t_${Date.now()}`;
  const teacherRef = doc(db, TEACHERS_COLLECTION, recordId);

  // Clean data
  const dataToSave = { ...teacher, id: recordId, _updatedAt: serverTimestamp() };
  await setDoc(teacherRef, dataToSave, { merge: true });
  return recordId;
}

/**
 * Delete a teacher record in Firestore.
 */
export async function deleteTeacherFromFirestore(id: string): Promise<void> {
  const teacherRef = doc(db, TEACHERS_COLLECTION, id);
  await deleteDoc(teacherRef);
}

/**
 * Re-seed / restore initial teacher records into Firestore.
 */
export async function resetTeachersInFirestore(): Promise<void> {
  const teachersCol = collection(db, TEACHERS_COLLECTION);
  const snap = await getDocs(teachersCol);
  for (const d of snap.docs) {
    await deleteDoc(d.ref);
  }
  for (const teacher of INITIAL_TEACHERS_SEED) {
    const tDoc = doc(db, TEACHERS_COLLECTION, teacher.id || `t_${Date.now()}`);
    await setDoc(tDoc, {
      ...teacher,
      _updatedAt: serverTimestamp()
    });
  }
}
