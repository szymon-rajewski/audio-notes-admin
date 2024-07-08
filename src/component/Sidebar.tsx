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
          <SidebarHeader label={'Oferty'} />
          <div className="space-y-1">
            <SidebarButton
              label={t('sidebar.create')}
              isSelected={selected === RoutingPath.CREATE || selected === '/'}
              Icon={Home}
              onClick={() => navigate(RoutingPath.CREATE)}
            />
            <SidebarButton
              label={t('sidebar.saved')}
              isSelected={selected === RoutingPath.SAVED}
              Icon={BookmarkCheck}
              onClick={() => navigate(RoutingPath.SAVED)}
            />
          </div>
        </div>
        <div className="px-3 py-2">
          <SidebarHeader label={t('sidebar.offerRequests')} />
          <div className="space-y-1">
            <SidebarButton
              label={t('sidebar.offerRequestsAll')}
              isSelected={selected === RoutingPath.OFFER_REQUESTS}
              Icon={UserSearch}
              onClick={() => navigate(RoutingPath.OFFER_REQUESTS)}
            />
          </div>
        </div>
        <div className="p-2">
          <SidebarHeader label={t('sidebar.settings')} />
          <div className="space-y-1">
            <SidebarButton
              label={t('sidebar.account')}
              isSelected={selected === RoutingPath.ACCOUNT}
              Icon={User}
              onClick={() => navigate(RoutingPath.ACCOUNT)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
