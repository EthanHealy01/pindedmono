import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapScreen from '../screens/map/MapScreen';
import EventsScreen from '../screens/events/EventsScreen';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import { ActivityIndicator, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state to avoid flickering

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Retrieve the authentication token from AsyncStorage
        const token = await AsyncStorage.getItem('authToken');
        // Set isAuthenticated based on whether a token is found
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Failed to check authentication:', error);
        setIsAuthenticated(false);
      } finally {
        // Set loading to false once authentication check is complete
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show a loading screen while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If the user is not authenticated, show the Login and Signup tabs
  if (!isAuthenticated) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Signup" component={Signup} />
      </Tab.Navigator>
    );
  }

  // If the user is authenticated, show the main app tabs (Map and Events)
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      {/* Add other screens here if needed */}
    </Tab.Navigator>
  );
}
