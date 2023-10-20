import React from 'react';

import Home from '@/pages/Analytics';

import { BiSolidBox, BiSolidHome, BiSolidMessage, BiSolidPaperPlane, BiSolidTag, BiSolidUser } from 'react-icons/bi';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '',
    access: 'manager',
    icon: <BiSolidHome className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: 'Tickets',
    layout: '/admin',
    path: '/tickets',
    icon: <BiSolidMessage className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: 'Ticket Tags',
    layout: '/admin',
    path: '/ticket-tags',
    access: 'manager',
    icon: <BiSolidTag className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: 'Users',
    layout: '/admin',
    path: '/users',
    access: 'manager',
    icon: <BiSolidUser className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: 'Departments',
    layout: '/admin',
    path: '/departments',
    access: 'manager',
    icon: <BiSolidBox className="h-6 w-6" />,
    component: <Home />,
  },
];
export default routes;
