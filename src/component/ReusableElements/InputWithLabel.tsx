import React, { ReactNode } from 'react';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  value?: string;
  label?: string;
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
};

export const InputWithLabel: React.FC<Props> = ({
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
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const marginBottomClass = marginBottom ? 'mb-5' : '';

  return (
    <div className={`grid w-full items-center gap-1.5 ${marginBottomClass}`}>
      {label ? (
        <Label className="font-bold">
          {label} {labelExplain || null}
        </Label>
      ) : null}
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
};
