import EmptyState from '@/app/(site)/components/EmptyState';
import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import { useParams } from 'next/navigation';
import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';

interface CoversationIdProps {
  conversationId: string;
}

const CoversationId = async ({ params }: { params: CoversationIdProps }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full  lg:pl-80">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default CoversationId;
