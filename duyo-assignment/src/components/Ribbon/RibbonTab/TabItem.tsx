import {useRibbonStore} from '@/store/useRibbonStore';
import {cn} from '@/utils/cn';
import {Dispatch, SetStateAction} from 'react';

interface TabItemProps {
  tabName: string;
  selectTab: (tab: string) => void;
  currentTab: string;
  isMenuHidden: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function TabItem({
  tabName,
  selectTab,
  currentTab,
  isMenuHidden,
  setIsMenuOpen,
}: TabItemProps) {
  const {toggleMenu} = useRibbonStore();
  return (
    <button
      onClick={() => {
        selectTab(tabName);
        isMenuHidden && setIsMenuOpen(true);
      }}
      onDoubleClick={() => {
        setIsMenuOpen(false);
        toggleMenu();
      }}
      className={cn(
        'font-medium transition-colors',
        currentTab === tabName ? 'text-black font-black' : 'text-gray-500',
      )}>
      {tabName}
    </button>
  );
}
