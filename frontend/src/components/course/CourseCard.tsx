import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, User } from 'lucide-react';
import  Card  from '../ui/Card'; 
import  Badge  from '../ui/Badge'; 
import { Course } from '../../types'; 

interface CourseCardProps {
  course: Course; 
  showActions?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, showActions = true }) => {
  const {
    id,
    judul,            
    deskripsi,        
    guru,             
    penyelenggara,    
    jumlah_pelajaran, 
    level,
    thumbnail,        
    rating,
    harga,            
    jumlah_pendaftar, 
  } = course;

   const levelVariant: { [key in Course['level']]: 'info' | 'warning' | 'danger' } = {
    'Pemula': 'info',      
    'Menengah': 'warning', 
    'Profesional': 'danger' 
  } as const;

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(harga);

  const instructorName = guru?.nama || penyelenggara;

  const imageUrl = thumbnail.startsWith('http') ? thumbnail : `http://localhost:8000/storage/${thumbnail}`;

  const durationText = jumlah_pelajaran ? `${jumlah_pelajaran} Pelajaran` : 'Durasi tidak diketahui';


  return (
    <Card hoverEffect className="h-full flex flex-col">
      <div className="relative">
        <img
          src={imageUrl} 
          alt={judul} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge
          variant={levelVariant[level]}
          className="absolute top-3 right-3"
        >
          {level}
        </Badge>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{judul}</h3> 

        <div className="flex items-center mb-2 text-gray-600">
          <User className="h-4 w-4 mr-1" />
          <span className="text-sm">{instructorName}</span> 
        </div>

        <div className="flex items-center mb-2 text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{durationText}</span> 
        </div>

        <div className="flex items-center mb-3 text-amber-500">
          <Star className="h-4 w-4 fill-current mr-1" />
          <span className="text-sm font-medium">{rating ? rating.toFixed(1) : 'N/A'}</span> 
          <span className="text-xs text-gray-500 ml-2">({jumlah_pendaftar} peserta)</span> 
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {deskripsi} 
        </p>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-800">
              {course.berbayar ? formattedPrice : 'Gratis'} 
            </span>

            {showActions && (
              <Link
                to={`/courses/${id}`}
                className="text-sm font-medium text-blue-800 hover:text-blue-900 underline"
              >
                Lihat Detail
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;