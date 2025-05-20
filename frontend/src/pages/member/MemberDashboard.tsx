import React from 'react';
import { Link } from 'react-router-dom';
import { Book, CheckCircle, Clock, Calendar } from 'lucide-react';
import MemberLayout from '../../components/layout/MemberLayout';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/courses';
import { enrollments } from '../../data/enrollments';

const MemberDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Get member enrollments
  const memberEnrollments = enrollments.filter(
    enrollment => enrollment.userId === 'member1' // Using member1 since we're using dummy data
  );
  
  // Get enrolled courses
  const enrolledCourses = memberEnrollments.map(enrollment => {
    const course = courses.find(course => course.id === enrollment.courseId);
    return {
      ...enrollment,
      course
    };
  });
  
  // Only get active enrollments
  const activeEnrollments = enrolledCourses.filter(
    enrollment => enrollment.status === 'active'
  );

  // Next scheduled classes (dummy data)
  const nextClasses = [
    {
      id: '1',
      courseId: '1',
      title: 'Dasar-Dasar Tauhid',
      date: '2023-10-25',
      time: '19:00 - 21:00',
      instructor: 'Ustadz Ahmad Faiz'
    },
    {
      id: '2',
      courseId: '3',
      title: 'Fikih Ibadah Sehari-hari',
      date: '2023-10-26',
      time: '09:00 - 11:00',
      instructor: 'Ustadz Muhammad Rizki'
    }
  ];

  return (
    <MemberLayout>
      <div className="pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Anggota</h1>
          <p className="text-gray-600">Selamat datang kembali, {user?.name || 'Ahmad'}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <Book className="h-6 w-6 text-green-800" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Kursus Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">{activeEnrollments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <CheckCircle className="h-6 w-6 text-blue-800" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Kursus Selesai</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {enrolledCourses.filter(e => e.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 mr-4">
                  <Calendar className="h-6 w-6 text-amber-800" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Jadwal Terdekat</p>
                  <p className="text-2xl font-bold text-gray-900">{nextClasses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Courses */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Kursus Aktif</h2>
                <Link to="/member/my-courses" className="text-sm font-medium text-green-800 hover:text-green-700">
                  Lihat Semua
                </Link>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100">
              {activeEnrollments.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-gray-500 mb-4">Anda belum memiliki kursus aktif.</p>
                  <Link to="/member/browse-courses">
                    <Button variant="outline" size="sm">Temukan Kursus</Button>
                  </Link>
                </div>
              ) : (
                activeEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="py-4 flex items-center">
                    <div className="flex-shrink-0">
                      <img 
                        src={enrollment.course?.image} 
                        alt={enrollment.course?.title} 
                        className="h-12 w-12 rounded object-cover" 
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-medium text-gray-900">{enrollment.course?.title}</h3>
                      <p className="text-xs text-gray-500">Pengajar: {enrollment.course?.instructor}</p>
                    </div>
                    <Badge variant="success">Aktif</Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Jadwal Terdekat</h2>
                <Link to="/member/schedule" className="text-sm font-medium text-green-800 hover:text-green-700">
                  Lihat Semua
                </Link>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100">
              {nextClasses.map((classItem) => {
                // Format date to Indonesian format
                const formattedDate = new Date(classItem.date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
                
                return (
                  <div key={classItem.id} className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">{classItem.title}</h3>
                      <Badge variant="info">{classItem.time}</Badge>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-xs text-gray-500">{formattedDate}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Pengajar: {classItem.instructor}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        
        {/* Recommended Courses */}
        <div className="mt-8">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Rekomendasi Kursus</h2>
                <Link to="/member/browse-courses" className="text-sm font-medium text-green-800 hover:text-green-700">
                  Lihat Semua
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter(course => !enrolledCourses.some(ec => ec.courseId === course.id))
                  .slice(0, 3)
                  .map(course => (
                    <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img src={course.image} alt={course.title} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">Pengajar: {course.instructor}</p>
                        <Link to={`/courses/${course.id}`} className="text-sm font-medium text-green-800 hover:text-green-900">
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MemberLayout>
  );
};

export default MemberDashboard;