// ThemeContext.js
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightModeStyles, darkModeStyles } from './styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [styles, setStyles] = useState(lightModeStyles);

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

  const changeTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem('themePreference', newTheme);
      setTheme(newTheme);
      setStyles(newTheme === 'dark' ? darkModeStyles : lightModeStyles);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, styles, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
