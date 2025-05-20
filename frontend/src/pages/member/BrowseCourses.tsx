import React from 'react';
import MemberLayout from '../../components/layout/MemberLayout';
import CoursesPage from '../courses/CoursesPage';

const BrowseCourses: React.FC = () => {
  return (
    <MemberLayout>
      <CoursesPage />
    </MemberLayout>
  );
};

export default BrowseCourses;