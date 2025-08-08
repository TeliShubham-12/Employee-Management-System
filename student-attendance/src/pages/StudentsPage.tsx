import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import { useStudents } from '../hooks';

export default function StudentsPage() {
  const { students, create, remove } = useStudents();

  return (
    <div className="container">
      <h2>Student Registration</h2>
      <StudentForm onSubmit={create} />

      <h3>All Students</h3>
      <StudentList students={students} onDelete={remove} />
    </div>
  );
}