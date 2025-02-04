import {cn} from '@/utils/cn';
import {
  ClipboardPaste,
  FilesIcon,
  Scissors,
  Trash2,
  Image,
  FilePlus2,
  Undo2,
  Redo2,
  LayoutPanelTop,
  ScanText,
  TextSelect,
  Video,
  RectangleHorizontal,
  Circle,
  Presentation,
} from 'lucide-react';

const MENU_ITEMS: Record<
  string,
  {
    title: string;
    content: {
      icon: React.ReactNode;
      label?: string;
      color?: string;
      available: boolean;
      type: 'sm' | 'lg';
    }[];
  }[]
> = {
  파일: [
    {
      title: '저장',
      content: [
        {icon: <Image />, label: 'SVG로 저장', available: true, type: 'lg'},
        {icon: <Image />, label: 'PNG로 저장', available: true, type: 'lg'},
      ],
    },
  ],
  홈: [
    {
      title: '실행 취소',
      content: [
        {icon: <Undo2 />, available: false, type: 'sm'},
        {icon: <Redo2 />, available: false, type: 'sm'},
      ],
    },
    {
      title: '클립보드',
      content: [
        {
          icon: <ClipboardPaste />,
          label: '붙여넣기',
          available: false,
          type: 'lg',
        },
        {
          icon: <Scissors size={20} />,
          label: '자르기',
          available: false,
          type: 'sm',
        },
        {
          icon: <FilesIcon size={20} />,
          label: '복사',
          available: false,
          type: 'sm',
        },
      ],
    },
    {
      title: '삭제',
      content: [
        {
          icon: <Trash2 className='text-red-600' />,
          label: '삭제',
          color: 'text-red-600',
          available: false,
          type: 'lg',
        },
      ],
    },
    {
      title: '슬라이드',
      content: [
        {
          icon: <FilePlus2 />,
          label: '새 슬라이드',
          available: false,
          type: 'lg',
        },
        {
          icon: <ScanText size={20} />,
          label: '복사',
          available: false,
          type: 'sm',
        },
        {
          icon: <LayoutPanelTop size={20} />,
          label: '템플릿',
          available: false,
          type: 'sm',
        },
      ],
    },
  ],
  삽입: [
    {
      title: '슬라이드',
      content: [
        {
          icon: <FilePlus2 />,
          label: '새 슬라이드',
          available: false,
          type: 'lg',
        },
      ],
    },
    {
      title: '텍스트',
      content: [
        {
          icon: <TextSelect />,
          label: '텍스트 상자',
          available: false,
          type: 'lg',
        },
      ],
    },
    {
      title: '미디어',
      content: [
        {icon: <Image />, label: '그림', available: false, type: 'lg'},
        {icon: <Video />, label: '비디오', available: false, type: 'lg'},
      ],
    },
    {
      title: '도형',
      content: [
        {
          icon: <RectangleHorizontal />,
          label: '사각형',
          available: true,
          type: 'lg',
        },
        {icon: <Circle />, label: '원', available: true, type: 'lg'},
      ],
    },
  ],
  슬라이드쇼: [
    {
      title: '슬라이드 쇼',
      content: [
        {
          icon: <Presentation className='text-green-600' />,
          label: '처음부터',
          available: false,
          type: 'lg',
        },
        {
          icon: <Presentation className='text-blue-600' />,
          label: '현재 슬라이드부터',
          available: false,
          type: 'lg',
        },
      ],
    },
  ],
};

export default function RibbonMenu({currentTab}: {currentTab: string}) {
  return (
    <div
      className={cn(
        'shadow-md p-2 bg-white border border-gray-300 rounded-lg flex text-slate-800',
      )}>
      {MENU_ITEMS[currentTab]?.map((group, index) => (
        <div
          key={index}
          className='flex flex-col items-center px-2 border-r justify-center'>
          <div className='flex'>
            <div className='flex'>
              {group.content
                .filter(item => item.type === 'lg')
                .map((item, i) => (
                  <button
                    key={i}
                    className={cn(
                      'flex flex-col gap-3 items-center p-3 rounded hover:bg-gray-100',
                      !item.available && 'cursor-not-allowed',
                    )}
                    disabled={!item.available}>
                    <span>{item.icon}</span>
                    {item.label && (
                      <span className={cn('text-sm', item.color)}>
                        {item.label}
                      </span>
                    )}
                  </button>
                ))}
            </div>

            <div className='flex flex-col gap-1'>
              {group.content
                .filter(item => item.type === 'sm')
                .map((item, i) => (
                  <button
                    key={i}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded hover:bg-gray-100',
                      !item.available && 'cursor-not-allowed',
                    )}
                    disabled={!item.available}>
                    <span className='text-2xl'>{item.icon}</span>
                    {item.label && (
                      <span className={cn('text-sm', item.color)}>
                        {item.label}
                      </span>
                    )}
                  </button>
                ))}
            </div>
          </div>

          <span className='text-sm text-slate-600'>{group.title}</span>
        </div>
      ))}
    </div>
  );
}
