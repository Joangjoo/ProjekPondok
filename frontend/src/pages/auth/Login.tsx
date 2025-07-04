import React, { useState } from 'react';
import apiClient, { getCsrfCookie } from '../../api'; 
import { AxiosError } from 'axios';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await getCsrfCookie();
      
      const response = await apiClient.post('/api/login', {
        email: email,
        password: password,
      });

      login(response.data.user, response.data.token);

      console.log('Login berhasil!', response.data);
      navigate('/')
      
    } catch (err) {
      console.error('Error saat login:', err);
      
      if (err instanceof AxiosError && err.response) {
        const errorData = err.response.data;
        if (errorData && errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          setError(errorMessages.join('\n'));
        } else if (errorData && errorData.message) {
          setError(errorData.message);
        } else {
          setError('Terjadi kesalahan. Silakan coba lagi.');
        }
      } else {
        setError('Terjadi kesalahan yang tidak terduga.');
      }
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main login card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Card decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-2">
                Selamat Datang
              </h1>
              <p className="text-gray-600 text-sm">Masuk untuk mengakses akun Anda</p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
                <span>{error}</span>
              </div>
            )}

            {/* Login form */}
            <div className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-teal-800">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-teal-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-teal-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-200 bg-white/70 "
                    placeholder="email@gmail.com"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-teal-800">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-teal-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-teal-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-200 bg-white/70 "
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-500 hover:text-teal-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                  />
                  <span>Ingat saya</span>
                </label>
                <button className="text-teal-600 hover:text-teal-800 font-medium transition-colors">
                  Lupa password?
                </button>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                  loading
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Memproses...</span>
                  </span>
                ) : (
                  'Masuk'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2  text-gray-500">atau</span>
                </div>
              </div>
            </div>

            {/* Social login buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium">Lanjutkan dengan Google</span>
              </button>
            </div>

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link
                to={'/register'} 
                className="font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                  Daftar disini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;