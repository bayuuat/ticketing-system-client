import { Context } from '@/utils/context';
import React, { useContext } from 'react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';

const NavbarHome = () => {
  const [darkmode, setDarkmode] = useContext(Context);

  const toggleDarkMode = () => {
    if (darkmode) {
      document.body.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkmode(false);
    } else {
      document.body.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkmode(true);
    }
  };

  return (
    <>
      <div className="bottom-0 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-4 backdrop-blur-xl dark:bg-[#0b14374d] dark:text-white">
        <div className="mx-auto flex min-h-full w-full justify-start items-center pt-12 md:max-w-[75%] lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:max-w-[1383px] xl:px-0 xl:pl-[70px] dark:text-white">
          <span className="font-semibold text-xl">Create Ticket</span>
          <div className="cursor-pointer text-gray-600 ms-auto bg-lightPrimary p-3 rounded-full dark:bg-navy-700" onClick={toggleDarkMode}>
            {darkmode ? (
              <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
            ) : (
              <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarHome;
