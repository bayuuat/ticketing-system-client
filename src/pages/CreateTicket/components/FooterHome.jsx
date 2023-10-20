import React from 'react';
import { useNavigate } from 'react-router-dom';

const FooterHome = ({ onButtonClick }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="sticky bottom-0 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-4 backdrop-blur-xl dark:bg-[#0b14374d] dark:text-white">
        <div className="mx-auto flex min-h-full w-full justify-between items-center pt-12 md:max-w-[75%] lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:max-w-[1383px] xl:px-0 xl:pl-[70px] dark:text-white">
          <span className="font-normal">Ticket Service</span>
          <div className="float-right">
            <button
              type="button"
              onClick={() => navigate('/ticket')}
              className="rounded-md border border-gray-300 px-6 py-2 mr-4 bg-transparent text-base leading-6 font-medium text-gray-700 dark:text-white dark:border-navy-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              See My Ticket
            </button>
            <button type="button" onClick={onButtonClick} className="py-2 px-6 bg-orange-500 rounded-md ms-auto text-white">
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterHome;
