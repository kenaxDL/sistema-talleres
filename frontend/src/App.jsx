import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AdminPage from './pages/AdminPage.jsx'
import AlumnoPage from './pages/AlumnoPage.jsx'
import { useState } from 'react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link to="/admin" styles={{ marginRight: '1rem' }}>Administrador</Link>
        <Link to="/alumno">Alumno</Link>
      </nav>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/alumno" element={<AlumnoPage />} />
        <Route path="/" element={<div style={{ padding: '1rem' }}>
          Bienvenido al sistema</div>} />
      </Routes>
    </Router>
  )
}

export default App
