import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import ProfilePage from './pages/profile/ProfilePage';

import Home from './pages/Home';
import LoginPage from './pages/auth/Login';
import CoursesPage from './pages/courses/CoursesPage';
import CourseDetail from './pages/courses/CourseDetail';
import RegisterPage from './pages/auth/Register';
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactPage';
import ArtikelPage from './pages/artikel/ArticlePage';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Halaman Login dan Register */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Halaman Kursus */}


          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          {/* Fallback Route */}

          <Route path='/about' element={<AboutPage/>} />

          <Route path='/contact' element={<ContactPage/>} />

          <Route path="/artikel" element={<ArtikelPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;