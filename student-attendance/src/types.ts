export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  rollNumber: string;
  className?: string;
  createdAt: string; // ISO timestamp
  isActive: boolean;
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  date: string; // yyyy-mm-dd
  status: 'present' | 'absent' | 'late' | 'excused';
  note?: string;
  createdAt: string; // ISO timestamp
};

export type AppData = {
  students: Student[];
  attendance: AttendanceRecord[];
};