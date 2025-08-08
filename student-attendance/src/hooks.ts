import { useEffect, useMemo, useState } from 'react';
import type { AttendanceRecord, Student } from './types';
import { storage } from './storage';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(() => storage.getAllStudents());

  useEffect(() => {
    // Keep in sync across tabs
    const handler = () => setStudents(storage.getAllStudents());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const actions = useMemo(
    () => ({
      refresh: () => setStudents(storage.getAllStudents()),
      create: (student: Omit<Student, 'id' | 'createdAt' | 'isActive'> & Partial<Pick<Student, 'isActive'>>) => {
        storage.createStudent(student);
        setStudents(storage.getAllStudents());
      },
      update: (studentId: string, update: Partial<Omit<Student, 'id' | 'createdAt'>>) => {
        storage.updateStudent(studentId, update);
        setStudents(storage.getAllStudents());
      },
      remove: (studentId: string) => {
        storage.deleteStudent(studentId);
        setStudents(storage.getAllStudents());
      },
    }),
    []
  );

  return { students, ...actions };
}

export function useAttendance(date: string) {
  const [records, setRecords] = useState<AttendanceRecord[]>(() => storage.getAttendanceByDate(date));

  useEffect(() => {
    setRecords(storage.getAttendanceByDate(date));
  }, [date]);

  const actions = useMemo(
    () => ({
      setStatus: (studentId: string, status: AttendanceRecord['status'], note?: string) => {
        storage.upsertAttendance({ studentId, date, status, note });
        setRecords(storage.getAttendanceByDate(date));
      },
      remove: (attendanceId: string) => {
        storage.deleteAttendanceById(attendanceId);
        setRecords(storage.getAttendanceByDate(date));
      },
      refresh: () => setRecords(storage.getAttendanceByDate(date)),
    }),
    [date]
  );

  return { records, ...actions };
}