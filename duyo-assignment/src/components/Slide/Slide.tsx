'use client';

import {useShapeStore} from '@/store/shapeStore';
import {cn} from '@/utils/cn';
import {useState, useEffect, useRef} from 'react';

export default function Slide() {
  const [ratio, setRatio] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const shapes = useShapeStore(state => state.shapes);
  const updateShapePosition = useShapeStore(state => state.updateShapePosition);
  const [draggingShape, setDraggingShape] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // 컨트롤 키 또는 메타 키를 누르면 스케일 조절
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

  // 드래그 시작
  const handleMouseDown =
    (id: string, x: number, y: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      // 스케일을 고려한 오프셋 계산
      const offsetX = (e.clientX - containerRect.left - x * ratio) / ratio;
      const offsetY = (e.clientY - containerRect.top - y * ratio) / ratio;

      setDraggingShape({id, offsetX, offsetY});
    };

  // 드래그 중
  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingShape || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    // 스케일을 고려한 새로운 위치 계산
    const newX =
      (e.clientX - containerRect.left - draggingShape.offsetX * ratio) / ratio;
    const newY =
      (e.clientY - containerRect.top - draggingShape.offsetY * ratio) / ratio;

    requestAnimationFrame(() => {
      updateShapePosition(draggingShape.id, newX, newY);
    });
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setDraggingShape(null);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingShape]);

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
          <div className='relative h-full w-full'>
            {shapes.map(shape => (
              <div
                key={shape.id}
                className='absolute cursor-pointer'
                onMouseDown={handleMouseDown(shape.id, shape.x, shape.y)}
                style={{
                  left: shape.x,
                  top: shape.y,
                  width: shape.width,
                  height: shape.type === 'circle' ? shape.width : shape.height,
                  backgroundColor: shape.color,
                  borderRadius: shape.type === 'circle' ? '50%' : '0',
                  border: `3px solid ${shape.borderColor}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
