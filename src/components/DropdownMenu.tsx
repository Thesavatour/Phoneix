'use client';

import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  PropsWithChildren,
} from 'react';
import { cva } from 'class-variance-authority';
import {
  useFloating,
  offset as floatingOffset,
  flip,
  shift,
  autoUpdate,
  ReferenceElement,
  FloatingElement,
} from '@floating-ui/react';

import { cn } from '@/utilits';
import Dropicon from '@/icons/Dropicon';

const menuStyles = cva(
  'absolute z-10 overflow-auto rounded-[20px] border dark:border-[#313131] border-[#E4E4E2] bg-white dark:bg-[#000] p-[11px] focus:outline-none w-full',
  {
    variants: {
      position: {
        left: 'left-0',
        right: 'right-0',
      },
    },
    defaultVariants: {
      position: 'left',
    },
  }
);

interface Option<T> {
  value: T;
  label: string;
  leading?: ReactNode;
}

interface DropdownMenuProps<T> {
  position?: 'left' | 'right';
  options?: Option<T>[];
  buttonText?: any;
  optionClassName?: string;
  buttonClassName?: string;
  button?: React.ReactNode;
  onChange?: (value: Option<T>) => void;
}

const DropdownMenu = <T,>({
  position = 'left',
  options,
  onChange,
  buttonText,
  children,
  optionClassName,
  buttonClassName = 'min-w-[230px]',
  button,
}: PropsWithChildren<DropdownMenuProps<T>>) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const { refs, floatingStyles, update } = useFloating({
    middleware: [floatingOffset(10), flip(), shift()],
    placement: 'bottom-start',
  });

  useEffect(() => {
    if (isOpen) {
      return autoUpdate(
        refs?.reference?.current as ReferenceElement,
        refs.floating.current as FloatingElement,
        update
      );
    }
  }, [isOpen, refs, update]);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option<T>) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        ref={(el) => {
          refs.setReference(el);
          buttonRef.current = el;
        }}
        onClick={handleToggleMenu}
        className="w-full block"
      >
        {button && button}
        {buttonText && (
          <button
            className={cn(
              'w-full flex items-center justify-between border border-[#E4E4E2] dark:border-[#313131] bg-green dark:bg-[#000] px-4 py-[10px] h-[36px] rounded-[30px] dark:text-white text-black',
              buttonClassName
            )}
          >
            <span className="text-sm font-normal">{buttonText}</span>
            <span
              className={cn(
                'transition-transform duration-300',
                !isOpen ? 'rotate-180' : 'rotate-0'
              )}
            >
              <Dropicon />
            </span>
          </button>
        )}
      </div>
      {isOpen && (
        <ul
          ref={(el) => {
            refs.setFloating(el);
            menuRef.current = el;
          }}
          role="menu"
          style={floatingStyles}
          className={cn(menuStyles({ position }), optionClassName)}
        >
          {options?.map((option) => (
            <li
              key={String(option.value)}
              role="menuitem"
              className="cursor-pointer dark:text-white text-black flex gap-2 text-sm items-center rounded-[30px] px-[15px] py-[7px] transition-all dark:hover:bg-[#DFFF45] hover:bg-black dark:hover:text-black hover:text-white focus:bg-primary-50 w-full "
              onClick={() => handleOptionClick(option)}
            >
              {option.leading && <>{option.leading}</>}
              {option.label}
            </li>
          ))}
          {children}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
