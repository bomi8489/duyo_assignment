import {cn} from '@/utils/cn';

interface TabItemProps {
  tabName: string;
  selectTab: (tab: string) => void;
  currentTab: string;
}

export default function TabItem({
  tabName,
  selectTab,
  currentTab,
}: TabItemProps) {
  return (
    <button
      onClick={() => selectTab(tabName)}
      className={cn(
        'font-medium transition-colors',
        currentTab === tabName ? 'text-black font-black' : 'text-gray-500',
      )}>
      {tabName}
    </button>
  );
}
