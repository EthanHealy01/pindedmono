import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../styles/ThemeContext';

const HomeScreen = () => {
    const { styles } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to PindedMono!</Text>
      <Text style={styles.text}>Your one-stop shop for all things mono.</Text>
    </View>
  );
};

export default HomeScreen;