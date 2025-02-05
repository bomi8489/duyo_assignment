'use client';

import {memo, useEffect, useState} from 'react';
import RibbonMenu from './RibbonMenu/RibbonMenu';
import RibbonTab from './RibbonTab/RibbonTab';
import {useTabs} from './hooks/useTabs';
import {useRibbonStore} from '@/store/useRibbonStore';
import {cn} from '@/utils/cn';

function Ribbon() {
  const {currentTab, selectTab} = useTabs();
  const {isMenuHidden} = useRibbonStore();
  const [shouldRender, setShouldRender] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isMenuHidden) {
      setIsAnimating(false);

      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);

      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    }
  }, [isMenuHidden]);

  return (
    <div className='flex flex-col gap-4'>
      <RibbonTab
        currentTab={currentTab}
        selectTab={selectTab}
      />

      {shouldRender && (
        <div
          className={cn(
            'transition-opacity duration-300 ease-out',
            isAnimating ? 'opacity-100' : 'opacity-0',
          )}>
          <RibbonMenu currentTab={currentTab} />
        </div>
      )}
    </div>
  );
}

export default memo(Ribbon);
