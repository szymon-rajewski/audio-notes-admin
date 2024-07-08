import React from 'react';
import { cn } from '../util/css';
import {
  PlaySquare,
  Smile,
  User,
  BookmarkCheck,
  Home,
  Contact,
  UserSearch,
} from 'lucide-react';
import RoutingPath from '../routing/RoutingPath';
import { SidebarButton } from './ui/SidebarButton';
import { SidebarHeader } from './SidebarHeader';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: string;
}

export function Sidebar({ selected, className }: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <SidebarHeader label={'Overview'} />
          <div className="space-y-1">
            <SidebarButton
              label={t('sidebar.overview')}
              isSelected={selected === RoutingPath.MAIN || selected === '/'}
              Icon={Home}
              onClick={() => navigate(RoutingPath.MAIN)}
            />
          </div>
        </div>
        <div className="px-3 py-2">
          <SidebarHeader label={t('sidebar.users')} />
          <div className="space-y-1">
            <SidebarButton
              label={t('sidebar.all')}
              isSelected={selected === RoutingPath.USERS}
              Icon={UserSearch}
              onClick={() => navigate(RoutingPath.USERS)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
