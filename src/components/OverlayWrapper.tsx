import React, { PropsWithChildren } from 'react';

interface OverlayWrapperProps {
  loading: boolean;
}

const OverlayWrapper = ({
  children,
  loading,
}: PropsWithChildren<OverlayWrapperProps>) => {
  return (
    <div className="relative w-full h-full">
      {children}
      {loading && (
        <div className="absolute inset-0 flex justify-center bg-black bg-opacity-50 z-50 rounded-[30px]">
          <span className="text-white text-lg  mt-20 ">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default OverlayWrapper;
