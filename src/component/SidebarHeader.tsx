import React from 'react';

interface SidebarHeaderProps {
  label: string;
}

export function SidebarHeader({ label }: SidebarHeaderProps) {
  return (
    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{label}</h2>
  );
}
