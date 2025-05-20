import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, User } from 'lucide-react';
import { Course } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface CourseCardProps {
  course: Course;
  showActions?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, showActions = true }) => {
  const { id, title, description, instructor, duration, level, image, rating, price, enrolledCount } = course;

  const levelVariant = {
    beginner: 'info',
    intermediate: 'warning',
    advanced: 'danger'
  } as const;

  // Format price with Indonesian Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);

  return (
    <Card hoverEffect className="h-full flex flex-col">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge 
          variant={levelVariant[level]} 
          className="absolute top-3 right-3"
        >
          {level === 'beginner' ? 'Pemula' : level === 'intermediate' ? 'Menengah' : 'Mahir'}
        </Badge>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
        
        <div className="flex items-center mb-2 text-gray-600">
          <User className="h-4 w-4 mr-1" />
          <span className="text-sm">{instructor}</span>
        </div>
        
        <div className="flex items-center mb-2 text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{duration}</span>
        </div>
        
        <div className="flex items-center mb-3 text-amber-500">
          <Star className="h-4 w-4 fill-current mr-1" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-gray-500 ml-2">({enrolledCount} peserta)</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="font-bold text-green-800">{formattedPrice}</span>
            
            {showActions && (
              <Link 
                to={`/courses/${id}`}
                className="text-sm font-medium text-green-800 hover:text-green-900 underline"
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