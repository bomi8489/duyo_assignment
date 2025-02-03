import {useState} from 'react';

export const useTaps = () => {
  const [currentTap, setCurrentTap] = useState<string>('');

  const selectTap = (tap: string) => {
    setCurrentTap(tap);
  };

  return {currentTap, selectTap};
};
