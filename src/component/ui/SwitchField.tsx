import * as React from 'react';
import { Switch } from './Switch';
import { Label } from './Label';

interface SwitchFieldProps {
  label: string;
  onChange: (value: boolean) => void;
}

export function SwitchField({ label, onChange }: SwitchFieldProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch onCheckedChange={onChange} />
      <Label>{label}</Label>
    </div>
  );
}
