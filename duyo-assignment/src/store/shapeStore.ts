import {create} from 'zustand';

export type Shape = {
  id: string;
  type: 'circle' | 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  borderColor: string;
};

type ShapeStore = {
  shapes: Shape[];
  addShape: (type: 'circle' | 'rectangle') => void;
  updateShapePosition: (id: string, x: number, y: number) => void;
};

// 랜덤 색상 생성
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const useShapeStore = create<ShapeStore>(set => ({
  shapes: [],
  addShape: (type: 'circle' | 'rectangle') => {
    set(state => ({
      shapes: [
        ...state.shapes,
        {
          id: crypto.randomUUID(),
          type,
          x: Math.random() * 1400,
          y: Math.random() * 800,
          width: Math.random() * (500 - 50) + 50,
          height: Math.random() * (500 - 50) + 50,
          color: getRandomColor(),
          borderColor: getRandomColor(),
        },
      ],
    }));
  },
  updateShapePosition: (id: string, x: number, y: number) => {
    set(state => ({
      shapes: state.shapes.map(shape =>
        shape.id === id ? {...shape, x, y} : shape,
      ),
    }));
  },
}));
