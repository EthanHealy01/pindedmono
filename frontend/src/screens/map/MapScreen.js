import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Text,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_APPLE } from "react-native-maps";
import { getProvidersByLocation } from "../../api/providers";
import { useTheme } from "../../styles/ThemeContext";
import { useColorScheme } from "react-native";
import darkMapStyle from "../../styles/map/darkMapStyle.json";

const MapScreen = () => {
  const { theme } = useTheme(); 
  const colorScheme = useColorScheme();
  const currentTheme = theme === "system" ? colorScheme : theme;

  const [region, setRegion] = useState({
    latitude: 54.225, // Belmullet area
    longitude: -9.982,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [searchRegion, setSearchRegion] = useState(region);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const mapRef = useRef(null);

  const lightTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTileUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";
  
  const tileUrlTemplate = currentTheme === "dark" ? darkTileUrl : lightTileUrl;
  
  // Debugging logs
  console.log("Theme from context:", theme);
  console.log("System color scheme:", colorScheme);
  console.log("Current theme used:", currentTheme);
  console.log("Tile URL Template:", tileUrlTemplate);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const data = await getProvidersByLocation(
        searchRegion.latitude,
        searchRegion.longitude,
        10
      );
      setProviders(data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
    setShowSearchButton(true);
  };

  const handleSearchArea = () => {
    setSearchRegion(region);
    setShowSearchButton(false);
    fetchProviders();
  };

  const renderProviderMarker = (provider) => {
    return (
      <Marker
        key={provider._id}
        coordinate={{
          latitude: parseFloat(provider.location.coordinates[1]),
          longitude: parseFloat(provider.location.coordinates[0]),
        }}
        title={provider.name}
        description={provider.description}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={Platform.OS === "ios" ? PROVIDER_APPLE : PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
        customMapStyle={currentTheme === "dark" ? darkMapStyle : []}
      >
        {providers.map((provider) => renderProviderMarker(provider))}
      </MapView>

      {showSearchButton && (
        <View style={styles.searchButtonContainer}>
          <Button title="Search this area" onPress={handleSearchArea} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonContainer: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 5,
    borderRadius: 5,
  },
});

export default MapScreen;
