'use client';

import {cn} from '@/utils/cn';
import {useState, useEffect, useRef} from 'react';

export default function Slide() {
  const [ratio, setRatio] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setRatio(prev => {
          const next = prev - e.deltaY / 1000;
          return Math.min(2, Math.max(0.1, next));
        });
      }
    };

    container.addEventListener('wheel', handleWheel, {passive: false});
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='relative flex w-screen'>
      <div
        ref={containerRef}
        className='absolute flex w-full flex-col items-center justify-center'>
        <div
          className={cn(
            'flex rounded-lg border-neutral-300 bg-white shadow-xl translate ease-out duration-200',
          )}
          style={{
            width: 1600,
            height: 900,
            transform: `scale(${ratio})`,
            transformOrigin: 'top',
          }}>
          <div className='width: 1600px; height: 900px;'>
            <div className='relative h-full w-full'>
              <div className='absolute h-full w-full'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
