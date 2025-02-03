import {cn} from '@/utils/cn';

interface TapItemProps {
  tapName: string;
  selectTap: (tap: string) => void;
  currentTap: string;
}

export default function TapItem({
  tapName,
  selectTap,
  currentTap,
}: TapItemProps) {
  return (
    <button
      onClick={() => selectTap(tapName)}
      className={cn(
        'font-medium transition-colors',
        currentTap === tapName ? 'text-black font-black' : 'text-gray-500',
      )}>
      {tapName}
    </button>
  );
}
