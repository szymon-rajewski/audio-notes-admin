import React from 'react';
import { Button } from '../ui/Button';
import { FaGoogle } from 'react-icons/fa';
type FormContentButtonsProps = {
  buttonLabel: string;
  separator: string;
};
const FormContentButtons: React.FC<FormContentButtonsProps> = ({
  buttonLabel,
  separator,
}) => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          icon={<FaGoogle />}
          iconSize="text-xl"
        >
          <p className="text-lg">{buttonLabel}</p>
        </Button>
      </div>
      <div className="flex flex-col space-y-1.5">
        <div className="relative my-4 flex w-full items-center justify-center border-t border-gray-200">
          <p className="text-sm absolute z-10 bg-white p-3 text-center text-gray-400">
            {separator}
          </p>
        </div>
      </div>
    </>
  );
};

export default FormContentButtons;
