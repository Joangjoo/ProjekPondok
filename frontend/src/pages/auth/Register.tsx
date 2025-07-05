import React, { useState } from 'react';
import { AxiosError } from 'axios';
import apiClient, { getCsrfCookie } from '../../api';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
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
            navigate('/login'); 

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
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden ">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-0 -left-40 w-96 h-96 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main register card */}
                <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Buat Akun Baru</h1>
                            <p className="text-gray-300 text-sm">Daftar untuk mulai belajar</p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="mb-6 p-3 bg-red-500/10 text-red-300 text-sm rounded-xl border border-red-500/20" style={{ whiteSpace: 'pre-line' }}>
                                {error}
                            </div>
                        )}

                        {/* Register form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name field */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-200">Nama Lengkap</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-700/50 text-white placeholder-gray-400" placeholder="Nama Anda" />
                                </div>
                            </div>

                            {/* Email field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-200">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-700/50 text-white placeholder-gray-400" placeholder="email@gmail.com" />
                                </div>
                            </div>

                            {/* Password field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-200">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-700/50 text-white placeholder-gray-400" placeholder="Minimal 8 karakter" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors">
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Confirmation field */}
                            <div className="space-y-2">
                                <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-200">Konfirmasi Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <input id="password_confirmation" type={showConfirmPassword ? 'text' : 'password'} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-700/50 text-white placeholder-gray-400" placeholder="Ulangi password" />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors">
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit button */}
                            <button type="submit" disabled={loading} className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${loading ? 'bg-gradient-to-r from-blue-400 to-cyan-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-cyan-500/40 transform hover:-translate-y-0.5'}`}>
                                {loading ? 'Memproses...' : 'Daftar'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-600" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-gray-800 px-2 text-gray-400">atau</span>
                                </div>
                            </div>
                        </div>

                        {/* Social login buttons */}
                        <div>
                            <button
                                type="button"
                                className="w-full inline-flex justify-center items-center py-3 px-4 rounded-xl border border-gray-600 bg-gray-800 text-sm font-medium text-gray-200 shadow-sm hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Lanjutkan dengan Google
                            </button>
                        </div>

                        {/* Login link */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-400">
                                Sudah punya akun?{' '}
                                <Link to={'/login'} className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">Masuk disini</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;