import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import customAxios from '@/utils/customAxios';
import InputReplies from '@/pages/Tickets/components/InputReplies';
import { BiSolidPencil } from 'react-icons/bi';
import ModalCreate from '@/pages/Tickets/components/ModalCreate';
import Cookies from 'js-cookie';
import ChatView from '@/pages/Tickets/components/ChatView';
import useWebSocketConnection from '@/pages/Tickets/utils/websocket';

const Ticket = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const role = Cookies.get('role_id');

  const navigate = useNavigate();
  const { id } = useParams();

  const { messages, connected, sendMessage } = useWebSocketConnection(selectedData.ticketID);

  const getTicketTagList = async () => {
    try {
      const response = await customAxios.get(`tickets/user/myTickets`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const handleClick = (item) => {
    navigate(`/admin/tickets/${item.ticketNumber}`);
    setSelectedData(item);
  };

  useEffect(() => {
    getTicketTagList();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const activeRoute = (routeName) => {
    return id === routeName;
  };

  return (
    <>
      <div className="mt-5 h-full flex rounded-sm bg-white dark:bg-navy-800 dark:text-white">
        <div className="h-[80vh] flex flex-col w-1/5 bg-white dark:bg-navy-800">
          <div className="grow-0 w-full dark:bg-navy-800 px-5 py-2">
            <h4 className="text-lg">Live Chat</h4>
          </div>
          <div className="chatBox grow p-2 overflow-y-auto">
            {data.map((item) => (
              <button
                key={item.ticketNumber}
                className={`${
                  activeRoute(item.ticketNumber) ? 'border-opacity-100' : 'border-opacity-0'
                } py-3 px-2 mb-2 w-full rounded-md bg-gray-100 dark:bg-navy-700 border border-orange-500 text-left`}
                onClick={() => handleClick(item)}
              >
                {item.ticketNumber}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-4/5 h-[80vh] dark:bg-navy-900/10">
          <div className="flex w-full justify-between items-center bg-gray-100 dark:bg-navy-700 px-5 py-2">
            <h4 className="text-lg">Ticket Replies</h4>
            {role == 1 && (
              <button
                className={`inline-flex justify-between items-center rounded-md border px-4 py-2 bg-white dark:bg-navy-800 text-base leading-6 font-medium text-navy-700 dark:text-white shadow-sm hover:text-gray-500  border-gray-400 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5 disabled:opacity-40 disabled:border-gray-100`}
                onClick={handleOpenModal}
                disabled={!selectedData?.ticketID}
              >
                <BiSolidPencil className="mr-2" />
                Assign
              </button>
            )}
          </div>
          <div className="chatBox grow flex flex-col-reverse w-full px-5 py-0-2 overflow-y-auto bg-gray-100 dark:bg-navy-700">
            <ChatView selectedData={selectedData} messages={messages} connected={connected} />
          </div>
          <InputReplies id={selectedData?.ticketID} connected={connected} sendMessage={sendMessage} />
        </div>
      </div>
      {role == 1 && <ModalCreate open={openModal} onClose={handleCloseModal} ticketID={selectedData?.ticketID} refetch={getTicketTagList} />}
    </>
  );
};

export default Ticket;
