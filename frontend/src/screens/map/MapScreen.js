import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Text,
  Platform,
} from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { getProvidersByLocation } from "../../api/providers";
import { useTheme } from "../../styles/ThemeContext";
import { useColorScheme } from "react-native";

const MapScreen = () => {
  const { theme } = useTheme(); // 'light', 'dark', or 'system'
  const colorScheme = useColorScheme(); // 'light' or 'dark'

  const currentTheme = useMemo(
    () => (theme === "system" ? colorScheme : theme),
    [theme, colorScheme]
  );

  const [initialRegion] = useState({
    latitude: 54.225, // Belmullet area
    longitude: -9.982,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [searchRegion, setSearchRegion] = useState(initialRegion);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const mapRef = useRef(null);
  const regionRef = useRef(initialRegion);

  const lightTileUrl = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTileUrl =
    "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";

  const tileUrlTemplate = useMemo(
    () => (currentTheme === "dark" ? darkTileUrl : lightTileUrl),
    [currentTheme]
  );

  // Debugging logs (You can remove these if they are no longer needed)
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

  const handleRegionChange = useCallback((newRegion) => {
    regionRef.current = newRegion;
    setShowSearchButton(true);
  }, []);

  const handleSearchArea = () => {
    setSearchRegion(regionRef.current);
    setShowSearchButton(false);
    fetchProviders();
  };

  const renderProviderMarker = (provider) => (
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

  // Memoized UrlTile to prevent re-renders
  const memoizedUrlTile = useMemo(
    () => (
      <UrlTile
        urlTemplate={tileUrlTemplate}
        maximumZ={19}
        flipY={false}
        tileCachePath={
          Platform.OS === "android" ? "tile_cache" : "tile_cache"
        }
        tileCacheMaxAge={1000 * 60 * 60 * 24}
      />
    ),
    [tileUrlTemplate]
  );

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
        ref={mapRef}
        style={[
          styles.map,
          {
            backgroundColor:
              currentTheme === "dark" ? "#000000" : "#FFFFFF",
          },
        ]}
        initialRegion={initialRegion}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
        mapType="none"
      >
        {memoizedUrlTile}
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
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
