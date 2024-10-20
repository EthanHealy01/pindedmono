import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, Dimensions, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../api/users';
import { useNavigation } from '@react-navigation/native';
import HeaderImageLight from '../../svg-assets/login-header-in-light.svg';
import HeaderImageDark from '../../svg-assets/login-header-in-dark.svg';

import { useTheme } from '../../styles/ThemeContext';

const Login = ({ setIsAuthenticated }) => {
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { styles, theme } = useTheme();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      console.log('Login successful:', response);
    
      await AsyncStorage.setItem('authToken', response.token);
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Error', 'Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={[styles.container, localStyle.container]}>
      <Text style={[localStyle.title, {color: theme === "dark" ? "#FFFFFF" : "#2C664C" }]}>Welcome Back!</Text>
      {theme === 'light' ? (
        <HeaderImageLight style={styles.headerImage} />
      ) : (
        <HeaderImageDark style={styles.headerImage} />
      )}

<View style={localStyle.card}>

<Text style={[localStyle.title, {color:'white'}]}>Login!</Text>
      <TextInput
        style={localStyle.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={'black'}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={localStyle.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={'black'}
        secureTextEntry
      />
      <TouchableOpacity style={localStyle.button} onPress={handleLogin} >
        <Text style={localStyle.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30}}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={{fontSize:14, color:'#FFFFFF'}}>
        Don't have an account?
        </Text>
        <Text style={{color:"#9FFFA6", marginLeft:5, fontSize:14}}>
        Sign Up
        </Text>

      </TouchableOpacity>
</View>

    </SafeAreaView>
  );
};

export default Login;

const localStyle = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#2C664C',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    minHeight:Dimensions.get('window').height/2.5,
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
  },
  button: {
    backgroundColor: '#9FFFA6',
    color: '#FFFFFF',
    padding: 10,
    paddingHorizontal: 20,
    marginLeft: 'auto',
    borderRadius: 10,
    marginTop:12
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight:'500'
  },
});