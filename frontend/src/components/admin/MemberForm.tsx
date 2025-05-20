import React, { useState, useEffect } from 'react';
import { Member } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface MemberFormProps {
  initialMember?: Member;
  onSubmit: (member: Omit<Member, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ initialMember, onSubmit, onCancel }) => {
  const defaultMember = {
    name: '',
    email: '',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0],
    enrollments: [],
    status: 'active' as const
  };

  const [member, setMember] = useState<Omit<Member, 'id'> & { id?: string }>(
    initialMember || defaultMember
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialMember) {
      setMember(initialMember);
    }
  }, [initialMember]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setMember({
      ...member,
      [name]: value
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
    
    if (!member.name) newErrors.name = 'Nama anggota harus diisi';
    if (!member.email) newErrors.email = 'Email anggota harus diisi';
    if (!member.phone) newErrors.phone = 'Nomor telepon anggota harus diisi';
    if (!member.joinDate) newErrors.joinDate = 'Tanggal bergabung harus diisi';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (member.email && !emailRegex.test(member.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    // Phone validation (simple check for now)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (member.phone && !phoneRegex.test(member.phone)) {
      newErrors.phone = 'Nomor telepon harus berisi 10-15 digit angka';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(member);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Nama Lengkap"
            name="name"
            value={member.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
        </div>
        
        <div>
          <Input
            label="Email"
            name="email"
            type="email"
            value={member.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
        </div>
        
        <div>
          <Input
            label="Nomor Telepon"
            name="phone"
            value={member.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
        </div>
        
        <div>
          <Input
            label="Tanggal Bergabung"
            name="joinDate"
            type="date"
            value={member.joinDate}
            onChange={handleChange}
            error={errors.joinDate}
            required
          />
        </div>
        
        <div>
          <Select
            label="Status"
            name="status"
            value={member.status}
            onChange={(value) => setMember({ ...member, status: value as 'active' | 'inactive' })}
            options={[
              { value: 'active', label: 'Aktif' },
              { value: 'inactive', label: 'Tidak Aktif' }
            ]}
            error={errors.status}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          {initialMember ? 'Perbarui Anggota' : 'Tambah Anggota'}
        </Button>
      </div>
    </form>
  );
};

export default MemberForm;