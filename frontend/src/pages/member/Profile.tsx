import React, { useState } from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import MemberLayout from '../../components/layout/MemberLayout';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { members } from '../../data/members';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const member = members.find(m => m.id === 'member1'); // Using member1 for demo

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: member?.name || '',
    email: member?.email || '',
    phone: member?.phone || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  return (
    <MemberLayout>
      <div className="pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
          <p className="text-gray-600">Kelola informasi profil Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="border-b">
                <h2 className="text-lg font-semibold text-gray-900">Informasi Pribadi</h2>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <Input
                      label="Nama Lengkap"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={<User className="h-5 w-5" />}
                    />
                    
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={<Mail className="h-5 w-5" />}
                    />
                    
                    <Input
                      label="Nomor Telepon"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={<Phone className="h-5 w-5" />}
                    />

                    <div className="flex justify-end space-x-3">
                      {isEditing ? (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Batal
                          </Button>
                          <Button type="submit">
                            Simpan Perubahan
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profil
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Account Info Card */}
          <div>
            <Card>
              <CardHeader className="border-b">
                <h2 className="text-lg font-semibold text-gray-900">Informasi Akun</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status Anggota</label>
                    <p className="mt-1 text-sm text-green-800 font-medium">Aktif</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tanggal Bergabung</label>
                    <div className="mt-1 flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(member?.joinDate || '').toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Kursus Terdaftar</label>
                    <p className="mt-1 text-sm text-gray-900">{member?.enrollments.length} kursus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default Profile;