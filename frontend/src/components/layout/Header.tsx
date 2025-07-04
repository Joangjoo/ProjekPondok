import React, { useState } from 'react';
import { Menu, User, X, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: string }) => (
    <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${className}`} {...props}>
      {children}
    </button>
  );

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              {/* Ganti dengan logo gambar */}
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10">
                <img
                  src="/assets/logo.png" // Ganti dengan path logo Anda
                  alt="Logo Yayasan Budi Mulya"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">Yayasan Budi Mulya</span>
            </Link>

            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-blue-200 transition-colors">
                Beranda
              </Link>
              <Link to="/courses" className="px-3 py-2 text-sm font-medium hover:text-blue-200 transition-colors">
                Kursus
              </Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium hover:text-blue-200 transition-colors">
                Tentang Kami
              </Link>
              <Link to="/contact" className="px-3 py-2 text-sm font-medium hover:text-blue-200 transition-colors">
                Kontak
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isUserDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {isUserDropdownOpen && (
                  <div
                    // Efek transisi untuk muncul dan hilangnya dropdown
                    className="absolute right-0 mt-3 w-64 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-in-out transform opacity-100 scale-100"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    {/* Bagian Header Dropdown */}
                    <div className="flex items-center space-x-3 p-4 border-b border-gray-100">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* Grup Menu Utama */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="group flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        Profil Saya
                      </Link>
                      <Link
                        to="/member/courses" // Contoh link ke kursus saya
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="group flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <HelpCircle className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        Kursus Saya
                      </Link>
                    </div>

                    {/* Grup Menu Keluar (Logout) */}
                    <div className="py-2 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="group flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600 transition-colors" />
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm" className="px-4 py-2 border border-white hover:bg-white hover:text-blue-800">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white shadow-sm">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-blue-200 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
          <Link to="/courses" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Kursus</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Tentang Kami</Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Kontak</Link>

          <div className="pt-4 pb-2 border-t border-blue-600">
            {user ? (
              <>
                <div className="flex items-center px-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-medium">{user.name}</p>
                    <p className="text-xs text-white/80">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-blue-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil Saya
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-blue-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pengaturan
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-blue-200 text-red-300"
                >
                  Keluar
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="block w-full text-center px-3 py-2 rounded-md text-base font-medium border border-white hover:bg-white hover:text-blue-800">Masuk</Link>
                <Link to="/register" className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-blue-400 hover:bg-blue-500 text-white">Daftar</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;