'use client';

import {memo, useEffect, useRef, useState} from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ribbonRef = useRef<HTMLDivElement>(null);

  // 리본메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ribbonRef.current && !ribbonRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div
      ref={ribbonRef}
      className='flex flex-col gap-4'>
      <RibbonTab
        currentTab={currentTab}
        selectTab={selectTab}
        isMenuHidden={isMenuHidden}
        setIsMenuOpen={setIsMenuOpen}
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
      {isMenuOpen && (
        <div className={cn('transition-opacity duration-300 ease-out')}>
          <RibbonMenu currentTab={currentTab} />
        </div>
      )}
    </div>
  );
}

export default memo(Ribbon);
