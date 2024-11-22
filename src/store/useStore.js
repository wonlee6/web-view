import { create } from 'zustand';

const useStore = create((set) => ({
  // 웹뷰 관련 상태
  currentUrl: 'https://www.google.com',
  history: [],
  
  // 액션
  setCurrentUrl: (url) => set({ currentUrl: url }),
  addToHistory: (url) => set((state) => ({ 
    history: [...state.history, url] 
  })),
  clearHistory: () => set({ history: [] }),
}));

export default useStore;
