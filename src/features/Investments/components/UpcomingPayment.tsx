'use client';

import React, { useEffect, useState } from 'react';

interface UpcomingPaymentProps {
  profitTime: string;
}

const UpcomingPayment: React.FC<UpcomingPaymentProps> = ({ profitTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>('Calculating...');

  useEffect(() => {
    if (!profitTime) {
      setTimeLeft('Invalid date');
      return;
    }

    const countDownDate = new Date(profitTime).getTime();

    if (isNaN(countDownDate)) {
      setTimeLeft('Invalid date');
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        setTimeLeft('EXPIRED');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [profitTime]);

  return <span>{timeLeft}</span>;
};

export default UpcomingPayment;
