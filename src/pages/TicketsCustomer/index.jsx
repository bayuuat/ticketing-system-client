import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputReplies from '@/pages/Tickets/components/InputReplies';
import Cookies from 'js-cookie';
import ChatView from '@/pages/Tickets/components/ChatView';
import useWebSocketConnection from '@/pages/Tickets/utils/websocket';
import axios from 'axios';
import FixedPlugin from '@/components/fixedPlugin/FixedPlugin';

const TicketCustomer = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const customer = Cookies.get('user_detail');
  const customerData = JSON.parse(customer);

  const navigate = useNavigate();
  const { id } = useParams();

  const { messages, connected, sendMessage } = useWebSocketConnection(selectedData.ticketID);

  const getTicketTagList = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/customers/ticket-customer/${customerData.customerID}`);
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
    navigate(`/ticket/${item.ticketNumber}`);
    setSelectedData(item);
  };

  useEffect(() => {
    if (customerData.customerID) {
      getTicketTagList();
    }
  }, []);

  const activeRoute = (routeName) => {
    return id === routeName;
  };

  return (
    <>
      <FixedPlugin />
      <div className="min-h-screen flex flex-col justify-center items-center rounded-sm bg-lightPrimary dark:bg-navy-900 dark:text-white">
        <span className="flex justify-end w-[90vw] rounded-md mb-4 float-right">
          <button
            type="submit"
            onClick={() => {
              navigate('/create-ticket');
            }}
            className="inline-flex justify-center rounded-md px-6 py-2 mr-4 bg-orange-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            Create New Ticket
          </button>
          <button
            type="submit"
            onClick={() => {
              Cookies.remove('user_detail');
              navigate('/');
            }}
            className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-red-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5 dark:border-none"
          >
            Log Out
          </button>
        </span>
        <div className="w-[90vw] flex rounded-xl">
          <div className="h-[90vh] flex flex-col w-1/5 bg-white dark:bg-navy-800">
            <div className="grow-0 w-full dark:bg-navy-800 px-5 py-2">
              <h4 className="text-lg">Live Chat</h4>
            </div>
            <div className="chatBox p-2 grow overflow-y-auto">
              {data.map((item) => (
                <button
                  key={item.ticketNumber}
                  className={`${
                    activeRoute(item.ticketNumber) ? 'border-opacity-100' : 'border-opacity-0'
                  } py-3 px-2 mb-2 w-full rounded-md bg-gray-100 dark:bg-navy-700 border border-orange-500`}
                  onClick={() => handleClick(item)}
                >
                  {item.ticketNumber}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-4/5 h-[90vh] dark:bg-navy-900/10">
            <div className="flex w-full justify-between items-center bg-gray-100 dark:bg-navy-700 px-5 py-2">
              <h4 className="text-lg">Ticket Replies</h4>
            </div>
            <div className="chatBox h-full flex flex-col-reverse w-full px-5 py-2 overflow-y-auto bg-gray-100 dark:bg-navy-700">
              <ChatView selectedData={selectedData} messages={messages} connected={connected} />
            </div>
            <InputReplies id={selectedData?.ticketID} connected={connected} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketCustomer;
