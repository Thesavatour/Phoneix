import React from 'react';

interface VerticalLineProps {
  className?: string;
  height?: string;
  color?: string;
  width?: string;
}

function VerticalLine({
  className,
  height = '100%',
  color = '#ECAC31',
  width = '1px',
}: VerticalLineProps) {
  return (
    <div
      className={className}
      style={{
        borderLeft: `${width} solid ${color}`,
        height: height,
        borderRadius: '10px',
      }}
    ></div>
  );
}

export default VerticalLine;
