// screens/settings/SettingsScreen.js
import React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = ({ setIsAuthenticated }) => {
  const navigation = useNavigation();

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      Alert.alert('Logged Out', 'You have successfully logged out.');
    } catch (error) {
      console.error('Failed to logout:', error);
      Alert.alert('Logout Failed', 'Something went wrong during logout.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <Button onPress={logoutUser} title="Logout" />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
};

export default SettingsScreen;
