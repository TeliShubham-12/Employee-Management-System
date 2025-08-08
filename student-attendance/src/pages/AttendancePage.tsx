import { useMemo, useState } from 'react';
import { useAttendance, useStudents } from '../hooks';
import AttendanceTable from '../components/AttendanceTable';

function todayString() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function AttendancePage() {
  const [date, setDate] = useState(todayString());
  const { students } = useStudents();
  const activeStudents = useMemo(() => students.filter((s) => s.isActive), [students]);
  const { records, setStatus } = useAttendance(date);

  return (
    <div className="container">
      <h2>Attendance</h2>

      <div className="toolbar">
        <label>
          <span>Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>

      <AttendanceTable
        students={activeStudents}
        records={records}
        onSetStatus={(studentId, status) => setStatus(studentId, status)}
      />
    </div>
  );
}