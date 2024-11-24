'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/store/useUserStore';

import NaverMap from './naver-map';

declare global {
  interface Window {
    currentLocation?: { lat: number; lng: number };
  }
}

export default function MapContainer() {
  const { currentLocation, setCurrentLocation } = useUserStore();

  useEffect(() => {
    // React Native에서 전달한 위치 정보 확인
    if (window.currentLocation) {
      setCurrentLocation(window.currentLocation);
    } else {
      // 위치 정보가 없는 경우 기본값 설정 (판교역)
      setCurrentLocation({ lat: 37.39471715365722, lng: 127.11120338693074 });
    }
  }, [setCurrentLocation]);

  if (!currentLocation) return null;

  return (
    <NaverMap
      currentLocation={currentLocation}
      markers={[
        {
          position: { lat: 37.39471715365722, lng: 127.11120338693074 },
          title: '판교역',
          content: '판교역입니다.',
        },
        // 추가 마커...
      ]}
    />
  );
}
