'use client';

import React, {useEffect, useRef, useState} from 'react';
import {TAB} from '@/constants';
import TabItem from './TabItem';

interface RibbonTabProps {
  currentTab: string;
  selectTab: (tab: string) => void;
}

export default function RibbonTab({currentTab, selectTab}: RibbonTabProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({left: 0, width: 0});
  const tabsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = TAB.indexOf(currentTab);
    const currentTabElement = tabsRef.current[currentIndex];

    if (currentTabElement) {
      const {offsetLeft, clientWidth} = currentTabElement;
      setIndicatorStyle({left: offsetLeft, width: clientWidth});
    }
  }, [currentTab]);

  return (
    <div className='relative'>
      <div className='flex'>
        {TAB.map((tabName, index) => (
          <div
            key={tabName}
            ref={el => {
              tabsRef.current[index] = el;
            }}
            className='relative mx-2 px-2 py-1 rounded-md hover:bg-gray-100'>
            <TabItem
              tabName={tabName}
              selectTab={selectTab}
              currentTab={currentTab}
            />
          </div>
        ))}
      </div>
      <div
        className='absolute bottom-0 h-[2px] bg-black transition-all duration-150'
        style={{
          left: `${indicatorStyle.left + 8}px`,
          width: `${indicatorStyle.width - 16}px`,
        }}
      />
    </div>
  );
}
