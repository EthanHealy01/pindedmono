import { Text, View } from "react-native";


const HomeScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to PindedMono!</Text>
        <Text style={styles.subtitle}>Your one-stop shop for all things mono.</Text>
        </View>
    );
}
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
    },
};

export default HomeScreen;