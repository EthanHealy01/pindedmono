// ThemeContext.js
import React, { createContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightModeStyles, darkModeStyles } from './styles';

// Create a context
const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [styles, setStyles] = useState(lightModeStyles);

  // Load the theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('themePreference') || 'light';
        setTheme(storedTheme);
        setStyles(storedTheme === 'dark' ? darkModeStyles : lightModeStyles);
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // Function to change the theme
  const changeTheme = useCallback(async (newTheme) => {
    try {
      await AsyncStorage.setItem('themePreference', newTheme);
      setTheme(newTheme);
      setStyles(newTheme === 'dark' ? darkModeStyles : lightModeStyles);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }, []);

  // Provide the theme and changeTheme function to children components
  return (
    <ThemeContext.Provider value={{ theme, styles, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => React.useContext(ThemeContext);
