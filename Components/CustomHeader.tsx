import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Link } from "expo-router";
import BottomSheet from "./BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchSection}>
      <View style={styles.searchField}>
        <Ionicons
          style={styles.searchIcon}
          name="search-outline"
          size={20}
          color={Colors.mwdium}
        />
        <TextInput
          style={styles.input}
          placeholder="Restaurants, groceries, dishes"
        />
      </View>
      <Link href={"/(modal)/filter"} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

const CustomHeader = () => {
  const bottomSheetref = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetref.current?.present();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="inverted" />
      <BottomSheet ref={bottomSheetref} />
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image
            style={styles.bike}
            source={require("../assets/images/bike.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.title}>Delivery · now</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>San Francisco, CA</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  bike: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    paddingRight: 70,
  },
  title: {
    fontSize: 14,
    color: Colors.mwdium,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  profileButton: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 20,
  },
  locationName: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    height: 60,
    backgroundColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  searchField: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingLeft: 10,
    alignItems: "center",
  },
  searchIcon: {
    paddingRight: 5,
  },

  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
  input: {
    color: Colors.mediumDark,
  },
});

export default CustomHeader;
