import React from 'react';
import { BookOpen, Users, Award, Building, GraduationCap, HeartHandshake } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const AboutPage: React.FC = () => {
  return (
    <>
      <Layout>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-800 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Building className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Yayasan Pendidikan Islam</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif">
                Tentang <span className="text-amber-300">Yayasan Budi Mulya</span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                Membangun generasi muslim yang berilmu, berakhlak mulia, dan bermanfaat bagi ummat melalui pendidikan berkualitas.
              </p>
            </div>
          </div>
        </section>

        {/* Visi Misi Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">Visi Kami</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Menjadi lembaga pendidikan Islam unggulan yang mencetak generasi Qur'ani berwawasan luas dan berakhlak mulia.
                </p>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">Misi Kami</h2>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Menyelenggarakan pendidikan Islam berbasis Al-Qur'an dan Sunnah</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Mengembangkan kurikulum terintegrasi antara ilmu agama dan umum</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Menyiapkan pendidik yang kompeten dan berakhlak mulia</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <HeartHandshake className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Membangun kerjasama dengan orang tua dan masyarakat</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80" 
                  alt="Kegiatan Belajar di Yayasan Budi Mulya"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sejarah Section */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">Sejarah Berdiri</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Perjalanan panjang Yayasan Budi Mulya dalam dunia pendidikan Islam
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline */}
              <div className="border-l-2 border-blue-300 ml-4 pl-8 space-y-12">
                {[
                  {
                    year: "1995",
                    title: "Pendirian Yayasan",
                    description: "Yayasan Budi Mulya didirikan oleh sekelompok ulama dan tokoh masyarakat dengan tujuan menyelenggarakan pendidikan Islam yang berkualitas."
                  },
                  {
                    year: "2000",
                    title: "Pembukaan KB-TK",
                    description: "Membuka jenjang pendidikan pertama yaitu Kelompok Bermain dan Taman Kanak-Kanak Budi Mulya 1."
                  },
                  {
                    year: "2005",
                    title: "Pengembangan Program",
                    description: "Meluncurkan program Tahfizh Al-Qur'an dan Laboratorium Dakwah untuk pengembangan pendidikan agama."
                  },
                  {
                    year: "2015",
                    title: "Ekspansi Lembaga",
                    description: "Mendirikan Yayasan Shalahuddin Budi Mulia sebagai pengembangan jaringan pendidikan."
                  },
                  {
                    year: "2023",
                    title: "Pendidikan Digital",
                    description: "Meluncurkan platform pembelajaran online untuk menjangkau lebih banyak peserta didik."
                  }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-14 top-1 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {item.year}
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lembaga Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">Lembaga Kami</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Berbagai unit pendidikan di bawah naungan Yayasan Budi Mulya
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="w-10 h-10 text-blue-600" />,
                  title: "KB & TK Budi Mulia 1",
                  description: "Pendidikan anak usia dini berbasis nilai-nilai Islami dengan metode pembelajaran menyenangkan."
                },
                {
                  icon: <GraduationCap className="w-10 h-10 text-blue-600" />,
                  title: "Yayasan Shalahuddin",
                  description: "Lembaga pendidikan formal dengan kurikulum terpadu antara ilmu agama dan umum."
                },
                {
                  icon: <Award className="w-10 h-10 text-blue-600" />,
                  title: "Laboratorium Dakwah",
                  description: "Program khusus pembinaan dai muda dan pengembangan metodologi dakwah kontemporer."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Tertarik Bergabung?</h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Daftarkan putra-putri Anda atau dukung program kami untuk bersama-sama membangun generasi Islam yang berkualitas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/register" className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-blue-900 font-medium rounded-lg shadow-md hover:shadow-lg transition-all">
                Daftar Sekarang
              </a>
              <a href="/contact" className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-800 font-medium rounded-lg transition-all">
                Hubungi Kami
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AboutPage;