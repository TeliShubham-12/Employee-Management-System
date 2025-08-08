import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Student } from '../types';

export type StudentFormProps = {
  onSubmit: (student: Omit<Student, 'id' | 'createdAt' | 'isActive'> & Partial<Pick<Student, 'isActive'>>) => void;
};

export default function StudentForm({ onSubmit }: StudentFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [className, setClassName] = useState('');
  const [isActive, setIsActive] = useState(true);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !rollNumber) return;
    onSubmit({ firstName, lastName, email: email || undefined, rollNumber, className: className || undefined, isActive });
    setFirstName('');
    setLastName('');
    setEmail('');
    setRollNumber('');
    setClassName('');
    setIsActive(true);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="grid">
        <label>
          <span>First Name</span>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <label>
          <span>Last Name</span>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>
          <span>Roll Number</span>
          <input value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Class</span>
          <input value={className} onChange={(e) => setClassName(e.target.value)} />
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> Active
        </label>
      </div>
      <button type="submit">Register Student</button>
    </form>
  );
}