import { StyleSheet, Platform } from 'react-native'
import { WebView } from 'react-native-webview'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  if (Platform.OS === 'web') {
    // 웹 브라우저에서는 직접 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = 'http://localhost:3001'
    }
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <WebView source={{ uri: 'http://localhost:3000' }} style={styles.webview} />
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1
  }
})
