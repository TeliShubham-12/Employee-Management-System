import type { AttendanceRecord, Student } from '../types';

export type AttendanceTableProps = {
  students: Student[];
  records: AttendanceRecord[];
  onSetStatus: (studentId: string, status: AttendanceRecord['status']) => void;
};

const statuses: AttendanceRecord['status'][] = ['present', 'absent', 'late', 'excused'];

export default function AttendanceTable({ students, records, onSetStatus }: AttendanceTableProps) {
  const recordByStudent = new Map(records.map((r) => [r.studentId, r] as const));

  if (students.length === 0) return <p>No students to mark attendance.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Roll No.</th>
          <th>Name</th>
          {statuses.map((s) => (
            <th key={s} className="center">{s}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.map((s) => {
          const rec = recordByStudent.get(s.id);
          const current = rec?.status;
          return (
            <tr key={s.id}>
              <td>{s.rollNumber}</td>
              <td>{s.firstName} {s.lastName}</td>
              {statuses.map((opt) => (
                <td key={opt} className="center">
                  <input
                    type="radio"
                    name={`status-${s.id}`}
                    checked={current === opt}
                    onChange={() => onSetStatus(s.id, opt)}
                  />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}