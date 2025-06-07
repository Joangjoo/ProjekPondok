import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import CoursesPage from './pages/courses/CoursesPage';
import CourseDetail from './pages/courses/CourseDetail';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminMembers from './pages/admin/AdminMembers';

import MemberDashboard from './pages/member/MemberDashboard';
import MemberCourses from './pages/member/MemberCourses';
import Profile from './pages/member/Profile';
import Schedule from './pages/member/Schedule';
import BrowseCourses from './pages/member/BrowseCourses';

// Protected route wrapper
const ProtectedRoute: React.FC<{
  element: React.ReactNode;
  requiredRole?: 'admin' | 'member';
}> = ({ element, requiredRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return <>{element}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          {/* Protected Routes */}
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} 
          />
          <Route 
            path="/admin/courses" 
            element={<ProtectedRoute element={<AdminCourses />} requiredRole="admin" />} 
          />
          <Route 
            path="/admin/members" 
            element={<ProtectedRoute element={<AdminMembers />} requiredRole="admin" />} 
          />
          
          {/* Member Routes */}
          <Route 
            path="/member/dashboard" 
            element={<ProtectedRoute element={<MemberDashboard />} requiredRole="member" />} 
          />
          <Route 
            path="/member/my-courses" 
            element={<ProtectedRoute element={<MemberCourses />} requiredRole="member" />} 
          />
          <Route 
            path="/member/profile" 
            element={<ProtectedRoute element={<Profile />} requiredRole="member" />} 
          />
          <Route 
            path="/member/schedule" 
            element={<ProtectedRoute element={<Schedule />} requiredRole="member" />} 
          />
          <Route 
            path="/member/browse-courses" 
            element={<ProtectedRoute element={<BrowseCourses />} requiredRole="member" />} 
          />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;