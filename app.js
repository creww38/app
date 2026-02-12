import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './hooks/useAuth';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import LoadingScreen from './components/LoadingScreen';
import { colors } from './styles/colors';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Simulasi loading awal
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Untuk testing, langsung set authenticated = true
      // Dalam implementasi nyata, cek token di AsyncStorage
      setIsAuthenticated(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" backgroundColor={colors.primary} />
          {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}