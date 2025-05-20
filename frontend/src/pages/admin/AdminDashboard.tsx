import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Calendar, TrendingUp, AlarmClock, Activity } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import { courses } from '../../data/courses';
import { members } from '../../data/members';
import { enrollments } from '../../data/enrollments';

const AdminDashboard: React.FC = () => {
  // Analytics data (dummy)
  const totalCourses = courses.length;
  const totalMembers = members.length;
  const totalEnrollments = enrollments.length;
  const activeEnrollments = enrollments.filter(e => e.status === 'active').length;
  
  // Get most popular courses (top 5)
  const popularCourses = [...courses]
    .sort((a, b) => b.enrolledCount - a.enrolledCount)
    .slice(0, 5);
  
  // Recent enrollments (last 5)
  const recentEnrollments = [...enrollments]
    .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600">Selamat datang kembali, Admin Utama</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <Book className="h-6 w-6 text-green-800" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Kursus</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <Users className="h-6 w-6 text-blue-800" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Anggota</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Pendaftaran</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEnrollments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <Activity className="h-6 w-6 text-purple-800" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendaftaran Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">{activeEnrollments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Courses */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Kursus Populer</h2>
                <Link to="/admin/courses" className="text-sm font-medium text-green-800 hover:text-green-700">
                  Lihat Semua
                </Link>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100">
              {popularCourses.map((course) => (
                <div key={course.id} className="py-3 flex items-center">
                  <div className="flex-shrink-0">
                    <img src={course.image} alt={course.title} className="h-10 w-10 rounded object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
                    <p className="text-xs text-gray-500">Pengajar: {course.instructor}</p>
                  </div>
                  <div className="flex items-center text-sm text-green-800">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>{course.enrolledCount} terdaftar</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Enrollments */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Pendaftaran Terbaru</h2>
                <Link to="/admin/enrollments" className="text-sm font-medium text-green-800 hover:text-green-700">
                  Lihat Semua
                </Link>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100">
              {recentEnrollments.map((enrollment) => {
                const member = members.find(m => m.id === enrollment.userId);
                const course = courses.find(c => c.id === enrollment.courseId);
                
                if (!member || !course) return null;
                
                return (
                  <div key={enrollment.id} className="py-3 flex items-center">
                    <div className="flex-shrink-0">
                      <img 
                        src="https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt={member.name} 
                        className="h-10 w-10 rounded-full object-cover" 
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                      <p className="text-xs text-gray-500">mendaftar pada kursus {course.title}</p>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <AlarmClock className="h-4 w-4 mr-1" />
                      <span>{new Date(enrollment.enrollmentDate).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;