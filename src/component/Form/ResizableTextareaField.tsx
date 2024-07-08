import React from 'react';
import './ResizableTextarea.css';
import { Label } from '../ui/Label';
import ResizableTextarea from './ResizableTextarea';

interface ResizableTextareaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  error: string;
  onChange: (value: string) => void;
}

const ResizableTextareaField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
}: ResizableTextareaProps) => {
  return (
    <div className="mb-2 grid w-full gap-1.5">
      <Label className="font-bold">{label}</Label>
      <ResizableTextarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

export default ResizableTextareaField;
