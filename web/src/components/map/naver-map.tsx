'use client'

import { useEffect, useRef, useState } from 'react'

interface MarkerData {
  position: { lat: number; lng: number }
  title?: string
  content?: string
}

interface NaverMapProps {
  width?: string
  height?: string
  initialZoom?: number
  markers?: MarkerData[]
  radiusInKm?: number
  currentLocation?: { lat: number; lng: number }
}

const NaverMap = ({
  width = '100%',
  height = '100%',
  initialZoom = 14,
  markers = [],
  radiusInKm = 2,
  currentLocation
}: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<naver.maps.Map | null>(null)
  const [activeInfoWindow, setActiveInfoWindow] = useState<naver.maps.InfoWindow | null>(null)
  const circleRef = useRef<naver.maps.Circle | null>(null)

  useEffect(() => {
    if (!currentLocation || !mapRef.current) return

    const initializeMap = () => {
      if (!mapRef.current) return

      const mapOptions: naver.maps.MapOptions = {
        center: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
        zoom: initialZoom,
        minZoom: 9,
        maxZoom: 18,
        zoomControl: true,
        zoomControlOptions: {
          //줌 컨트롤의 옵션
          position: naver.maps.Position.TOP_RIGHT
        }
      }

      const map = new naver.maps.Map(mapRef.current as HTMLElement, mapOptions)
      mapInstance.current = map

      // 현재 위치 마커 추가
      new naver.maps.Marker({
        position: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
        map: map,
        icon: {
          content: `
            <div style="width:20px;height:20px;background:#4285F4;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>
          `,
          anchor: new naver.maps.Point(10, 10)
        }
      })

      // 반경 원 그리기
      circleRef.current = new naver.maps.Circle({
        map: map,
        center: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
        radius: radiusInKm * 1000, // 미터 단위로 변환
        strokeColor: '#5347AA',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#5347AA',
        fillOpacity: 0.1
      })

      // 반경 내의 마커만 필터링하여 표시
      // markers.forEach(markerData => {
      //   const distance = calculateDistance(
      //     currentLocation.lat,
      //     currentLocation.lng,
      //     markerData.position.lat,
      //     markerData.position.lng,
      //   );

      //   if (distance <= radiusInKm) {
      //     const marker = new naver.maps.Marker({
      //       position: new naver.maps.LatLng(
      //         markerData.position.lat,
      //         markerData.position.lng,
      //       ),
      //       map: map,
      //       icon: {
      //         content: `
      //           <div style="cursor:pointer;width:24px;height:24px;line-height:24px;font-size:12px;color:white;text-align:center;font-weight:bold;background:#3397ee;border-radius:12px;">
      //             <img src="/marker-icon.png" style="width:20px;height:20px;margin:2px;" />
      //           </div>
      //         `,
      //         size: new naver.maps.Size(24, 24),
      //         anchor: new naver.maps.Point(12, 12),
      //       },
      //     });

      //     // 정보창 생성 (거리 정보 포함)
      //     const infoWindow = new naver.maps.InfoWindow({
      //       content: `
      //         <div style="padding:10px;min-width:200px;">
      //           <h3 style="margin-bottom:5px;">${markerData.title || ''}</h3>
      //           <p style="margin-bottom:5px;">${markerData.content || ''}</p>
      //           <p style="color:#666;font-size:12px;">현재 위치에서 ${distance.toFixed(1)}km</p>
      //         </div>
      //       `,
      //       borderWidth: 0,
      //       backgroundColor: 'white',
      //       borderColor: 'transparent',
      //       disableAnchor: true,
      //       pixelOffset: new naver.maps.Point(0, -10),
      //     });

      //     // 마커 클릭 이벤트
      //     naver.maps.Event.addListener(marker, 'click', () => {
      //       if (activeInfoWindow) {
      //         activeInfoWindow.close();
      //       }
      //       infoWindow.open(map, marker);
      //       setActiveInfoWindow(infoWindow);
      //     });
      //   }
      // });

      // 지도 클릭 시 정보창 닫기
      naver.maps.Event.addListener(map, 'click', () => {
        if (activeInfoWindow) {
          activeInfoWindow.close()
          setActiveInfoWindow(null)
        }
      })
    }

    // 스크립트가 이미 로드되어 있는지 확인
    if (window.naver && window.naver.maps) {
      initializeMap()
    } else {
      const script = document.createElement('script')
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`
      script.async = true
      script.onload = initializeMap
      document.head.appendChild(script)
    }

    return () => {
      if (activeInfoWindow) {
        activeInfoWindow.close()
      }
      if (circleRef.current) {
        circleRef.current.setMap(null)
      }
      mapInstance.current = null
    }
  }, [currentLocation, initialZoom, markers, radiusInKm])

  return <div ref={mapRef} style={{ width, height }} />
}

export default NaverMap

// 두 지점 간의 거리 계산 (km)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371 // 지구의 반지름 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
