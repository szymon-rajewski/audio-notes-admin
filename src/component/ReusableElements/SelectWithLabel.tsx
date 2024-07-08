import React from 'react';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select/Select';
import { SelectTrigger } from '../ui/Select/SelectTrigger';
import { SelectValue } from '../ui/Select/SelectValue';
import { SelectContent } from '../ui/Select/SelectContent';
import { SelectGroup } from '../ui/Select/SelectGroup';
import { SelectItem } from '../ui/Select/SelectItem';

export interface SelectWithLabelItem {
  id?: string;
  label: string;
  value: string;
}

interface SelectWithLabelProps {
  value: string;
  label: string;
  placeholder?: string;
  error: any;
  options: SelectWithLabelItem[];
  onChange: (value: string) => void;
}

function SelectWithLabel({
  value,
  label,
  error,
  options,
  onChange,
}: SelectWithLabelProps) {
  return (
    <div className="mb-5 flex w-full flex-col">
      <Label className="font-bold">{label}</Label>
      <div className="mt-1.5">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option, index) => (
                <SelectItem key={index} value={option?.value}>
                  {option?.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {error ? <p className="text-xs text-red-500 pt-1.5">{error}</p> : null}
      </div>
    </div>
  );
}

export default SelectWithLabel;
