import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Button, Text } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { getProvidersByLocation } from "../../api/providers";

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 54.2250, // Belmullet area
    longitude: -9.9820,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [searchRegion, setSearchRegion] = useState(region); // Region used for fetching data
  const [providers, setProviders] = useState([]); // State for providers
  const [loading, setLoading] = useState(true); // Loading state
  const [showSearchButton, setShowSearchButton] = useState(false); // Show "Search this area" button
  const mapRef = useRef(null);

  // Fetch providers based on the current search region
  const fetchProviders = async () => {
    try {
      setLoading(true);
      const data = await getProvidersByLocation(searchRegion.latitude, searchRegion.longitude, 10);
      setProviders(data); // Set providers data
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders(); // Fetch providers when the component loads
  }, []);

  // Update the region state without triggering a fetch
  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
    setShowSearchButton(true); // Show "Search this area" button when region changes
  };

  // Trigger a search for the current region
  const handleSearchArea = () => {
    setSearchRegion(region); // Update the search region to the current region
    setShowSearchButton(false); // Hide the search button
    fetchProviders(); // Fetch providers for the new region
  };

  // Render a Marker for each provider
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
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
        mapType="none"
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
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
    ...StyleSheet.absoluteFillObject,
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
