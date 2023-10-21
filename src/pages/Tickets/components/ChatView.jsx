import ChatBox from '@/pages/Tickets/components/ChatBox';
import customAxios from '@/utils/customAxios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { BiSolidFileBlank } from 'react-icons/bi';

const ChatView = ({ selectedData, messages, connected }) => {
  const [history, setHistory] = useState([]);
  const [attachment, setAttachment] = useState([]);
  const customer = Cookies.get('user_detail');

  const getRepliesHistory = async (selectedData) => {
    try {
      const response = await customAxios.get(`replies/history/${selectedData.ticketID}`);
      if (response.status === 200) {
        setHistory(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const getAttachment = async (selectedData) => {
    try {
      const response = await customAxios.get(`attachments/list/${selectedData.ticketID}`);
      if (response.status === 200) {
        setAttachment(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!!selectedData.ticketID) {
      getRepliesHistory(selectedData);
      getAttachment(selectedData);
    }
  }, [selectedData]);

  return (
    <div>
      {connected ? (
        <>
          <ChatBox>
            <span>
              Ticket Number: <span>{selectedData?.ticketNumber}</span>
            </span>
            <span>
              Ticket Status: <span>{selectedData?.ticketStatus}</span>
            </span>
            <span>
              Content: <br /> <span>{selectedData?.ticketContent}</span>
            </span>
          </ChatBox>
          <div className={`flex flex-wrap gap-4 ${customer && 'float-right'} mb-4`}>
            {attachment.map((message, index) =>
              !message.fileType.startsWith('image/') ? (
                <a
                  href={message.attachmentPath}
                  target="_blank"
                  rel="noreferrer"
                  className="w-32 h-32 flex flex-col items-center p-2 shadow-md rounded-md border bg-gray-50 dark:bg-navy-800 dark:border-gray-900"
                  key={index}
                >
                  <div className="grow flex items-center">
                    <BiSolidFileBlank className="w-16 h-16 text-gray-300 dark:opacity-60" />
                  </div>
                  <span className="h-1/5 text-center w-full truncate text-xs">{message.fileName}</span>
                </a>
              ) : (
                <a
                  href={message.attachmentPath}
                  target="_blank"
                  rel="noreferrer"
                  className="w-32 h-32 shadow-md rounded-md border dark:border-gray-900"
                  key={index}
                >
                  <img className="w-full h-full rounded-md mr-4 object-cover" src={message.attachmentPath} alt={`Preview ${index}`} />
                </a>
              )
            )}
          </div>
          {history.map((message, index) => (
            <ChatBox key={index} sender={message.userId}>
              {message.replyContent}
            </ChatBox>
          ))}
          {messages.map((message, index) => (
            <ChatBox key={index} sender={message.userId}>
              {message.replyContent}
            </ChatBox>
          ))}
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <p>Connecting to WebSocket...</p>
          <p>Make sure you already choose the chat!</p>
        </div>
      )}
    </div>
  );
};

export default ChatView;
