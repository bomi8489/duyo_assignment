'use client';

import {useShapeStore} from '@/store/shapeStore';
import {cn} from '@/utils/cn';
import {useState, useEffect, useRef} from 'react';
import html2canvas from 'html2canvas';
import {useRibbonStore} from '@/store/useRibbonStore';
import {useSlideStore} from '@/store/slideStore';

export default function Slide() {
  const [ratio, setRatio] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const shapes = useShapeStore(state => state.shapes);
  const updateShapePosition = useShapeStore(state => state.updateShapePosition);
  const [draggingShape, setDraggingShape] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const {isMenuHidden} = useRibbonStore();

  // PNG 저장
  const saveAsPNG = async () => {
    if (!slideRef.current) return;

    const slideRect = slideRef.current.getBoundingClientRect();

    // 현재 적용된 스케일 비율을 기반으로 캡처 크기 조정
    const scaledWidth = slideRect.width * ratio;
    const scaledHeight = slideRect.height * ratio;

    try {
      // html2canvas에서 캡처할 영역을 슬라이드 크기와 맞게 설정
      const canvas = await html2canvas(slideRef.current, {
        backgroundColor: 'white',
        scale: 2,
        x: 0,
        y: 0,
        width: scaledWidth,
        height: scaledHeight,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'slide.png';
      link.click();
    } catch (error) {
      console.error('PNG 저장 중 오류 발생:', error);
    }
  };

  // SVG 저장
  const saveAsSVG = () => {
    if (!slideRef.current) return;
    const slideWidth = 1600;
    const slideHeight = 900;

    // SVG 콘텐츠 시작
    let svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${slideWidth}" height="${slideHeight}" viewBox="0 0 ${slideWidth} ${slideHeight}" style="overflow: hidden;">
      <!-- 슬라이드 배경색 -->
      <rect width="${slideWidth}" height="${slideHeight}" fill="white" />
  `;

    const shapes = useShapeStore.getState().shapes;

    // 도형을 스케일에 맞게 변환하여 추가
    shapes.forEach(shape => {
      const {x, y, width, height, color, borderColor, type} = shape;
      const scaledX = x;
      const scaledY = y;
      const scaledWidth = width;
      const scaledHeight = height;

      if (type === 'circle') {
        const radius = Math.min(scaledWidth, scaledHeight) / 2;
        svgContent += `
        <circle cx="${scaledX + radius}" cy="${
          scaledY + radius
        }" r="${radius}" fill="${color}" stroke="${borderColor}" stroke-width="3" />
      `;
      } else {
        svgContent += `
        <rect x="${scaledX}" y="${scaledY}" width="${scaledWidth}" height="${scaledHeight}" fill="${color}" stroke="${borderColor}" stroke-width="3" />
      `;
      }
    });

    svgContent += `</svg>`;

    // Blob을 생성하고 다운로드 링크 설정
    const blob = new Blob([svgContent], {type: 'image/svg+xml'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'slide.svg';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  useEffect(() => {
    useSlideStore.getState().setSaveFunctions(saveAsPNG, saveAsSVG);
  }, []);

  useEffect(() => {
    setRatio(isMenuHidden ? 0.75 : 0.6);
  }, [isMenuHidden]);

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
    <>
      <main className='relative h-full flex w-screen'>
        <div
          ref={containerRef}
          className='absolute h-full flex w-full flex-col items-center justify-center'>
          <div
            ref={slideRef}
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
                    height:
                      shape.type === 'circle' ? shape.width : shape.height,
                    backgroundColor: shape.color,
                    borderRadius: shape.type === 'circle' ? '50%' : '0',
                    border: `3px solid ${shape.borderColor}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className='bg-[#f2f3f5] justify-end border-t border-slate-300 fixed bottom-0 w-full py-1 px-4 flex items-center z-50'>
        <div className='flex justify-center items-center gap-2'>
          <button
            onClick={() => setRatio(prev => Math.max(0.1, prev - 0.05))}
            className='text-slate-500 cursor-pointer'>
            -
          </button>
          <input
            type='range'
            min='10'
            max='200'
            value={ratio * 100}
            step='5'
            onChange={e => setRatio(Number(e.target.value) / 100)}
            className='cursor-pointer'
            style={{
              height: '8px',
              background: '#d3d3d3',
              WebkitAppearance: 'none',
              borderRadius: '10px',
              outline: 'none',
              transition: 'background 450ms ease-in',
              accentColor: '#404040',
            }}
          />
          <button
            onClick={() => setRatio(prev => Math.min(2, prev + 0.05))}
            className='text-slate-500 cursor-pointer'>
            +
          </button>
          <span className='text-sm'>{Math.round(ratio * 100)}%</span>
        </div>
      </footer>
    </>
  );
}
