'use client';

import React, {useEffect, useRef, useState} from 'react';
import TapItem from './TapItem';
import {useTaps} from './hooks/useTaps';
import {TAP} from '@/constants';

export default function Tap() {
  const {currentTap, selectTap} = useTaps();
  const [indicatorStyle, setIndicatorStyle] = useState({left: 0, width: 0});
  const tabsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = TAP.indexOf(currentTap);
    const currentTabElement = tabsRef.current[currentIndex];

    if (currentTabElement) {
      const {offsetLeft, clientWidth} = currentTabElement;
      setIndicatorStyle({left: offsetLeft, width: clientWidth});
    }
  }, [currentTap]);

  return (
    <div className='relative'>
      <div className='flex'>
        {TAP.map((tapName, index) => (
          <div
            key={tapName}
            ref={el => {
              tabsRef.current[index] = el;
            }}
            className='relative mx-2 px-2 py-1 rounded-md hover:bg-gray-100'>
            <TapItem
              tapName={tapName}
              selectTap={selectTap}
              currentTap={currentTap}
            />
          </div>
        ))}
      </div>
      <div
        className='absolute bottom-0 h-[2px] bg-black transition-all duration-200'
        style={{
          left: `${indicatorStyle.left + 8}px`,
          width: `${indicatorStyle.width - 16}px`,
        }}
      />
    </div>
  );
}
