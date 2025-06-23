import React from 'react';
import { motion } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = React.useState(false);

  const tooltipVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {visible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={tooltipVariants}
          transition={{ duration: 0.2 }}
          className="absolute left-[45px] top-2 mb-1 bg-black dark:bg-white text-white dark:text-black text-sm px-2 py-1 rounded-[36px] shadow-lg z-50 min-w-[150px] text-center font-medium"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;
