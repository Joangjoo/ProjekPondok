import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Calendar, Edit, BookOpen, Award, Settings, LogOut } from 'lucide-react';
import Header from '../../components/layout/Header';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <Header />
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen pt-6 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Cover Photo */}
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800 relative">
                            <div className="absolute -bottom-16 left-6">
                                <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center">
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                        <User className="w-16 h-16 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="pt-20 px-6 pb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                                    <p className="text-blue-600 font-medium">Anggota Yayasan</p>
                                </div>
                                <button className="flex items-center space-x-1 px-4 py-2 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                    <Edit className="w-4 h-4" />
                                    <span>Edit Profil</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-6 mt-4 text-gray-600">
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 mr-2" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    <span>
                                        Bergabung {new Date(user.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {/* Stats Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                                <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                                Aktivitas Belajar
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Program Diikuti</p>
                                    <p className="text-2xl font-bold text-blue-600">5</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Materi Diselesaikan</p>
                                    <p className="text-2xl font-bold text-blue-600">24</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Jam Belajar</p>
                                    <p className="text-2xl font-bold text-blue-600">32</p>
                                </div>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                                <Award className="w-5 h-5 mr-2 text-amber-500" />
                                Sertifikat
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    'Tahfizh',
                                    'Bahasa Arab',
                                    'Fikih',
                                    'Hadits',
                                    'Dakwah',
                                    'Tajwid'
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                                            <Award className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <span className="text-xs text-center text-gray-600">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="font-semibold text-gray-700 mb-4">Menu Cepat</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                                    <Settings className="w-5 h-5 text-gray-600" />
                                    <span>Pengaturan Akun</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                                    <BookOpen className="w-5 h-5 text-gray-600" />
                                    <span>Program Saya</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors text-red-600"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Keluar</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                        <h3 className="font-semibold text-gray-700 mb-4">Aktivitas Terkini</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    activity: "Menyelesaikan materi 'Tajwid Dasar'",
                                    date: "1 hari yang lalu"
                                },
                                {
                                    activity: "Mengikuti kajian 'Fiqh Ibadah'",
                                    date: "3 hari yang lalu"
                                },
                                {
                                    activity: "Menyelesaikan hafalan Juz 30",
                                    date: "1 minggu yang lalu"
                                }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                                        <BookOpen className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{item.activity}</p>
                                        <p className="text-sm text-gray-500">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;