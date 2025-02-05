import {create} from 'zustand';

interface SlideStore {
  saveAsPNG: () => void;
  saveAsSVG: () => void;
  setSaveFunctions: (pngFunc: () => void, svgFunc: () => void) => void;
}

export const useSlideStore = create<SlideStore>(set => ({
  saveAsPNG: () => {},
  saveAsSVG: () => {},
  setSaveFunctions: (pngFunc, svgFunc) =>
    set({saveAsPNG: pngFunc, saveAsSVG: svgFunc}),
}));
