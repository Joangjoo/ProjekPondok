import React, { useState } from 'react';
import { Book, Menu, User, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-green-900 to-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Book className="h-8 w-8 text-amber-400" />
              <span className="ml-2 text-xl font-bold">Pondok Sanad</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-amber-200 transition-colors">
                Beranda
              </Link>
              <Link to="/courses" className="px-3 py-2 text-sm font-medium hover:text-amber-200 transition-colors">
                Kursus
              </Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium hover:text-amber-200 transition-colors">
                Tentang Kami
              </Link>
              <Link to="/contact" className="px-3 py-2 text-sm font-medium hover:text-amber-200 transition-colors">
                Kontak
              </Link>
            </nav>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={user.role === 'admin' ? '/admin/dashboard' : '/member/dashboard'} 
                  className="flex items-center text-sm font-medium hover:text-amber-200 transition-colors"
                >
                  <span className="mr-1">Dashboard</span>
                  <User className="h-4 w-4" />
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-white text-white hover:bg-white hover:text-green-800">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-green-800">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="sm">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-200 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-800">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-amber-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Beranda
          </Link>
          <Link 
            to="/courses" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-amber-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Kursus
          </Link>
          <Link 
            to="/about" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-amber-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Tentang Kami
          </Link>
          <Link 
            to="/contact" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-amber-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Kontak
          </Link>
          
          {/* Mobile Auth Links */}
          {user ? (
            <>
              <Link 
                to={user.role === 'admin' ? '/admin/dashboard' : '/member/dashboard'} 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-amber-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-amber-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-amber-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Masuk
              </Link>
              <Link 
                to="/register" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-amber-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;