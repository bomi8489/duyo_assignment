'use client';

import RibbonMenu from './RibbonMenu/RibbonMenu';
import RibbonTab from './RibbonTab/RibbonTab';
import {useTabs} from './hooks/useTabs';

export default function Ribbon() {
  const {currentTab, selectTab} = useTabs();

  return (
    <div className='flex flex-col gap-4'>
      <RibbonTab
        currentTab={currentTab}
        selectTab={selectTab}
      />
      <RibbonMenu currentTab={currentTab} />
    </div>
  );
}
