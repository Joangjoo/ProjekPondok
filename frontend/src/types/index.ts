export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  created_at: string;
  avatar?: string;
}

export interface Course {
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
  level: 'Pemula' | 'Menengah' | 'Profesional';
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

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  enrollments: string[]; // courseIds
  status: 'active' | 'inactive';
}


export interface Kelas {
    id: number;
    judul: string;
    deskripsi: string;
    thumbnail: string;
    kategori: { nama: string };
    level: 'beginner' | 'intermediate' | 'advanced';
    bahasa: string;
    berbayar: boolean;
    harga: number;
    jumlah_pelajaran: number;
    jumlah_video: number;
    rating: number;
    jumlah_review: number;
    jumlah_pendaftar: number;
    penyelenggara: string;
    video_url: string;
    guru: { nama: string; bio: string };
    enrollment_status?: 'pending' | 'approved';
}

export interface EnrolledCourse {
    id: number;
    judul: string;
    thumbnail: string;
    kategori: string ;
    pivot: {
        status: 'pending' | 'approved';
        created_at: string;
    };
}