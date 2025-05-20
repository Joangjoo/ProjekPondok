import React, { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import MemberForm from '../../components/admin/MemberForm';
import { Member } from '../../types';
import { members as initialMembers } from '../../data/members';
import { enrollments } from '../../data/enrollments';

const AdminMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  // Filter members based on search term
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const handleAddMember = (newMember: Omit<Member, 'id'>) => {
    // Generate a new ID (in a real app, this would be done by the backend)
    const id = (members.length + 1).toString();
    setMembers([...members, { ...newMember, id }]);
    setIsAddingMember(false);
  };

  const handleUpdateMember = (updatedMember: Member) => {
    setMembers(members.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    setShowDeleteModal(null);
  };

  // Get enrollment count for a member
  const getMemberEnrollments = (memberId: string) => {
    return enrollments.filter(enrollment => enrollment.userId === memberId).length;
  };

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="pb-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Anggota</h1>
            <p className="text-gray-600">Tambah, edit, atau hapus data anggota</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => setIsAddingMember(true)}
              icon={<Plus className="h-5 w-5" />}
            >
              Tambah Anggota
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-72">
                <Input
                  placeholder="Cari anggota..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="h-5 w-5" />}
                  className="mb-0"
                />
              </div>
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 mt-2 md:mt-0" 
                  onClick={() => setSearchTerm('')}
                  icon={<X className="h-4 w-4" />}
                >
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Member Form */}
        {(isAddingMember || editingMember) && (
          <Card className="mb-8">
            <CardHeader className="border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingMember ? 'Edit Anggota' : 'Tambah Anggota Baru'}
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <MemberForm 
                initialMember={editingMember || undefined}
                onSubmit={editingMember ? handleUpdateMember : handleAddMember}
                onCancel={() => {
                  setIsAddingMember(false);
                  setEditingMember(null);
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Members Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Anggota
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontak
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Bergabung
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kursus
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Tidak ada anggota yang ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src="https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                              alt={member.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(member.joinDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={member.status === 'active' ? 'success' : 'danger'}
                        >
                          {member.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getMemberEnrollments(member.id)} kursus</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="text-green-800 hover:text-green-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(member.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Konfirmasi Penghapusan</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus anggota ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowDeleteModal(null)}>
                Batal
              </Button>
              <Button variant="danger" onClick={() => handleDeleteMember(showDeleteModal)}>
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMembers;