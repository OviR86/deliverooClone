import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import Categories from "@/Components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Restaurants from "@/Components/Restaurants";
import Colors from "@/constants/Colors";

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Categories />
        <Text style={styles.header}>Top picks in your area</Text>
        <Restaurants />
        <Text style={styles.header}>Offers near you</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 80,
    backgroundColor: Colors.lightGray,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});

export default Page;
