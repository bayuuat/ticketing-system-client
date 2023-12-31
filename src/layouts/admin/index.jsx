import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import Footer from '@/components/footer/Footer';
import routes from '@/routes/routes';
import { Toaster } from '@/components/shadcn/components/ui/toaster';

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState('Main Dashboard');

  React.useEffect(() => {
    window.addEventListener('resize', () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));
  }, []);

  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = 'Main Dashboard';
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname === routes[i].layout + routes[i].path) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  document.documentElement.dir = 'ltr';
  return (
    <>
      <div className="flex h-full w-full">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        {/* Navbar & Main Content */}
        <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
          {/* Main Content */}
          <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}>
            {/* Routes */}
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                logoText={'Horizon UI Tailwind React'}
                brandText={currentRoute}
                secondary={getActiveNavbar(routes)}
                {...rest}
              />
              <div className="mx-auto mb-auto h-full min-h-[84vh] p-2 mt-5 md:pr-2">
                <Outlet />
              </div>
              <div className="p-3">
                <Footer />
              </div>
            </div>
          </main>
        </div>
        <Toaster />
      </div>
    </>
  );
}
