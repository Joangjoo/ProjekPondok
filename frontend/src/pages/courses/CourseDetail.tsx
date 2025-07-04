import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Users, Star, Award, BookOpen, Globe, User } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import apiClient from '../../api'; // Menggunakan apiClient yang konsisten

// Interface untuk data kursus (bisa dipindah ke file types)
interface Kelas {
    id: number;
    judul: string;
    deskripsi: string;
    thumbnail: string;
    kategori: { nama: string };
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
    video_url: string;
    guru: { nama: string; bio: string };
}

// Komponen kecil untuk menampilkan bintang rating
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-current" />)}
            {halfStar && <Star key="half" className="h-5 w-5 text-yellow-400 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
            {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300 fill-current" />)}
        </div>
    );
};


const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<Kelas | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        AOS.init({ once: true, duration: 800 });

        const fetchCourse = async () => {
            try {
                // API Call diubah menggunakan apiClient
                const response = await apiClient.get(`/api/kelas/${id}`);
                setCourse(response.data);
            } catch (err) {
                console.error('Error fetching course:', err);
                setError('Gagal memuat detail kelas. Silakan coba lagi nanti.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourse();
        }
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div></div>;
    }
    if (error) {
        return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;
    }
    if (!course) {
        return <div className="min-h-screen flex justify-center items-center text-gray-700">Kelas tidak ditemukan.</div>;
    }

    return (
        <>
            <Layout >
                <div className="bg-gray-50">
                    {/* Hero Section */}
                    <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-20" data-aos="fade-in">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl">
                                <span className="text-sm font-bold uppercase tracking-wider text-teal-400">{course.kategori.nama}</span>
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight my-4">{course.judul}</h1>
                                <p className="text-lg md:text-xl text-gray-300">{course.deskripsi}</p>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">
                                    <div className="flex items-center space-x-1"><StarRating rating={course.rating} /> <span className="text-gray-300">({course.jumlah_review} ulasan)</span></div>
                                    <div className="flex items-center"><Users className="h-5 w-5 mr-2" /> {course.jumlah_pendaftar} siswa</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid lg:grid-cols-3 gap-12">

                            {/* Kolom Kiri (Konten Utama) */}
                            <div className="lg:col-span-2 space-y-12">
                                <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Yang Akan Anda Pelajari</h2>
                                    <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Video Pembelajaran</h2>
                                        {course.video_url ? (
                                            <div className="aspect-w-16 aspect-h-9">
                                                <iframe
                                                    src={course.video_url}
                                                    className="w-full h-96 rounded-lg"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        ) : (
                                            <div className="bg-gray-100 rounded-lg p-8 text-center">
                                                <p className="text-gray-500">Video pembelajaran belum tersedia</p>
                                            </div>
                                        )}
                                    </div>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start"><Award className="h-5 w-5 text-teal-600 mr-3 mt-1 flex-shrink-0" /><span>Pemahaman mendalam tentang materi {course.kategori.nama}</span></li>
                                        <li className="flex items-start"><Award className="h-5 w-5 text-teal-600 mr-3 mt-1 flex-shrink-0" /><span>Praktik langsung dengan bimbingan pengajar berpengalaman</span></li>
                                        <li className="flex items-start"><Award className="h-5 w-5 text-teal-600 mr-3 mt-1 flex-shrink-0" /><span>Sertifikat penyelesaian kursus</span></li>
                                        <li className="flex items-start"><Award className="h-5 w-5 text-teal-600 mr-3 mt-1 flex-shrink-0" /><span>Akses seumur hidup ke materi pembelajaran</span></li>
                                    </ul>
                                </div>

                                <div className="bg-white p-8 rounded-xl shadow-lg" data-aos="fade-up">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Pengajar</h2>
                                    <div className="flex items-start space-x-6">
                                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={course.guru.nama} className="w-20 h-20 rounded-full object-cover" />
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{course.guru.nama}</h3>
                                            <p className="text-gray-600 mt-2">{course.guru.bio || 'Pengajar ini belum menambahkan bio.'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kolom Kanan (Sidebar) */}
                            <div className="lg:col-span-1" data-aos="fade-left">
                                <div className="sticky top-28 space-y-6">
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                        <img src={`http://127.0.0.1:8000/storage/${course.thumbnail}`} alt={course.judul} className="w-full h-48 object-cover" />
                                        <div className="p-6">
                                            <div className="text-3xl font-bold text-gray-900 text-center mb-4">
                                                {course.berbayar ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(course.harga) : 'GRATIS'}
                                            </div>
                                            <Button className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md">
                                                Daftar Sekarang
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl shadow-lg">
                                        <h3 className="font-bold text-lg mb-4">Detail Kursus</h3>
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex justify-between"> <span className="text-gray-600 flex items-center"><User className="w-4 h-4 mr-2" />Pengajar</span> <strong>{course.guru.nama}</strong></li>
                                            <li className="flex justify-between"> <span className="text-gray-600 flex items-center"><Globe className="w-4 h-4 mr-2" />Bahasa</span> <strong>{course.bahasa}</strong></li>
                                            <li className="flex justify-between"> <span className="text-gray-600 flex items-center"><BookOpen className="w-4 h-4 mr-2" />Pelajaran</span> <strong>{course.jumlah_pelajaran}</strong></li>
                                            <li className="flex justify-between"> <span className="text-gray-600 flex items-center"><Clock className="w-4 h-4 mr-2" />Video</span> <strong>{course.jumlah_video}</strong></li>
                                            <li className="flex justify-between"> <span className="text-gray-600 flex items-center"><Award className="w-4 h-4 mr-2" />Penyelenggara</span> <strong>{course.penyelenggara}</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default CourseDetail;