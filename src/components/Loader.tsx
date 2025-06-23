'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Logo from '@/icons/Logo';

function Loader() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center -z-10">
      <div className="spin-and-zoom-animation transition-transform duration-500">
        <Logo />
      </div>
    </div>,
    document?.body
  );
}

export default Loader;
