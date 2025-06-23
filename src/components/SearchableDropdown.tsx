import React, {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utilits';

interface SearchableDropdownProps {
  label?: string;
  options?: Option[];
  searchTerm: string;
  searchPlaceholder?: string;
  containerClass?: string;
  dropdownClass?: string;
  noDataText?: string;
  loading?: boolean;
  onSearchChange: (searchTerm: string) => void;
  onSelect: (option: Option) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options = [],
  label = '',
  searchTerm,
  loading = false,
  searchPlaceholder = 'Search...',
  noDataText = 'No options found',
  containerClass = '',
  dropdownClass = '',
  onSearchChange,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [dropdownReady, setDropdownReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    onSearchChange(option.label);
    setIsOpen(false);
  };

  const updateDropdownPosition = useCallback(() => {
    if (inputRef.current) {
      const { bottom, left, width } = inputRef.current.getBoundingClientRect();
      setDropdownPosition({ top: bottom + window.scrollY, left, width });
      setDropdownReady(true);
    }
  }, []);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, updateDropdownPosition, handleClickOutside]);

  useEffect(() => {
    if (!searchTerm) setSelectedOption(null);
  }, [searchTerm]);

  useEffect(() => {
    if (isOpen) {
      setDropdownReady(false);
      setTimeout(updateDropdownPosition, 0);
    }
  }, [isOpen, updateDropdownPosition]);

  return (
    <div className={cn('relative w-full', containerClass)}>
      {label && (
        <label className="text-sm text-white" htmlFor="search">
          {label}
        </label>
      )}
      <input
        type="text"
        ref={inputRef}
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onSearchChange(e.target.value);
          setIsOpen(true);
          if (e.target.value === '') setSelectedOption(null);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={selectedOption ? selectedOption.label : searchPlaceholder}
        className="w-full h-[46px] p-2 text-[13px] px-3 py-[13px] dark:bg-white-rgba-13 bg-green backdrop-blur-[12.5px] rounded-[30px] focus:outline-none mt-[10px]"
      />

      {isOpen &&
        dropdownReady &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
            }}
            className={cn(
              'mt-[10px] border dark:border-[#313131] border-[#E4E4E2] dark:bg-black bg-white rounded-[20px] shadow-lg z-50 p-3 max-h-[300px] overflow-y-auto',
              dropdownClass
            )}
          >
            {loading ? (
              <p className="text-center">Loading....</p>
            ) : (
              <ul className="max-h-48 overflow-y-auto">
                {options.length > 0 ? (
                  options.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className="p-2 cursor-pointer dark:hover:bg-primary hover:bg-black dark:hover:text-black hover:text-white rounded-[30px]"
                    >
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">{noDataText}</li>
                )}
              </ul>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

export default SearchableDropdown;
