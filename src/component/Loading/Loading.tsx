import React from 'react';
import { TailSpin } from 'react-loader-spinner';

interface LoadingProps {
  customHeightClass?: string;
  viewportHeight?: boolean;
}

export default function Loading({
  customHeightClass,
  viewportHeight,
}: LoadingProps) {
  const heightClass = customHeightClass || (viewportHeight ? 'h-dvh' : 'h-5/6');
  return (
    <div
      className={`w-full mx-auto flex items-center justify-center ${heightClass}`}
    >
      <TailSpin
        height="80"
        width="80"
        color="#000"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
