import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Clock, Award, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CourseCard from '../components/course/CourseCard';
import Button from '../components/ui/Button';
import { courses } from '../data/courses';

const Home: React.FC = () => {
  // Featured courses (show top 3 based on rating)
  const featuredCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-green-900 opacity-60"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6510397/pexels-photo-6510397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Tingkatkan Pemahaman Agama dengan Kursus Berkualitas
            </h1>
            <p className="text-lg md:text-xl mb-8 text-green-50">
              Pelajari ilmu agama dari ustadz dan ustadzah terbaik dalam format kursus 
              yang sistematis dan mudah dipahami.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses">
                <Button size="lg" variant="secondary">
                  Lihat Semua Kursus
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-800">
                  Tentang Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih Pondok Sanad?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan kursus ilmu agama dengan metode pengajaran yang sistematis,
              berkualitas, dan sesuai dengan pemahaman Ahlus Sunnah Wal Jama'ah.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-800 text-white rounded-full mb-4">
                <Book className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Materi Berkualitas</h3>
              <p className="text-gray-600">
                Materi pembelajaran komprehensif yang disusun oleh para ustadz dan ustadzah berpengalaman.
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-800 text-white rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pengajar Terbaik</h3>
              <p className="text-gray-600">
                Para pengajar berpengalaman dengan latar belakang pendidikan agama dari universitas terkemuka.
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-800 text-white rounded-full mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Waktu Fleksibel</h3>
              <p className="text-gray-600">
                Jadwal kursus yang fleksibel sehingga Anda dapat belajar sesuai dengan ketersediaan waktu.
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-800 text-white rounded-full mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sertifikat</h3>
              <p className="text-gray-600">
                Dapatkan sertifikat setelah menyelesaikan kursus sebagai bukti kompetensi Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Kursus Unggulan</h2>
              <p className="text-lg text-gray-600">
                Program kursus terbaik dan paling diminati oleh peserta.
              </p>
            </div>
            <Link to="/courses" className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center">
                Lihat Semua Kursus <ChevronRight className="ml-1 h-5 w-5" />
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

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa Kata Mereka?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pendapat dari para peserta kursus yang telah merasakan manfaat belajar di Pondok Sanad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Siti Aisyah</h4>
                  <p className="text-sm text-gray-600">Peserta Kursus Al-Quran</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Alhamdulillah, saya sangat terbantu dengan metode pengajaran yang sistematis dan mudah dipahami. 
                Ustadzah sangat sabar dalam membimbing kami."
              </p>
              <div className="flex items-center mt-4 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Ahmad Fauzi</h4>
                  <p className="text-sm text-gray-600">Peserta Kursus Fikih</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Saya banyak belajar tentang fikih ibadah sehari-hari yang sangat aplikatif. 
                Materinya komprehensif dan ustadz menyampaikannya dengan baik."
              </p>
              <div className="flex items-center mt-4 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Nurul Hidayah</h4>
                  <p className="text-sm text-gray-600">Peserta Kursus Bahasa Arab</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Awalnya saya kesulitan belajar bahasa Arab, tapi dengan metode yang diajarkan di sini, 
                saya mulai bisa membaca dan memahami teks Arab dasar."
              </p>
              <div className="flex items-center mt-4 text-amber-500">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Untuk Mulai Belajar?</h2>
          <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
            Daftarkan diri Anda sekarang dan mulai perjalanan untuk memperoleh pemahaman agama yang lebih baik.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/courses">
              <Button size="lg" variant="secondary">
                Jelajahi Kursus
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-800">
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;