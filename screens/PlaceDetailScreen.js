import React from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import MapPreview from "../components/MapPreview";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const PlacesDetailScreen = props => {
  const placeId = props.navigation.getParam("placeId");
  const selectedPlace = useSelector(state =>
    state.places.places.find(place => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readOnly: true,
      initialLocation: selectedLocation
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageUrl }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressCont}>
          <Text style={styles.addressText}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          location={selectedLocation}
          style={styles.mapPrev}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

PlacesDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle")
  };
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc"
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10
  },
  addressCont: { padding: 20 },
  addressText: { color: Colors.primary, textAlign: "center" },
  mapPrev: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default PlacesDetailScreen;