import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, Users, Star, Award, BookOpen, Globe, User } from 'lucide-react';
import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Kelas {
    id: number;
    judul: string;
    slug: string;
    deskripsi: string;
    thumbnail: string;
    kategori_id: number;
    kategori?: {
        id: number;
        nama: string;
    };
    level: 'beginner' | 'intermediate' | 'advanced';
    bahasa: string;
    berbayar: boolean;
    harga: number;
    jumlah_pelajaran: number;
    jumlah_video: number;
    rating: number;
    jumlah_review: number;
    jumlah_pendaftar: number;
    penyelenggara: string;
    guru_id: number;
    guru?: {
        id: number;
        nama: string;
        bio: string;
    };
}

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<Kelas | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        AOS.init();

        const fetchCourse = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/kelas/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error('Error fetching course:', error);
                setError('Gagal memuat detail kelas. Silakan coba lagi nanti.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);





    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-lg text-green-600">
                            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Memuat detail kelas...
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="text-center py-12">
                    <h3 className="text-2xl font-semibold text-red-600 mb-4">Terjadi Kesalahan!</h3>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <Button onClick={() => window.location.reload()} variant="primary">
                        Coba Muat Ulang
                    </Button>
                </div>
            </Layout>
        );
    }

    if (!course) {
        return (
            <Layout>
                <div className="text-center py-12">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Kelas Tidak Ditemukan</h3>
                    <p className="text-gray-600">
                        Kelas yang Anda cari tidak ada atau telah dihapus.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-green-900 to-green-800 text-white" data-aos="fade-up">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-green-900 opacity-60"></div>
                    <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6510397/pexels-photo-6510397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                            {course.judul}
                        </h1>
                        <p className="text-lg md:text-xl mb-6 text-green-50">
                            {course.deskripsi}
                        </p>


                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <div className="flex items-center text-green-100" data-aos="fade-up" data-aos-delay="200">
                                <span className="ml-1">({course.jumlah_review} ulasan)</span>
                            </div>
                            <div className="flex items-center text-green-100" data-aos="fade-up" data-aos-delay="300">
                                <Users className="h-5 w-5 mr-1" />
                                <span>{course.jumlah_pendaftar} siswa</span>
                            </div>
                            <div className="flex items-center text-green-100" data-aos="fade-up" data-aos-delay="400">
                                <BookOpen className="h-5 w-5 mr-1" />
                                <span>{course.jumlah_pelajaran} pelajaran</span>
                            </div>
                            <div className="flex items-center text-green-100" data-aos="fade-up" data-aos-delay="500">
                                <Clock className="h-5 w-5 mr-1" />
                                <span>{course.jumlah_video} video</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kursus Konten nya */}
            <section className="py-16 bg-white" data-aos="fade-up" data-aos-delay="600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Course Gambar dan Deskripsi nya */}
                        <div className="lg:col-span-2">
                            <div className="mb-8">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${course.thumbnail}`}
                                    alt={course.judul}
                                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                                    data-aos="fade-right"
                                />
                            </div>

                            <div className="prose max-w-none" data-aos="fade-left">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Kursus Ini</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    {course.deskripsi}
                                </p>

                                <h3 className="text-xl font-bold text-gray-900 mb-4">Yang Akan Anda Pelajari</h3>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-start">
                                            <Award className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Pemahaman mendalam tentang materi {course.kategori?.nama}</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Award className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Praktik langsung dengan bimbingan pengajar berpengalaman</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Award className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Sertifikat penyelesaian kursus</span>
                                        </li>
                                        <li className="flex items-start">
                                            <Award className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>Akses seumur hidup ke materi pembelajaran</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Course Info Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-lg sticky top-8">
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-green-800 mb-2">
                                            {course.berbayar
                                                ? new Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(course.harga)
                                                : 'GRATIS'
                                            }
                                        </div>
                                        <Button className="w-full" size="lg" variant="primary">
                                            Daftar Sekarang
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                            <div className="flex items-center text-gray-600">
                                                <User className="h-5 w-5 mr-2" />
                                                <span>Pengajar</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{course.guru?.nama}</span>
                                        </div>

                                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                            <div className="flex items-center text-gray-600">
                                                <Globe className="h-5 w-5 mr-2" />
                                                <span>Bahasa</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{course.bahasa}</span>
                                        </div>

                                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                            <div className="flex items-center text-gray-600">
                                                <BookOpen className="h-5 w-5 mr-2" />
                                                <span>Pelajaran</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{course.jumlah_pelajaran}</span>
                                        </div>

                                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                            <div className="flex items-center text-gray-600">
                                                <Clock className="h-5 w-5 mr-2" />
                                                <span>Video</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{course.jumlah_video}</span>
                                        </div>

                                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                            <div className="flex items-center text-gray-600">
                                                <Users className="h-5 w-5 mr-2" />
                                                <span>Siswa</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{course.jumlah_pendaftar}</span>
                                        </div>

                                        <div className="flex items-center justify-between py-3">
                                            <div className="flex items-center text-gray-600">
                                                <Award className="h-5 w-5 mr-2" />
                                                <span>Penyelenggara</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{course.penyelenggara}</span>
                                        </div>

                                        <div className="flex items-center justify-between py-3">
                                            <div className="flex items-center text-gray-600">
                                                <Award className="h-5 w-5 mr-2" />
                                                <span>Rating</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Star className="h-5 w-5 text-yellow-400 " />
                                            <span className="font-semibold">{course.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructor Section */}
            <section className="py-16 bg-gray-50" data-aos="fade-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tentang Pengajar</h2>
                        <div className="flex items-start space-x-6">
                            <img
                                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1"
                                alt={course.guru?.nama}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900">{course.guru?.nama}</h3>
                                <p className="text-gray-600 mt-2">
                                    {course.guru?.bio ? course.guru.bio : 'Pengajar ini belum menambahkan bio.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CourseDetail;
