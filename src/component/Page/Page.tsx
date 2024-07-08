import React, { ReactNode, useMemo } from 'react';
import { Sidebar } from '../Sidebar';
import RoutingPath from '../../routing/RoutingPath';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthenticationContextProvider';

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  const { isAuthenticated, userId, setIsAuthenticated, setUserId } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Read the URL from the browser
  const currentUrl = window.location.pathname;

  const selected: string | undefined = useMemo(() => {
    if (
      currentPath === RoutingPath.MAIN ||
      currentPath === '/zirrai-panel-admin' ||
      currentPath === '/zirrai-panel-admin/'
    ) {
      return RoutingPath.MAIN;
    } else if (currentPath === RoutingPath.USERS) {
      return RoutingPath.USERS;
    }
  }, [location.pathname]);

  const isLoggedIn = useMemo(() => {
    return isAuthenticated;
  }, [isAuthenticated]);

  if (!isLoggedIn) {
    return <Navigate to={RoutingPath.LOGIN} />;
  }

  return (
    <div className="hidden md:block">
      <div className="bg-background">
        <div className="grid md:grid-cols-4 lg:grid-cols-5">
          <Sidebar selected={selected} className="hidden h-lvh md:block" />
          <div className="col-span-3 md:border-l lg:col-span-4">
            <div className="h-full px-4 py-6 lg:px-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
