import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text, View } from 'react-native';

const ProfileScreen = () => {
    const Navigation = useNavigation();
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Profile Screen</Text>
        <Button
            title="Go to Settings"
            onPress={() => Navigation.navigate('Settings')}
        />
        </View>
    );
    }
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

export default ProfileScreen;