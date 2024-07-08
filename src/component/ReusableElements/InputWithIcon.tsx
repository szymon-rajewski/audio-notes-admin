import React from 'react';
import { Input } from '../ui/Input';
import { LucideIcon } from 'lucide-react';

type Props = {
  value?: string;
  label?: string;
  placeholder: string;
  type?: string;
  onChange?: any;
  Icon: LucideIcon;
};

export const InputWithIcon: React.FC<Props> = ({
  value,
  placeholder,
  type,
  onChange,
  Icon,
}) => {
  return (
    <div className="relative mb-2 grid w-full items-center gap-1.5">
      <Icon className="absolute left-2 top-2.5 size-5 h-5 w-5 text-muted-foreground" />
      <Input
        className="pl-8"
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
