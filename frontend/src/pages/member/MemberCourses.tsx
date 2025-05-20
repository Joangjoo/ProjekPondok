import React, { useState } from 'react';
import { Search, BookOpen, Calendar, Clock } from 'lucide-react';
import MemberLayout from '../../components/layout/MemberLayout';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { courses } from '../../data/courses';
import { enrollments } from '../../data/enrollments';

const MemberCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
  
  // Get member enrollments (using member1 for demo purposes)
  const memberEnrollments = enrollments.filter(
    enrollment => enrollment.userId === 'member1'
  );
  
  // Get enrolled courses with details
  const enrolledCourses = memberEnrollments.map(enrollment => {
    const course = courses.find(course => course.id === enrollment.courseId);
    return {
      ...enrollment,
      course
    };
  });
  
  // Filter based on active tab
  const filteredEnrollments = enrolledCourses.filter(enrollment => {
    if (activeTab === 'active') return enrollment.status === 'active';
    if (activeTab === 'completed') return enrollment.status === 'completed';
    return true; // 'all' tab
  });
  
  // Filter based on search term
  const searchFilteredEnrollments = filteredEnrollments.filter(enrollment => 
    enrollment.course?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.course?.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.course?.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <MemberLayout>
      <div className="pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Kursus Saya</h1>
          <p className="text-gray-600">Lihat dan kelola kursus yang Anda ikuti</p>
        </div>

        {/* Search and Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="p-4">
              <Input
                placeholder="Cari kursus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-5 w-5" />}
              />
            </div>
          </div>

          <div className="flex border-b border-gray-200">
            <button
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === 'active'
                  ? 'text-green-800 border-b-2 border-green-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Kursus Aktif
            </button>
            <button
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === 'completed'
                  ? 'text-green-800 border-b-2 border-green-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Kursus Selesai
            </button>
            <button
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === 'all'
                  ? 'text-green-800 border-b-2 border-green-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('all')}
            >
              Semua Kursus
            </button>
          </div>
        </div>

        {/* Course List */}
        {searchFilteredEnrollments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kursus</h3>
              <p className="text-gray-500 mb-6">
                {activeTab === 'active' 
                  ? 'Anda belum memiliki kursus aktif.' 
                  : activeTab === 'completed'
                    ? 'Anda belum menyelesaikan kursus apapun.'
                    : 'Anda belum mengikuti kursus apapun.'}
              </p>
              <Button variant="outline" onClick={() => setActiveTab('all')}>
                {activeTab !== 'all' ? 'Lihat Semua Kursus' : 'Temukan Kursus Baru'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {searchFilteredEnrollments.map((enrollment) => (
              <Card key={enrollment.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 lg:w-1/5">
                    <img 
                      src={enrollment.course?.image} 
                      alt={enrollment.course?.title} 
                      className="w-full h-48 md:h-full object-cover" 
                    />
                  </div>
                  <div className="p-6 md:flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{enrollment.course?.title}</h3>
                      <Badge 
                        variant={enrollment.status === 'active' ? 'success' : enrollment.status === 'completed' ? 'info' : 'warning'}
                      >
                        {enrollment.status === 'active' ? 'Aktif' : enrollment.status === 'completed' ? 'Selesai' : 'Batal'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{enrollment.course?.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Terdaftar: {formatDate(enrollment.enrollmentDate)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Durasi: {enrollment.course?.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-600">Pengajar:</span>
                        <span className="ml-1 text-sm font-medium text-gray-900">{enrollment.course?.instructor}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Lihat Materi
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MemberLayout>
  );
};

export default MemberCourses;