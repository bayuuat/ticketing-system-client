import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '@/utils/context';

import { FiAlignJustify } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = useContext(Context);

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a className="text-sm font-normal text-neutral-700 hover:underline dark:text-white dark:hover:text-white" href=" ">
            Pages
            <span className="mx-1 text-sm text-neutral-700 hover:text-neutral-700 dark:text-white"> / </span>
          </a>
          <Link className="text-sm font-normal capitalize text-neutral-700 hover:underline dark:text-white dark:hover:text-white" to="#">
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-neutral-700 dark:text-white">
          <Link to="#" className="font-bold capitalize hover:text-neutral-700 dark:hover:text-white">
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-neutral-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-neutral-700 dark:bg-neutral-800 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-neutral-700 outline-none placeholder:!text-gray-400 dark:bg-neutral-800 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden" onClick={onOpenSidenav}>
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove('dark');
              localStorage.theme = 'light'
              setDarkmode(false);
            } else {
              document.body.classList.add('dark');
              localStorage.theme = 'dark'
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
