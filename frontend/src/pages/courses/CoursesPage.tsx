import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Star, BookOpen } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import axios from 'axios';

interface Program {
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
  level: 'pemula' | 'menengah' | 'lanjutan';
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

const ProgramsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [programData, setProgramData] = useState<Program[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get<Program[]>('http://localhost:8000/api/kelas');
        setProgramData(response.data);
      } catch (err) {
        setError('Gagal memuat data program. Silakan coba lagi nanti.');
        console.error("Error fetching program data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const categories = Array.from(new Set(programData.map(program => program.kategori?.nama).filter(Boolean) as string[]));

  const filteredPrograms = programData.filter(program => {
    const matchesSearch =
      program.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (program.guru?.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.penyelenggara.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter ? (program.kategori?.nama === categoryFilter) : true;
    const matchesLevel = levelFilter ? program.level === levelFilter : true;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setLevelFilter('');
  };

  const getLevelColor = (level: 'pemula' | 'menengah' | 'lanjutan') => {
    // Tambahkan .toLowerCase() untuk memastikan perbandingan tidak case-sensitive
    switch (level.toLowerCase()) {
      case 'pemula':
        return 'bg-blue-500 text-white';
      case 'menengah':
        return 'bg-amber-500 text-white';
      case 'lanjutan':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const isFilterActive = searchTerm || categoryFilter || levelFilter;

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat program...</p>
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
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Program Pendidikan</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Temukan program pendidikan berkualitas untuk meningkatkan ilmu agama
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex">
                  <div className="flex-grow">
                    <Input
                      placeholder="Cari program..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      icon={<Search className="h-5 w-5 text-blue-500" />}
                      className="mb-0"
                    />
                  </div>
                  <div className="ml-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      icon={<SlidersHorizontal className="h-5 w-5 text-blue-500" />}
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


                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Tidak ada program yang ditemukan</h3>
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
              <p className="text-gray-600">Menampilkan {filteredPrograms.length} program</p>
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
              {filteredPrograms.map(program => (
                <div
                  key={program.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col border border-gray-100"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.thumbnail.startsWith('http') ? program.thumbnail : `http://localhost:8000/storage/${program.thumbnail}`}
                      alt={program.judul}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0  text-white py-1 text-sm font-medium">
                       <span className={`px-3 py-1 text-xs font-medium ${getLevelColor(program.level)}`}>
                        {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    {/* Program Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{program.judul}</h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{program.deskripsi}</p>

                    {/* Level Badge */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                        {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                      </span>
                    </div>

                    {/* Rating and Price */}
                    <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 fill-current mr-1" />
                        <span className="text-sm text-gray-600">
                          {program.rating ? program.rating.toFixed(1) : 'Belum ada'} ({program.jumlah_review})
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${program.berbayar ? 'text-blue-600' : 'text-blue-600'
                          }`}>
                          {program.berbayar ? `Rp${program.harga.toLocaleString('id-ID')}` : 'Gratis'}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {program.guru?.nama || program.penyelenggara}
                        </p>
                      </div>
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

export default ProgramsPage;