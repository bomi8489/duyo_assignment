import {create} from 'zustand';

interface RibbonState {
  isMenuHidden: boolean;
  toggleMenu: () => void;
}

export const useRibbonStore = create<RibbonState>(set => ({
  isMenuHidden: false,
  toggleMenu: () => set(state => ({isMenuHidden: !state.isMenuHidden})),
}));
