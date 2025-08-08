import type { Student } from '../types';

export type StudentListProps = {
  students: Student[];
  onDelete?: (studentId: string) => void;
};

export default function StudentList({ students, onDelete }: StudentListProps) {
  if (students.length === 0) return <p>No students yet. Add your first student.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Roll No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Class</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.rollNumber}</td>
            <td>{s.firstName} {s.lastName}</td>
            <td>{s.email || '-'}</td>
            <td>{s.className || '-'}</td>
            <td>{s.isActive ? 'Active' : 'Inactive'}</td>
            <td>
              {onDelete && (
                <button className="danger" onClick={() => onDelete(s.id)}>Delete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}