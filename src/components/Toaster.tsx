'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { cva } from 'class-variance-authority';

import { cn } from '@/utilits';

const toasterStyles = cva(
  'fixed p-4 rounded-md shadow-lg transition-all duration-300 ease-in-out z-[9999]',
  {
    variants: {
      type: {
        success: 'bg-[#28A745] text-white',
        error: 'bg-red-500 text-white',
      },
      position: {
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      },
      visible: {
        true: 'opacity-100 translate-y-0',
        false: 'opacity-0 translate-y-4',
      },
    },
    defaultVariants: {
      type: 'success',
      position: 'top-right',
      visible: false,
    },
  }
);

type ToasterProps = {
  message: string;
  type?: StatusType;
  position?:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'bottom-center'
    | 'top-center';
  duration?: number;
  isOpen: boolean;
  onClose: () => void;
};

const Toaster = ({
  message,
  type = 'success',
  position = 'bottom-right',
  duration = 3000,
  isOpen,
  onClose,
}: ToasterProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={cn(toasterStyles({ visible: isOpen, type, position }))}>
      <p>{message}</p>
    </div>,
    document.body
  );
};

export default Toaster;
