import React from 'react';
import { Checkbox } from '../ui/Checkbox';

interface CheckboxWithTextProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  name: string;
  error?: string;
  id?: string;
}

export default function CheckboxWithText({
  label,
  value,
  onChange,
  name,
  error,
  id,
}: CheckboxWithTextProps) {
  return (
    <div className="mb-5">
      <div className="items-top flex items-center space-x-2">
        <Checkbox
          checked={value}
          onCheckedChange={onChange}
          id={id}
          className="w-6 h-6"
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
          {/*<p className="text-sm text-muted-foreground"></p>*/}
        </div>
      </div>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
