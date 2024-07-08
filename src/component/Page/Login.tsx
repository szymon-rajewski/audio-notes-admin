import React, { ReactNode, useEffect } from 'react';

import { TabsList } from '../ui/Tabs/TabsList';
import { TabsTrigger } from '../ui/Tabs/TabsTrigger';
import { TabsContent } from '../ui/Tabs/TabsContent';
import LoginForm from '../Login/LoginForm';
import { Tabs } from '../ui/Tabs/Tabs';
import UserApi from '../../api/UserApi';

export default function Login() {
  return (
    <div className="hidden md:block">
      <div className="bg-background">
        <div className="container min-h-lvh">
          <div className="flex min-h-lvh columns-1 items-center justify-center pb-3 pt-3">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
