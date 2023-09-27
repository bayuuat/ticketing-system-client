import React from 'react';
import { BiPlusCircle } from 'react-icons/bi';

function ButtonCreate(props) {
  const { transparent, text = '', onClick } = props;

  return (
    <button
      onClick={onClick}
      className={`flex items-center text-sm hover:cursor-pointer ${
        transparent
          ? 'bg-none text-white hover:bg-none active:bg-none'
          : 'bg-lightPrimary p-3 text-orange-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10'
      } linear justify-center rounded-lg font-semibold transition duration-200`}
    >
      <BiPlusCircle className={`text-xl ${text !== '' && 'mr-2'}`} />
      {`${text}`}
    </button>
  );
}

export default ButtonCreate;
