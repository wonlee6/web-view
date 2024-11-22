import { create } from 'zustand';

interface WebViewStore {
  currentUrl: string;
  history: string[];
  setCurrentUrl: (url: string) => void;
  addToHistory: (url: string) => void;
  clearHistory: () => void;
}

const useStore = create<WebViewStore>((set) => ({
  // 웹뷰 관련 상태
  currentUrl: 'https://www.google.com',
  history: [],
  
  // 액션
  setCurrentUrl: (url: string) => set({ currentUrl: url }),
  addToHistory: (url: string) => set((state) => ({ 
    history: [...state.history, url] 
  })),
  clearHistory: () => set({ history: [] }),
}));

export default useStore;
