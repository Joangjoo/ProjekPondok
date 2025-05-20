import { Course } from '../types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Dasar-Dasar Tauhid',
    description: 'Kursus ini membahas tentang dasar-dasar tauhid dan keimanan dalam Islam, dengan fokus pada pemahaman tentang keesaan Allah SWT.',
    instructor: 'Ustadz Ahmad Faiz',
    duration: '8 minggu',
    schedule: 'Senin & Rabu, 19:00 - 21:00',
    category: 'Aqidah',
    level: 'beginner',
    image: 'https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    enrolledCount: 128,
    price: 500000,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Pembelajaran Al-Quran Metode Tilawati',
    description: 'Kursus pembelajaran Al-Quran dengan metode Tilawati yang efektif untuk pemula hingga menengah.',
    instructor: 'Ustadzah Fatimah Azzahra',
    duration: '12 minggu',
    schedule: 'Selasa & Kamis, 18:00 - 20:00',
    category: 'Al-Quran',
    level: 'beginner',
    image: 'https://images.pexels.com/photos/5691441/pexels-photo-5691441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    enrolledCount: 95,
    price: 750000,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Fikih Ibadah Sehari-hari',
    description: 'Mempelajari hukum-hukum fikih terkait ibadah sehari-hari seperti shalat, puasa, zakat, dan ibadah lainnya.',
    instructor: 'Ustadz Muhammad Rizki',
    duration: '10 minggu',
    schedule: 'Jumat & Sabtu, 09:00 - 11:00',
    category: 'Fikih',
    level: 'intermediate',
    image: 'https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    enrolledCount: 76,
    price: 600000,
    rating: 4.7
  },
  {
    id: '4',
    title: 'Hadits Arbain Nawawi',
    description: 'Kajian mendalam tentang 40 hadits pilihan Imam Nawawi dan relevansinya dalam kehidupan modern.',
    instructor: 'Ustadz Abdul Rahman',
    duration: '8 minggu',
    schedule: 'Sabtu & Minggu, 13:00 - 15:00',
    category: 'Hadits',
    level: 'intermediate',
    image: 'https://images.pexels.com/photos/5661214/pexels-photo-5661214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    enrolledCount: 54,
    price: 550000,
    rating: 4.5
  },
  {
    id: '5',
    title: 'Bahasa Arab untuk Pemula',
    description: 'Kursus bahasa Arab dasar untuk pemula yang ingin mempelajari bahasa Al-Quran dengan metode yang mudah dan praktis.',
    instructor: 'Ustadz Hasan Basri',
    duration: '16 minggu',
    schedule: 'Senin & Kamis, 16:00 - 18:00',
    category: 'Bahasa Arab',
    level: 'beginner',
    image: 'https://images.pexels.com/photos/4947579/pexels-photo-4947579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    enrolledCount: 112,
    price: 800000,
    rating: 4.6
  },
  {
    id: '6',
    title: 'Sirah Nabawiyah',
    description: 'Mempelajari sejarah kehidupan Nabi Muhammad SAW dari kelahiran hingga wafat dan pelajaran yang dapat diambil darinya.',
    instructor: 'Ustadz Zainul Arifin',
    duration: '12 minggu',
    schedule: 'Rabu & Sabtu, 19:30 - 21:30',
    category: 'Sejarah Islam',
    level: 'intermediate',
    image: 'https://images.pexels.com/photos/7249295/pexels-photo-7249295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    enrolledCount: 87,
    price: 650000,
    rating: 4.9
  }
];