import Cookies from 'js-cookie';
import React from 'react';

const ChatBox = ({ children, sender }) => {
  const customer = Cookies.get('user_detail');

  if(!!customer){
    sender = !sender
  }

  return (
    <div className={`w-full flex ${!!sender ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex flex-col w-fit mb-3 max-w-3xl bg-gray-50 dark:bg-navy-800 px-4 py-3 rounded-xl ${
          !!sender ? 'rounded-br-none' : 'rounded-bl-none'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ChatBox;
