import {useState} from 'react';

export const useTabs = () => {
  const [currentTab, setCurrentTab] = useState<string>('홈');

  const selectTab = (tap: string) => {
    setCurrentTab(tap);
  };

  return {currentTab, selectTab};
};
