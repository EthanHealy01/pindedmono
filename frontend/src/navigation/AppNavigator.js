import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider } from "react-native-paper";
import MapScreen from "../screens/map/MapScreen";
import HomeScreen from "../screens/home/HomeScreen";
import EventsScreen from "../screens/events/EventsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useTheme } from '../styles/ThemeContext';
import { Feather } from '@expo/vector-icons';
import image from './samplePFP.png';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MainTabs() {
  const { styles } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: styles.container.backgroundColor,
        },
        tabBarActiveTintColor: styles.activeTintColor,
        tabBarInactiveTintColor: styles.inactiveTintColor,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Map') {
            iconName = 'map-pin';
          } else if (route.name === 'Events') {
            iconName = 'calendar';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { styles } = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const userInfo = await AsyncStorage.getItem("userInfo");

        if (token && userInfo) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          await AsyncStorage.removeItem("authToken");
          await AsyncStorage.removeItem("userInfo");
        }
      } catch (error) {
        console.error("Failed to check authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={styles.text.color} />
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        {isAuthenticated ? (
          <Drawer.Navigator
            screenOptions={({ navigation }) => ({
              drawerStyle: {
                backgroundColor: styles.container.backgroundColor,
              },
              drawerActiveTintColor: styles.activeTintColor,
              drawerInactiveTintColor: styles.inactiveTintColor,
              headerStyle: {
                backgroundColor: styles.container.backgroundColor,
              },
              headerTintColor: styles.text.color,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={{ marginRight: 15 }}
                >
                  <Image
                    source={image} 
                    style={{ width: 30, height: 30, borderRadius: 40 }}
                  />
                </TouchableOpacity>
              ),
            })}
          >
            <Drawer.Screen
              name="Home"
              component={MainTabs}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Feather name="home" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Feather name="user" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Settings"
              options={{
                headerShown: true,
                drawerIcon: ({ color, size }) => (
                  <Feather name="settings" size={size} color={color} />
                ),
              }}
            >
              {() => (
                <SettingsScreen
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Drawer.Screen>
          </Drawer.Navigator>
        ) : (
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            <Tab.Screen name="Login">
              {() => <Login setIsAuthenticated={setIsAuthenticated} />}
            </Tab.Screen>
            <Tab.Screen name="Signup" component={Signup} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
