// AppNavigator.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/styles/ThemeContext';
import Navigation from "./src/navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  return (
    <ThemeProvider>
        <Navigation />
    </ThemeProvider>
  );
}
