import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Award, ChevronRight, Building, BookOpen, Star, CalendarDays } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CourseCard from '../components/course/CourseCard';
import Button from '../components/ui/Button';
import axios from 'axios';
import { Course } from '../types';

const Home: React.FC = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await axios.get<Course[]>('http://localhost:8000/api/kelas');
        console.log('Data dari API:', response.data);
        const sortedCourses = [...response.data]
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 3);
        setFeaturedCourses(sortedCourses);
      } catch (err) {
        let errorMessage = 'Gagal memuat kursus unggulan. Silakan coba lagi nanti.';

        if (axios.isAxiosError(err)) {
          if (err.response) {
            errorMessage = `Error ${err.response.status}: ${err.response.data.message || 'Terjadi kesalahan server'}`;
          } else if (err.request) {
            errorMessage = 'Tidak ada respon dari server. Periksa koneksi internet Anda.';
          } else {
            errorMessage = 'Terjadi kesalahan saat mengkonfigurasi request.';
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        console.error("Error fetching featured courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Memuat konten...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md p-6 bg-red-50 rounded-xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Terjadi Kesalahan</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="primary" className="flex items-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Muat Ulang
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 to-blue-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
          <div className="text-center md:text-left max-w-3xl">
            <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Building className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Yayasan Budi Mulya</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif">
              <span className="text-amber-300">Pendidikan</span> Berkualitas <br className="hidden md:block" />Untuk Generasi <span className="text-amber-300">Ummat</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Membentuk generasi muslim yang berilmu, berakhlak mulia, dan bermanfaat bagi ummat.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/courses">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  <Book className="w-5 h-5 mr-2" />
                  Lihat Program
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="ghost" className="border-white text-white hover:bg-white/10">
                  Tentang Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 mb-4">
              <BookOpen className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Keunggulan Kami</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">Mengapa Memilih Yayasan Budi Mulya?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Lembaga pendidikan dengan kurikulum terpadu dan pengajar berkualitas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Book className="w-8 h-8" />,
                title: "Kurikulum Terpadu",
                desc: "Mengintegrasikan ilmu agama dan umum secara seimbang"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Pengajar Berkualitas",
                desc: "Dosen dan ustadz yang kompeten di bidangnya"
              },
              {
                icon: <CalendarDays className="w-8 h-8" />,
                title: "Program Unggulan",
                desc: "Berbagai program pendidikan dari TK hingga lanjutan"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Prestasi Gemilang",
                desc: "Santri berprestasi di berbagai kompetisi"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 mb-3">
                <Star className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Program Unggulan</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">Program Pendidikan Kami</h2>
              <p className="text-lg text-gray-600">
                Pilihan program pendidikan terbaik kami
              </p>
            </div>
            <Link to="/courses" className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center group">
                Lihat Semua Program
                <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Building className="w-12 h-12 mx-auto mb-4 text-amber-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Bergabunglah Bersama Kami</h2>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            Daftarkan putra-putri Anda untuk mendapatkan pendidikan terbaik.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="shadow-lg">
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="ghost" className="border-white text-white hover:bg-white/10">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;