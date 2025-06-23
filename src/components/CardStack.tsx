import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';

import { cn, formatToOneDecimal } from '@/utilits';
import useGlobalSettings from '@/hooks/useGlobalSettings';

const ProgressCircle: React.FC<{ percentage: number }> = ({ percentage }) => {
  const radius = 34.58;
  const normalizedRadius = radius - 5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="absolute right-4 top-1/2 transform -translate-y-1/2"
    >
      <circle
        stroke="#31313140"
        fill="transparent"
        strokeWidth="5"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <motion.circle
        stroke="black"
        fill="transparent"
        strokeWidth="5"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.5 }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="black"
        fontSize="12px"
      >
        {percentage}%
      </text>
    </svg>
  );
};

const cardStyle = cva('absolute rounded-[28px] p-4 cursor-pointer bg-black', {
  variants: {
    size: {
      small: 'w-32 h-48',
      large: 'w-full h-[125px]',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

interface Props {
  data: Statistics;
}

const CardStack = ({ data }: Props) => {
  const [cards, setCards] = useState(data);
  const { data: globalSettings } = useGlobalSettings();

  const handleCardClick = (id: number) => {
    setCards((prev) => {
      const updated = [...prev];
      const clickedIndex = updated.findIndex((card) => card.id === id);

      if (clickedIndex === 0) {
        const [firstCard] = updated.splice(0, 1);
        updated.push(firstCard);
      } else {
        const [clickedCard] = updated.splice(clickedIndex, 1);
        updated.unshift(clickedCard);
      }

      return updated;
    });
  };

  return (
    <div className="relative w-full h-96">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={cn(
              cardStyle({ size: 'large' }),
              index === 0 ? 'bg-menu-card-bg-light bg-no-repeat bg-right' : ''
            )}
            style={{
              backgroundColor: card.color,
              zIndex: cards.length - index,
            }}
            onClick={() => handleCardClick(card.id)}
            initial={{ y: -200, opacity: 0, scale: 0.8 }}
            animate={{
              y: index * -50,
              opacity: 1,
              scale: 1 - index * 0.05,
            }}
            exit={{ opacity: 0, y: 200 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              delay: index * 0.1,
            }}
          >
            <div className="flex justify-between items-center h-full overflow-hidden">
              <div>
                <h2
                  className={`text-base leading-[22.2px] mb-5 ${
                    index === 0 ? 'text-black' : 'text-white'
                  }`}
                >
                  {card.title}
                </h2>
                <div className="flex gap-1 items-baseline">
                  <p
                    className={`text-[23px] leading-[34px] ${index === 0 ? 'text-black' : 'text-white'}`}
                  >
                    {globalSettings?.currency_symbol}
                    {formatToOneDecimal(card.amount)}
                  </p>
                </div>
              </div>
              {index === 0 && card.percentage !== null && (
                <ProgressCircle percentage={card.percentage} />
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CardStack;
