import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User } from 'lucide-react';
import MemberLayout from '../../components/layout/MemberLayout';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

// Dummy schedule data
const scheduleData = [
  {
    id: '1',
    courseTitle: 'Dasar-Dasar Tauhid',
    instructor: 'Ustadz Ahmad Faiz',
    date: '2024-03-25',
    time: '19:00 - 21:00',
    location: 'Ruang 101',
    type: 'regular',
    topic: 'Pengenalan Tauhid Rububiyah'
  },
  {
    id: '2',
    courseTitle: 'Fikih Ibadah Sehari-hari',
    instructor: 'Ustadz Muhammad Rizki',
    date: '2024-03-26',
    time: '09:00 - 11:00',
    location: 'Ruang 203',
    type: 'exam',
    topic: 'Ujian Tengah Semester'
  },
  {
    id: '3',
    courseTitle: 'Pembelajaran Al-Quran',
    instructor: 'Ustadzah Fatimah Azzahra',
    date: '2024-03-27',
    time: '16:00 - 18:00',
    location: 'Ruang Tahfidz',
    type: 'practice',
    topic: 'Praktik Tajwid'
  }
];

const Schedule: React.FC = () => {
  // Group schedules by date
  const groupedSchedules = scheduleData.reduce((acc, schedule) => {
    const date = schedule.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(schedule);
    return acc;
  }, {} as Record<string, typeof scheduleData>);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getScheduleTypeBadge = (type: string) => {
    switch (type) {
      case 'exam':
        return <Badge variant="danger">Ujian</Badge>;
      case 'practice':
        return <Badge variant="warning">Praktik</Badge>;
      default:
        return <Badge variant="info">Reguler</Badge>;
    }
  };

  return (
    <MemberLayout>
      <div className="pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Jadwal Kursus</h1>
          <p className="text-gray-600">Lihat jadwal kelas dan kegiatan Anda</p>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedSchedules).map(([date, schedules]) => (
            <Card key={date}>
              <CardHeader className="border-b">
                <div className="flex items-center text-gray-900">
                  <CalendarIcon className="h-5 w-5 mr-2 text-green-800" />
                  <h2 className="text-lg font-semibold">{formatDate(date)}</h2>
                </div>
              </CardHeader>
              <CardContent className="divide-y divide-gray-100">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {schedule.courseTitle}
                      </h3>
                      {getScheduleTypeBadge(schedule.type)}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{schedule.topic}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{schedule.time}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{schedule.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{schedule.instructor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default Schedule;