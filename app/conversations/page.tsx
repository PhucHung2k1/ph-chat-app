'use client';

import React from 'react';
import useConversation from '../hooks/useConversation';
import EmptyState from '../(site)/components/EmptyState';

const Home = () => {
  const { isOpen } = useConversation();
  return (
    <div className={'lg:pl-80 h-full lg:blocl' + (isOpen ? 'block' : 'hidden')}>
      <EmptyState />
    </div>
  );
};

export default Home;
