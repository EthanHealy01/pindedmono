import React, { useState } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../styles/ThemeContext';

const SettingsScreen = ({ setIsAuthenticated }) => {
  const { theme, changeTheme, styles } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    changeTheme(newTheme);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear()
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[localStyle.title, styles.text]}>Theme Settings</Text>
      <RadioButton.Group onValueChange={handleThemeChange} value={selectedTheme}>
        {/* Custom Radio Button for 'System Default' */}
        <TouchableOpacity
          onPress={() => handleThemeChange('system')}
          style={localStyle.radioButtonContainer}
        >
          <RadioButton value="system" />
          <Text style={styles.text}>System Default</Text>
        </TouchableOpacity>

        {/* Custom Radio Button for 'Light Mode' */}
        <TouchableOpacity
          onPress={() => handleThemeChange('light')}
          style={localStyle.radioButtonContainer}
        >
          <RadioButton value="light" />
          <Text style={styles.text}>Light Mode</Text>
        </TouchableOpacity>

        {/* Custom Radio Button for 'Dark Mode' */}
        <TouchableOpacity
          onPress={() => handleThemeChange('dark')}
          style={localStyle.radioButtonContainer}
        >
          <RadioButton value="dark" />
          <Text style={styles.text}>Dark Mode</Text>
        </TouchableOpacity>
      </RadioButton.Group>

      <Button
        title="Logout"
        onPress={handleLogout}
      />
    </View>
  );
};

export default SettingsScreen;

const localStyle = {
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
};