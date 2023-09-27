import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Context } from '@/utils/context';

import Admin from '@/layouts/admin';
import Analytics from '@/pages/Analytics';
import Auth from '@/layouts/auth';
import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';
import Ticket from '@/pages/Tickets';
import User from '@/pages/Users';
import Department from '@/pages/Departments';
import Tables from '@/pages/tables';
import WebSocketTest from '@/websocketTest/WebSocketTest';

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
          <Route path="/" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
            <Route index element={<Analytics />} />
            <Route path="/tickets" element={<Ticket />} />
            <Route path="/users" element={<User />} />
            <Route path="/departments" element={<Department />} />
            <Route path="/tables" element={<Tables />} />
          </Route>
          <Route path="/login" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
