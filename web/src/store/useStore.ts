import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface StoreState {
  count: number
  increment: () => void
  decrement: () => void
}

export const createStore = (initState = { count: 0 }) => {
  return create<StoreState>()(
    persist(
      (set) => ({
        count: initState.count,
        increment: () => {
          set((state) => ({ count: state.count + 1 }))
        },
        decrement: () => {
          set((state) => ({ count: state.count - 1 }))
        }
      }),
      {
        name: 'app-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
}

// 클라이언트 컴포넌트에서 사용하기 위한 훅
let store: ReturnType<typeof createStore>

export function useStore(initState?: { count: number }) {
  if (!store) {
    store = createStore(initState)
  }
  return store
}
