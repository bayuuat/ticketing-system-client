import React, { useContext } from "react";

import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { Context } from "@/utils/context";


export default function FixedPlugin(props) {
  const { ...rest } = props;

  const [darkmode, setDarkmode] = useContext(Context);

  const toggleDarkMode = () => {
    if (darkmode) {
      document.body.classList.remove('dark');
      localStorage.theme = 'light'
      setDarkmode(false);
    } else {
      document.body.classList.add('dark');
      localStorage.theme = 'dark'
      setDarkmode(true);
    }
  }

  return (
    <button
      className="fixed bottom-[25px] right-[25px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-orange-600 p-0"
      onClick={toggleDarkMode}
      {...rest}
    >
      {/* // left={document.documentElement.dir === "rtl" ? "35px" : ""}
      // right={document.documentElement.dir === "rtl" ? "" : "35px"} */}
      <div className="cursor-pointer text-gray-600">
        {darkmode ? (
          <RiSunFill className="h-4 w-4 text-white" />
        ) : (
          <RiMoonFill className="h-4 w-4 text-white" />
        )}
      </div>
    </button>
  );
}
