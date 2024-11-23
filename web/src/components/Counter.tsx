'use client';

import { useStore } from '@/store/useStore';

export default function Counter() {
  const store = useStore();
  const { count, increment, decrement } = store();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={decrement}
        className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
      >
        -
      </button>
      <span className="text-xl font-bold">{count}</span>
      <button
        onClick={increment}
        className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
      >
        +
      </button>
    </div>
  );
}
