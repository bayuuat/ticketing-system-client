import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Context } from '@/utils/context';

import Admin from '@/layouts/admin';
import Analytics from '@/pages/Analytics';
import Auth from '@/layouts/auth';
import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';
import Ticket from '@/pages/Tickets';
import User from '@/pages/Users';
import Department from '@/pages/Departments';
import TicketTags from '@/pages/TicketTags';
import Home from '@/pages/Home';
import ChatView from '@/pages/Tickets/components/ChatView';
import TicketCustomer from '@/pages/TicketsCustomer';
import CreateTicket from '@/pages/CreateTicket';
import ProtectedRouteCustomer from '@/components/protectedRoute/ProtectedCustomer';
import NotFoundPage from '@/pages/404';

function App() {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark');
      setDarkmode(true);
    } else {
      document.body.classList.remove('dark');
      setDarkmode(false);
    }
  }, []);

  return (
    <Context.Provider value={[darkmode, setDarkmode]}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route index element={<Analytics />} />
            <Route path="/admin/tickets" element={<Ticket />}>
              <Route path="/admin/tickets/:id" element={<ChatView />} />
            </Route>
            <Route path="/admin/ticket-tags" element={<TicketTags />} />
            <Route path="/admin/users" element={<User />} />
            <Route path="/admin/departments" element={<Department />} />
          </Route>
          <Route path="/login" element={<Auth />} />
          <Route
            path="/ticket"
            element={
              <ProtectedRouteCustomer>
                {' '}
                <TicketCustomer />
              </ProtectedRouteCustomer>
            }
          >
            <Route path="/ticket/:id" element={<ChatView />} />
          </Route>
          <Route
            path="/create-ticket"
            element={
              <ProtectedRouteCustomer>
                {' '}
                <CreateTicket />
              </ProtectedRouteCustomer>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
