import type { AppData, AttendanceRecord, Student } from './types';

const STORAGE_KEY = 'student_attendance_app_v1';

function readData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { students: [], attendance: [] };
    const parsed = JSON.parse(raw) as AppData;
    return {
      students: parsed.students ?? [],
      attendance: parsed.attendance ?? [],
    };
  } catch (err) {
    console.error('Failed to read storage', err);
    return { students: [], attendance: [] };
  }
}

function writeData(data: AppData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to write storage', err);
  }
}

export const storage = {
  getAllStudents(): Student[] {
    return readData().students;
  },
  getStudentById(studentId: string): Student | undefined {
    return readData().students.find((s) => s.id === studentId);
  },
  createStudent(input: Omit<Student, 'id' | 'createdAt' | 'isActive'> & Partial<Pick<Student, 'isActive'>>): Student {
    const data = readData();
    const newStudent: Student = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      isActive: input.isActive ?? true,
      ...input,
    };
    data.students.push(newStudent);
    writeData(data);
    return newStudent;
  },
  updateStudent(studentId: string, update: Partial<Omit<Student, 'id' | 'createdAt'>>): Student | undefined {
    const data = readData();
    const idx = data.students.findIndex((s) => s.id === studentId);
    if (idx === -1) return undefined;
    const updated: Student = { ...data.students[idx], ...update };
    data.students[idx] = updated;
    writeData(data);
    return updated;
  },
  deleteStudent(studentId: string) {
    const data = readData();
    data.students = data.students.filter((s) => s.id !== studentId);
    // Also delete attendance for that student
    data.attendance = data.attendance.filter((a) => a.studentId !== studentId);
    writeData(data);
  },

  getAttendanceByDate(date: string): AttendanceRecord[] {
    return readData().attendance.filter((a) => a.date === date);
  },
  getAttendanceForStudent(studentId: string): AttendanceRecord[] {
    return readData().attendance.filter((a) => a.studentId === studentId);
  },
  upsertAttendance(record: Omit<AttendanceRecord, 'id' | 'createdAt'> & Partial<Pick<AttendanceRecord, 'id'>>): AttendanceRecord {
    const data = readData();
    const existingIdx = data.attendance.findIndex(
      (a) => a.studentId === record.studentId && a.date === record.date
    );
    let final: AttendanceRecord;
    if (existingIdx !== -1) {
      final = { ...data.attendance[existingIdx], ...record } as AttendanceRecord;
      data.attendance[existingIdx] = final;
    } else {
      final = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...record,
      };
      data.attendance.push(final);
    }
    writeData(data);
    return final;
  },
  deleteAttendanceById(attendanceId: string) {
    const data = readData();
    data.attendance = data.attendance.filter((a) => a.id !== attendanceId);
    writeData(data);
  },

  clearAll() {
    writeData({ students: [], attendance: [] });
  },
};