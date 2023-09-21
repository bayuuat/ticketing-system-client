import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Context } from '@/utils/context';

import Admin from '@/layouts/admin';
import Home from '@/pages/Home';
import Auth from '@/layouts/auth';
import ProtectedRoute from '@/components/protectedRoute/ProtectedRoute';

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
            <Route index element={<Home />} />
            <Route path="/tickets" element={<Home />} />
            <Route path="/users" element={<Home />} />
            <Route path="/departments" element={<Home />} />
          </Route>
          <Route path="/login" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
