import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import AttendancePage from './pages/AttendancePage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>Student Registration & Attendance</h1>
        <nav>
          <NavLink to="/" end>Students</NavLink>
          <NavLink to="/attendance">Attendance</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<StudentsPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span>Local-only demo app</span>
        <a href="https://react.dev" target="_blank">React</a>
      </footer>
    </BrowserRouter>
  );
}
