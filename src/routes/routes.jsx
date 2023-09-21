import React from "react";

import Home from "@/pages/Analytics";

import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { BiSolidBox, BiSolidHome, BiSolidMessage, BiSolidUser, BiTable } from "react-icons/bi";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/",
    path: "",
    icon: <BiSolidHome className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Tickets",
    layout: "/",
    path: "tickets",
    icon: <BiSolidMessage className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Users",
    layout: "/",
    path: "users",
    icon: <BiSolidUser className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Departments",
    layout: "/",
    path: "departments",
    icon: <BiSolidBox className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Contoh Table",
    layout: "/",
    path: "tables",
    icon: <BiTable className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Sign In",
    layout: "/login",
    icon: <MdLock className="h-6 w-6" />,
    component: <Home />,
  }
];
export default routes;
