import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Book, 
  LayoutDashboard, 
  BookOpen, 
  UserCircle, 
  GraduationCap, 
  Calendar, 
  LogOut,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MemberLayoutProps {
  children: React.ReactNode;
}

const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-700';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside 
        className={`
          fixed inset-y-0 z-50
          md:relative md:translate-x-0 md:w-64
          flex-shrink-0 bg-green-900 text-white 
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-4 border-b border-green-800">
            <Link to="/member/dashboard" className="flex items-center">
              <Book className="h-8 w-8 text-amber-400" />
              <span className="ml-2 text-lg font-bold">Pondok Sanad</span>
            </Link>
            <button 
              className="ml-auto md:hidden text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/member/dashboard"
                  className={`flex items-center px-4 py-2 rounded-md ${isActive('/member/dashboard')}`}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/member/my-courses"
                  className={`flex items-center px-4 py-2 rounded-md ${isActive('/member/my-courses')}`}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  Kursus Saya
                </Link>
              </li>
              <li>
                <Link
                  to="/member/browse-courses"
                  className={`flex items-center px-4 py-2 rounded-md ${isActive('/member/browse-courses')}`}
                >
                  <Book className="h-5 w-5 mr-3" />
                  Temukan Kursus
                </Link>
              </li>
              <li>
                <Link
                  to="/member/profile"
                  className={`flex items-center px-4 py-2 rounded-md ${isActive('/member/profile')}`}
                >
                  <UserCircle className="h-5 w-5 mr-3" />
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to="/member/schedule"
                  className={`flex items-center px-4 py-2 rounded-md ${isActive('/member/schedule')}`}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  Jadwal
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-green-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 rounded-md text-green-100 hover:bg-green-700"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1 ml-4 md:ml-0">
              <h1 className="text-lg font-semibold text-gray-800">
                Member Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none">
                  <img
                    src="https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Member"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="hidden md:block">{user?.name || 'Member'}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MemberLayout;