import { create } from 'zustand';
import { StateCreator } from 'zustand';

interface CartState {
  count: number;
  setCount: (count: number) => void;
  increment: () => void;
  decrement: () => void;
}

const createCartStore: StateCreator<CartState> = (set) => ({
  count: 0,
  setCount: (count: number) => set({ count }),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
});

export const useCartStore = create<CartState>(createCartStore); 