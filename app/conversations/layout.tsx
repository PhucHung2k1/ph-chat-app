import React from 'react';
import internal from 'stream';
import Sidebar from '../components/sidebar/Sidebar';
import CoversationList from './components/CoversationList';
import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUsers';

interface CoversationLayoutProps {
  children: React.ReactNode;
}

const CoversationLayout: React.FC<CoversationLayoutProps> = async ({
  children,
}) => {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <CoversationList initialItems={conversations} users={users} />

        {children}
      </div>
    </Sidebar>
  );
};

export default CoversationLayout;
