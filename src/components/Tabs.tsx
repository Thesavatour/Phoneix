'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Button from './Button';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialTab?: number;
}

function Tabs({ tabs, initialTab = 0 }: TabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [hasChanged, setHasChanged] = useState(false);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setHasChanged(true);
  };

  useEffect(() => {
    if (hasChanged) {
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflowX = '';
    }

    return () => {
      document.body.style.overflowX = '';
    };
  }, [hasChanged]);

  return (
    <div className="w-full h-full">
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab, index) => (
          <Button
            type={activeTab === index ? 'primary' : 'plaintext'}
            key={index}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            initial={hasChanged ? { opacity: 0, x: 50 } : {}}
            animate={hasChanged ? { opacity: 1, x: 0 } : {}}
            exit={hasChanged ? { opacity: 0, x: -50 } : {}}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {tabs[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Tabs;
