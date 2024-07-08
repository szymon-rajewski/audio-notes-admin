import React, { ReactNode } from 'react';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { UseFormRegister } from 'react-hook-form';
import RangeNumberValueTuple from '../../offer/RangeNumberValueTuple';

interface RangeInputWithLabelProps {
  value?: string;
  label: string;
  labelExplain?: ReactNode;
  id?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  name: string;
  errors: any;
  type?: string;
  InputComponent?: ReactNode;
  marginBottom?: boolean;
  onChange?: (value: string) => void;
}

export default function RangeInputWithLabel({
  label,
  labelExplain,
  placeholder,
  register,
  name,
  errors,
  type,
  value,
  InputComponent,
  onChange,
  marginBottom = true,
}: RangeInputWithLabelProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const marginBottomClass = marginBottom ? 'mb-5' : '';

  return (
    <div className={`flex w-full items-center gap-1.5 ${marginBottomClass}`}>
      <div className=""></div>
      <Label className="font-bold">
        {label} {labelExplain || null}
      </Label>
      {InputComponent || (
        <Input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
      )}

      {errors && errors[name] && (
        <p className="text-xs text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
}
