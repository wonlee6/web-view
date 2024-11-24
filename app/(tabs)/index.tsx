import { StyleSheet, Platform } from 'react-native'
import { WebView } from 'react-native-webview'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

export default function HomeScreen() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.error('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setLocation(location.coords)
    })()
  }, [])

  if (Platform.OS === 'web') {
    // 웹 브라우저에서는 직접 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = 'http://localhost:3000'
    }
    return null
  }

  const injectedJavaScript = location
    ? `
        window.currentLocation = {
          lat: ${location.latitude},
          lng: ${location.longitude}
        };
        true;
      `
    : ''

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <WebView
          source={{ uri: 'http://localhost:3000' }}
          style={styles.container}
          injectedJavaScript={injectedJavaScript}
        />
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
