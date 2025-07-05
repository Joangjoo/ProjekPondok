import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import apiClient from '../../api';
import { Clock, CheckCircle, BookOpen } from 'lucide-react';
import { EnrolledCourse } from '../../types';

const StatusBadge: React.FC<{ status: 'pending' | 'approved' }> = ({ status }) => {
    if (status === 'approved') {
        return (
            <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1.5" />
                Disetujui
            </div>
        );
    }
    return (
        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1.5" />
            Menunggu Persetujuan
        </div>
    );
};

const MyCoursesPage: React.FC = () => {
    const [courses, setCourses] = useState<EnrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await apiClient.get('/api/my-courses');
                setCourses(response.data);
            } catch (err) {
                setError('Gagal memuat daftar kursus Anda.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);

    if (loading) {
        return <Layout><div className="min-h-screen flex justify-center items-center"><div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div></div></Layout>;
    }

    if (error) {
        return <Layout><div className="min-h-screen flex justify-center items-center text-red-500">{error}</div></Layout>;
    }

    return (
        <Layout>
            <div className="bg-white min-h-screen">
                {/* Hero Section */}
                <div className="bg-blue-600 pt-24 pb-16 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-extrabold">Kursus Saya</h1>
                        <p className="mt-4 text-lg text-blue-100">Daftar semua kursus yang telah Anda ikuti.</p>
                    </div>
                </div>

                {/* Course List Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {courses.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Anda Belum Mendaftar Kursus Apapun</h3>
                            <p className="mt-1 text-sm text-gray-500">Jelajahi katalog kursus kami dan mulailah belajar hari ini.</p>
                            <div className="mt-6">
                                <Link
                                    to="/courses"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Lihat Semua Kursus
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200 hover:shadow-lg transition-shadow"
                                >
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${course.thumbnail}`}
                                        alt={course.judul}
                                        className="h-48 w-full object-cover"
                                    />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex-grow">
                                            <p className="text-sm font-semibold text-blue-600">{course.kategori}</p>
                                            <h3 className="mt-2 text-xl font-semibold text-gray-900">{course.judul}</h3>
                                        </div>
                                        <div className="mt-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="text-xs text-gray-500">
                                                    Tgl. Daftar: {new Date(course.pivot.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                                <StatusBadge status={course.pivot.status} />
                                            </div>
                                            {course.pivot.status === 'approved' ? (
                                                <Link
                                                    to={`/learn/courses/${course.id}`}
                                                    className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                                >
                                                    Mulai Belajar
                                                </Link>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
                                                >
                                                    Belum Disetujui
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default MyCoursesPage;