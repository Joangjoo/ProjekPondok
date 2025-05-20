import { Enrollment } from '../types';

export const enrollments: Enrollment[] = [
  { id: '1', userId: '1', courseId: '1', enrollmentDate: '2023-01-20', status: 'active' },
  { id: '2', userId: '1', courseId: '3', enrollmentDate: '2023-02-15', status: 'active' },
  { id: '3', userId: '2', courseId: '2', enrollmentDate: '2023-02-25', status: 'active' },
  { id: '4', userId: '2', courseId: '5', enrollmentDate: '2023-03-10', status: 'active' },
  { id: '5', userId: '3', courseId: '1', enrollmentDate: '2023-03-12', status: 'active' },
  { id: '6', userId: '3', courseId: '4', enrollmentDate: '2023-03-15', status: 'active' },
  { id: '7', userId: '3', courseId: '6', enrollmentDate: '2023-04-01', status: 'active' },
  { id: '8', userId: '4', courseId: '2', enrollmentDate: '2023-03-05', status: 'active' },
  { id: '9', userId: '5', courseId: '3', enrollmentDate: '2023-04-12', status: 'active' },
  { id: '10', userId: '5', courseId: '5', enrollmentDate: '2023-04-15', status: 'cancelled' },
  { id: '11', userId: '6', courseId: '1', enrollmentDate: '2023-03-20', status: 'active' },
  { id: '12', userId: '6', courseId: '6', enrollmentDate: '2023-04-05', status: 'active' },
  { id: '13', userId: '7', courseId: '4', enrollmentDate: '2023-02-10', status: 'completed' },
  { id: '14', userId: '8', courseId: '2', enrollmentDate: '2023-04-08', status: 'active' },
  { id: '15', userId: '8', courseId: '3', enrollmentDate: '2023-04-10', status: 'active' },
  { id: '16', userId: '8', courseId: '5', enrollmentDate: '2023-04-20', status: 'active' }
];