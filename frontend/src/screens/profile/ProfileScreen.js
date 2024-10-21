import React, { useEffect, useState } from 'react';
import { View, Text, Image, Switch, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../../api/users';
import { useTheme } from '../../styles/ThemeContext';
import image from '../../navigation/samplePFP.png';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { styles, theme, changeTheme } = useTheme(); 
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cachedUserInfo = await AsyncStorage.getItem('userInfo');
        if (cachedUserInfo) {
          const parsedUserInfo = JSON.parse(cachedUserInfo);
          setUserInfo(parsedUserInfo);
          
          if (parsedUserInfo._id) {
            const freshUserInfo = await getUser(parsedUserInfo._id);
            setUserInfo(freshUserInfo);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    changeTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <ScrollView style={[styles.containerWithCards, {paddingVertical:10}]}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : userInfo ? (
        <>
          {/* Profile Header Section */}
          <View style={[styles.card, localStyles.profileHeader]}>
            <Image
              source={image}
              style={localStyles.profileImage}
            />
            <Text style={[styles.text, localStyles.profileName]}>
              {userInfo.firstName} {userInfo.lastName}
            </Text>
            <Text style={[styles.text, localStyles.profileEmail]}>
              {userInfo.email}
            </Text>
          </View>

          <Text style={[styles.text, localStyles.sectionHeader]}>General</Text>
          <View style={[styles.card, localStyles.optionscontainerWithCards]}>
            <TouchableOpacity style={localStyles.optionItem}>
              <Text style={[styles.text, localStyles.optionText]}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.optionItem}>
              <Text style={[styles.text, localStyles.optionText]}>Pickup Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.optionItem}>
              <Text style={[styles.text, localStyles.optionText]}>My Payments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.optionItem}>
              <Text style={[styles.text, localStyles.optionText]}>Change Password</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, localStyles.sectionHeader]}>Support</Text>
          <View style={[styles.card, localStyles.optionscontainerWithCards]}>
            <TouchableOpacity style={localStyles.optionItem}>
              <Text style={[styles.text, localStyles.optionText]}>Need help? Let's chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.optionItem}>
              <Text style={[styles.text, localStyles.optionText]}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>

          {/* Dark Mode Toggle */}
          <View style={[styles.card, localStyles.optionscontainerWithCards]}>
            <View style={localStyles.optionItem}>
              <Text style={[styles.text, localStyles.optionText]}>Dark mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={handleToggleDarkMode}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.card, localStyles.logoutButton, { marginBottom:20}]}
            onPress={() => {
              AsyncStorage.clear();
              navigation.navigate('Login');
            }}
          >
            <Text style={[styles.text, { color: theme === 'dark' ? '#FF6347' : '#D32F2F' }]}>Log Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={[styles.text, localStyles.optionText]}>No user information available.</Text>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const localStyles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  optionsContainer: {
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
