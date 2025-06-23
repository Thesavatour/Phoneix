import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';

import { cn } from '@/utilits';

const modalStyles = cva('relative py-[20px] px-4 rounded-[30px] max-w-full', {
  variants: {
    size: {
      sm: 'w-[90%] sm:w-[60%] xl:w-1/3',
      md: 'w-[90%] sm:w-1/2 xl:w-1/3',
      xl: 'w-[90%] sm:w-[60%] xl:w-3/4 lg:w-2/3',
      full: 'w-full',
    },
    bg: {
      default: 'dark:bg-[#4C4C4C] bg-white text-white',
      slate: 'bg-slate-800 text-white',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    size: 'md',
    bg: 'default',
  },
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'xl' | 'full';
  bg?: 'default' | 'slate' | 'transparent';
}

const Modal = ({
  isOpen,
  onClose,
  size = 'md',
  bg = 'default',
  children,
}: PropsWithChildren<ModalProps>) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300"
      onClick={onClose}
    >
      <motion.div
        className={cn(modalStyles({ size, bg }), 'pointer-events-auto')}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>,
    document.body
  );
};

interface ModalBodyProps {
  clssName?: string;
}

const ModalBody = ({
  children,
  clssName,
}: PropsWithChildren<ModalBodyProps>) => (
  <div className={cn('leading-normal text-slate-600 font-light', clssName)}>
    {children}
  </div>
);

Modal.Body = ModalBody;

export default Modal;
