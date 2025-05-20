import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import CourseCard from '../../components/course/CourseCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { courses } from '../../data/courses';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = Array.from(new Set(courses.map(course => course.category)));
  
  // Filter courses
  const filteredCourses = courses.filter(course => {
    // Search term filter
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter ? course.category === categoryFilter : true;
    
    // Level filter
    const matchesLevel = levelFilter ? course.level === levelFilter : true;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setLevelFilter('');
  };

  // Check if any filter is active
  const isFilterActive = searchTerm || categoryFilter || levelFilter;

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
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CoursesPage;