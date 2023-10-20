import React, { useEffect, useState } from 'react';

import { BiSend, BiX } from 'react-icons/bi';
import customAxios from '@/utils/customAxios';
import Cookies from 'js-cookie';
import { useToast } from '@/components/shadcn/components/ui/use-toast';

const InputReplies = ({ connected, sendMessage, id }) => {
  const [messageInput, setMessageInput] = useState('');
  const role = Cookies.get('role_id');
  const { toast } = useToast();

  const handleSend = () => {
    if (setMessageInput && connected) {
      console.log('Sending message: ', messageInput);
      sendMessage({ replyContent: messageInput });
      setMessageInput('');
    }
  };

  const closeTicket = async () => {
    try {
      const response = await customAxios.put(`tickets/user/close/${id}`);
      if (response.status === 200) {
        toast({
          title: 'Success closing the ticket!',
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast({
          description: error.response.data,
        });
      } else {
        console.error(error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSend();
    }
  };

  useEffect(() => {
    const textarea = document.querySelector('.text-area');

    if (textarea) {
      textarea.style.height = 'auto'; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
    }
  }, [messageInput]);

  return (
    <div className="flex items-center w-full bg-gray-100 dark:bg-navy-700 px-5 py-4">
      <div className="w-full ml-3">
        {connected ? (
          <div className="flex items-end w-full">
            <textarea
              placeholder="Replies..."
              className="text-area resize-none max-h-52 grow p-4 rounded-lg bg-gray-50 dark:bg-navy-900 text-sm focus:outline-none disabled:opacity-50"
              rows="1"
              onChange={(e) => setMessageInput(e.target.value)}
              value={messageInput}
              onKeyDown={handleKeyDown}
            />
            <button type="button" onClick={handleSend} className="h-11 w-11 mx-3 mb-1 bg-orange-500 flex justify-center items-center rounded-md">
              <BiSend className="text-white" />
            </button>
            {role == 2 && (
              <button type="button" onClick={closeTicket} className="h-11 w-11 mb-1 bg-red-500 flex justify-center items-center rounded-md">
                <BiX className="text-white h-6 w-6" />
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default InputReplies;
