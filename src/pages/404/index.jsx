import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen h-full w-full flex items-center bg-lightPrimary dark:!bg-navy-900">
        <div className="mx-auto flex flex-col min-h-full w-full  items-center pt-12 md:max-w-[75%] lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:max-w-[1383px] xl:px-0 xl:pl-[70px] dark:text-white">
          <h1 className="text-9xl font-semibold tracking-tight">404</h1>
          <h2 className="mt-4 text-xl text-gray-700 tracking-tight">Error! Page Not Found.</h2>
          <button type="button" onClick={() => navigate('/')} className="py-2 px-6 bg-orange-500 rounded-md mt-4 text-white">
            Back to home
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
