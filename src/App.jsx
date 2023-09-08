import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { Context } from '@/utils/context';

import { router } from './routes';

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
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
