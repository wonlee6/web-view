import React, { useRef, useState } from 'react';
import { 
  SafeAreaView, 
  StatusBar, 
  ActivityIndicator, 
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/lib/queryClient';
import useStore from './src/store/useStore';

export default function App() {
  const webViewRef = useRef<WebView | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);

  // Zustand store에서 상태와 액션 가져오기
  const { currentUrl, setCurrentUrl, addToHistory } = useStore();

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    if (navState.url !== currentUrl) {
      setCurrentUrl(navState.url);
      addToHistory(navState.url);
    }
  };

  const handleError = () => {
    Alert.alert(
      "Error",
      "Failed to load the webpage. Please check your internet connection and try again.",
      [{ text: "OK" }]
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        <WebView 
          ref={webViewRef}
          source={{ uri: currentUrl }}
          className="flex-1"
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={handleError}
          onNavigationStateChange={onNavigationStateChange}
        />
        {isLoading && (
          <View className="absolute inset-0 justify-center items-center bg-white/80">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View className="flex-row justify-around items-center p-3 bg-gray-100 border-t border-gray-200">
          <TouchableOpacity 
            className={`p-3 rounded-md w-[50px] items-center ${!canGoBack ? 'bg-gray-400' : 'bg-blue-500'}`}
            onPress={() => webViewRef.current?.goBack()} 
            disabled={!canGoBack}
          >
            <Text className="text-white text-lg font-bold">←</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`p-3 rounded-md w-[50px] items-center ${!canGoForward ? 'bg-gray-400' : 'bg-blue-500'}`}
            onPress={() => webViewRef.current?.goForward()} 
            disabled={!canGoForward}
          >
            <Text className="text-white text-lg font-bold">→</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
