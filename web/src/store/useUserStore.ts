import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 위치 권한 상태를 위한 타입
type LocationPermissionStatus = 'granted' | 'denied' | 'prompt' | 'unavailable';

interface UserState {
  // 사용자 기본 정보
  userId: string | null;
  userName: string | null;

  // 위치 관련 정보
  currentLocation: { lat: number; lng: number } | null;
  locationPermission: LocationPermissionStatus;
  locationError: string | null;

  // Actions
  setUserId: (id: string | null) => void;
  setUserName: (name: string | null) => void;
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
  setLocationPermission: (status: LocationPermissionStatus) => void;
  setLocationError: (error: string | null) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      // Initial state
      userId: null,
      userName: null,
      currentLocation: null,
      locationPermission: 'prompt',
      locationError: null,

      // Actions
      setUserId: id => {
        set({ userId: id });
      },
      setUserName: name => {
        set({ userName: name });
      },
      setCurrentLocation: location => {
        set({ currentLocation: location });
      },
      setLocationPermission: status => {
        set({ locationPermission: status });
      },
      setLocationError: error => {
        set({ locationError: error });
      },
      clearUserInfo: () => {
        set({
          userId: null,
          userName: null,
          currentLocation: null,
          locationError: null,
          // 권한 상태는 초기화하지 않음
        });
      },
    }),
    {
      name: 'user-storage',
    },
  ),
);
