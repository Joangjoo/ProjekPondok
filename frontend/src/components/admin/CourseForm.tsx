import React, { useState, useEffect } from 'react';
import { Course } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface CourseFormProps {
  initialCourse?: Course;
  onSubmit: (course: Omit<Course, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialCourse, onSubmit, onCancel }) => {
  const defaultCourse = {
    title: '',
    description: '',
    instructor: '',
    duration: '',
    schedule: '',
    category: '',
    level: 'beginner' as const,
    image: '',
    enrolledCount: 0,
    price: 0,
    rating: 5
  };

  const [course, setCourse] = useState<Omit<Course, 'id'> & { id?: string }>(
    initialCourse || defaultCourse
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialCourse) {
      setCourse(initialCourse);
    }
  }, [initialCourse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let processedValue: string | number = value;
    
    // Convert numeric fields
    if (name === 'price' || name === 'enrolledCount' || name === 'rating') {
      processedValue = value === '' ? 0 : Number(value);
    }
    
    setCourse({
      ...course,
      [name]: processedValue
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!course.title) newErrors.title = 'Judul kursus harus diisi';
    if (!course.description) newErrors.description = 'Deskripsi kursus harus diisi';
    if (!course.instructor) newErrors.instructor = 'Nama pengajar harus diisi';
    if (!course.duration) newErrors.duration = 'Durasi kursus harus diisi';
    if (!course.schedule) newErrors.schedule = 'Jadwal kursus harus diisi';
    if (!course.category) newErrors.category = 'Kategori kursus harus diisi';
    if (!course.image) newErrors.image = 'URL gambar kursus harus diisi';
    if (course.price <= 0) newErrors.price = 'Harga kursus harus lebih dari 0';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(course);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Judul Kursus"
            name="title"
            value={course.title}
            onChange={handleChange}
            error={errors.title}
            required
          />
        </div>
        
        <div>
          <Input
            label="Pengajar"
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            error={errors.instructor}
            required
          />
        </div>
        
        <div>
          <Input
            label="Durasi"
            name="duration"
            placeholder="contoh: 8 minggu"
            value={course.duration}
            onChange={handleChange}
            error={errors.duration}
            required
          />
        </div>
        
        <div>
          <Input
            label="Jadwal"
            name="schedule"
            placeholder="contoh: Senin & Rabu, 19:00 - 21:00"
            value={course.schedule}
            onChange={handleChange}
            error={errors.schedule}
            required
          />
        </div>
        
        <div>
          <Input
            label="Kategori"
            name="category"
            value={course.category}
            onChange={handleChange}
            error={errors.category}
            required
          />
        </div>
        
        <div>
          <Select
            label="Level"
            name="level"
            value={course.level}
            onChange={(value) => setCourse({ ...course, level: value as 'beginner' | 'intermediate' | 'advanced' })}
            options={[
              { value: 'beginner', label: 'Pemula' },
              { value: 'intermediate', label: 'Menengah' },
              { value: 'advanced', label: 'Mahir' }
            ]}
            error={errors.level}
            required
          />
        </div>
        
        <div>
          <Input
            label="Harga (Rp)"
            name="price"
            type="number"
            min="0"
            value={course.price.toString()}
            onChange={handleChange}
            error={errors.price}
            required
          />
        </div>
        
        <div>
          <Input
            label="URL Gambar"
            name="image"
            type="url"
            value={course.image}
            onChange={handleChange}
            error={errors.image}
            required
          />
        </div>
        
        <div>
          <Input
            label="Jumlah Pendaftar"
            name="enrolledCount"
            type="number"
            min="0"
            value={course.enrolledCount.toString()}
            onChange={handleChange}
            error={errors.enrolledCount}
          />
        </div>
        
        <div>
          <Input
            label="Rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={course.rating.toString()}
            onChange={handleChange}
            error={errors.rating}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Deskripsi Kursus
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={course.description}
          onChange={handleChange}
          className={`
            block w-full rounded-md shadow-sm
            py-2 px-4
            border ${errors.description ? 'border-red-500' : 'border-gray-300'}
            focus:ring-2 focus:ring-green-500 focus:border-green-500
            transition-colors duration-200
          `}
          required
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          {initialCourse ? 'Perbarui Kursus' : 'Tambah Kursus'}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;