/* eslint-disable */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashIcon from '@/components/icons/DashIcon';
import Cookies from 'js-cookie';
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;
  const role = Cookies.get('role_id');

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName;
  };

  const userAccess = (route) => {
    return role == 2 ? route.layout === '/admin' && route.access !== 'manager' : route.layout === '/admin';
  };

  const activeLink = (route) => (activeRoute(route) ? 'font-bold bg-orange-500 text-white dark:text-navy-800' : 'font-medium text-gray-600');

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (userAccess(route)) {
        return (
          <Link key={index} to={route.layout + route.path}>
            <div className={`${activeLink(route.layout + route.path)} relative mb-3 mx-4 p-2 rounded-md flex hover:cursor-pointer`}>
              <li className="my-[3px] flex cursor-pointer items-center px-8 dark:text-white" key={index}>
                <span>{route.icon ? route.icon : <DashIcon />} </span>
                <p className={`leading-1 ml-4 flex `}>{route.name}</p>
              </li>
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
