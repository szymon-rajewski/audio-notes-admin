import React from 'react';
import { Button, ButtonProps } from './Button';
import { LucideIcon } from 'lucide-react';

interface SidebarProps extends ButtonProps {
  isSelected: boolean;
  label: string;
  Icon: LucideIcon;
}

export function SidebarButton({
  isSelected,
  label,
  Icon,
  onClick,
}: SidebarProps) {
  return (
    <Button
      onClick={onClick}
      variant={isSelected ? 'activeSidebar' : 'ghost'}
      className="w-full justify-start"
    >
      <Icon className="mr-2 inline size-5" />
      {label}
    </Button>
  );
}
