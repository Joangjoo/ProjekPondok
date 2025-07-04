import React, { useState } from 'react';
import { AxiosError } from 'axios';
import apiClient, { getCsrfCookie } from '../../api';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await getCsrfCookie();
      await apiClient.post('/api/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      alert('Registrasi berhasil! Silakan login.');
      
    } catch (err) {
      console.error('Error saat registrasi:', err);
      
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
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-2">
                Buat Akun Baru
              </h1>
              <p className="text-gray-600 text-sm">Daftar untuk mulai belajar</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100" style={{ whiteSpace: 'pre-line' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-teal-800">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-teal-500" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-teal-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-200 bg-white/70 "
                    placeholder="Nama Anda"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-teal-800">Email</label>
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
                <label htmlFor="password" className="block text-sm font-semibold text-teal-800">Password</label>
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
                    placeholder="Minimal 8 karakter"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-500 hover:text-teal-700">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {/* Password Confirmation field */}
              <div className="space-y-2">
                <label htmlFor="password_confirmation" className="block text-sm font-semibold text-teal-800">Konfirmasi Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-teal-500" />
                  </div>
                  <input
                    id="password_confirmation"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-teal-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition-all duration-200 bg-white/70 "
                    placeholder="Ulangi password"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-500 hover:text-teal-700">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${ loading ? 'bg-gradient-to-r from-teal-400 to-emerald-400 cursor-not-allowed' : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' }`}>
                {loading ? ( <span className="flex items-center justify-center space-x-2"> <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> <span>Memproses...</span> </span> ) : ( 'Daftar' )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link
                to = {'/login'} 
                className="font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                  Masuk disini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;