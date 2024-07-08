import React from 'react';
import './i18n';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RoutingPath from './routing/RoutingPath';
import Login from './component/Page/Login';
import AuthenticationContextProvider from './component/AuthenticationContextProvider';
import Page from './component/Page/Page';
import { Toaster } from './component/ui/Toast/Toaster';
import UserListPage from './component/Offer/UserListPage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path={RoutingPath.MAIN}
              element={<Page>Overview page</Page>}
            />
            <Route path={RoutingPath.USERS} element={<UserListPage />} />
            <Route path={RoutingPath.LOGIN} element={<Login />} />
            <Route path="*" element={<Page>Not found page</Page>} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthenticationContextProvider>
    </QueryClientProvider>
  );
}

export default App;
