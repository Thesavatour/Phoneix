import { type ClassValue, clsx } from 'clsx';
import exp from 'constants';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateValues(dateRange: {
  start: Date | null;
  end: Date | null;
}) {
  const { start, end } = dateRange;

  if (start && end) {
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  } else if (start) {
    return start.toLocaleDateString();
  } else if (end) {
    return end.toLocaleDateString();
  }

  return '';
}

function getValidStatus(...statuses: (string | undefined)[]): StatusType {
  for (const status of statuses) {
    if (status === 'success' || status === 'error') {
      return status;
    }
  }
  return 'success';
}

function formatToOneDecimal(numStr: string, defaultValue = 2) {
  return parseFloat(numStr).toFixed(defaultValue);
}

function captilizeFirstLetter(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { getValidStatus, formatToOneDecimal, captilizeFirstLetter };
