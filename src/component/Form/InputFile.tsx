import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import React, { ChangeEvent } from 'react';

export interface InputFileProps {
  multiple?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputFile({ multiple, ref, onChange }: InputFileProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Zdjęcia</Label>
      <Input type="file" multiple={multiple} onChange={onChange} ref={ref} />
    </div>
  );
}
