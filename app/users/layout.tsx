import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import getUsers from '../actions/getUsers';
import UserList from './components/UserList';

interface UserLayoutProps {
  children: React.ReactNode;
}
const UserLayout: React.FC<UserLayoutProps> = async ({ children }) => {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />

        {children}
      </div>
    </Sidebar>
  );
};

export default UserLayout;
