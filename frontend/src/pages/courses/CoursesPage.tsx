import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Star } from 'lucide-react'; 
import Layout from '../../components/layout/Layout'; 
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import axios from 'axios';


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

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const [kelasData, setKelasData] = useState<Kelas[]>([]); 

  
  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const response = await axios.get<Kelas[]>('http://localhost:8000/api/kelas'); 
        setKelasData(response.data);
      } catch (err) {
        setError('Gagal memuat data kursus. Silakan coba lagi nanti.');
        console.error("Error fetching kelas data:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchKelas();
  }, []); 

  
  const categories = Array.from(new Set(kelasData.map(kelas => kelas.kategori?.nama).filter(Boolean) as string[]));

  
  const filteredCourses = kelasData.filter(kelas => {
    const matchesSearch =
      kelas.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kelas.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (kelas.guru?.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      kelas.penyelenggara.toLowerCase().includes(searchTerm.toLowerCase());

    
    const matchesCategory = categoryFilter ? (kelas.kategori?.nama === categoryFilter) : true;

    
    const matchesLevel = levelFilter ? kelas.level === levelFilter : true;

    return matchesSearch && matchesCategory && matchesLevel;
  });

 
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setLevelFilter('');
  };

  const isFilterActive = searchTerm || categoryFilter || levelFilter;

  
  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Memuat kursus...</p>
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

  return (
    <Layout>
      <div className="bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Kursus Kami</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Temukan kursus pilihan sesuai dengan kebutuhan belajar Anda
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex">
                  <div className="flex-grow">
                    <Input
                      placeholder="Cari kursus..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      icon={<Search className="h-5 w-5" />}
                      className="mb-0"
                    />
                  </div>
                  <div className="ml-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      icon={<SlidersHorizontal className="h-5 w-5" />}
                    >
                      Filter
                    </Button>
                  </div>
                </div>

                {showFilters && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Kategori"
                      value={categoryFilter}
                      onChange={(value) => setCategoryFilter(value)}
                      options={[
                        { value: '', label: 'Semua Kategori' },
                        ...categories.map(category => ({
                          value: category,
                          label: category
                        }))
                      ]}
                    />

                    <Select
                      label="Level"
                      value={levelFilter}
                      onChange={(value) => setLevelFilter(value)}
                      options={[
                        { value: '', label: 'Semua Level' },
                        { value: 'beginner', label: 'Pemula' },
                        { value: 'intermediate', label: 'Menengah' },
                        { value: 'advanced', label: 'Mahir' }
                      ]}
                    />

                    {isFilterActive && (
                      <div className="md:col-span-2 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={resetFilters}
                          icon={<X className="h-4 w-4" />}
                        >
                          Reset Filter
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Tidak ada kursus yang ditemukan</h3>
            <p className="text-gray-600 mb-6">
              Cobalah menggunakan kata kunci pencarian yang berbeda atau reset filter.
            </p>
            {isFilterActive && (
              <Button variant="outline" onClick={resetFilters}>
                Reset Filter
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">Menampilkan {filteredCourses.length} kursus</p>
              {isFilterActive && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  icon={<X className="h-4 w-4" />}
                >
                  Reset Filter
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(kelas => (
                <div
                  key={kelas.id} // Menggunakan id dari data kelas sebagai key unik
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-[1.02] flex flex-col"
                >
                  {/* Gambar Thumbnail */}
                  <img
                    src={kelas.thumbnail.startsWith('http') ? kelas.thumbnail : `http://localhost:8000/storage/${kelas.thumbnail}`}
                    alt={kelas.judul}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Kategori dan Level */}
                    <p className="text-sm text-gray-600 mb-2">
                      {kelas.kategori?.nama || 'Uncategorized'} | {kelas.level.charAt(0).toUpperCase() + kelas.level.slice(1)}
                    </p>
                    {/* Judul Kursus */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{kelas.judul}</h3>
                    {/* Deskripsi Kursus */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{kelas.deskripsi}</p>

                    {/* Rating dan Review */}
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                        {kelas.rating ? kelas.rating.toFixed(1) : 'N/A'} ({kelas.jumlah_review} review)
                    </div>

                    {/* Harga dan Instruktur/Penyelenggara */}
                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                      <span className="font-bold text-green-600 text-lg">
                        {kelas.berbayar ? `Rp${kelas.harga.toLocaleString('id-ID')}` : 'Gratis'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {kelas.guru?.nama || kelas.penyelenggara}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CoursesPage;