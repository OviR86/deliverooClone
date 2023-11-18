import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDishById } from "@/assets/data/restaurant";
import Colors from "@/constants/Colors";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import useBasketStore from "@/store/basketStore";

const Dish = () => {
  const { id } = useLocalSearchParams();
  const item = getDishById(+id)!;
  const router = useRouter();
  const { adProduct } = useBasketStore();

  const addTocart = () => {
    adProduct(item);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Animated.Image
          entering={FadeIn.duration(700).delay(200)}
          source={item?.img}
          style={styles.image}
        />
        <View style={{ padding: 20 }}>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(200)}
            style={styles.dishName}
          >
            {item?.name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(400)}
            style={styles.dishDescription}
          >
            {item?.info}
          </Animated.Text>
        </View>
        <View style={styles.footer}>
          <View>
            <TouchableOpacity style={styles.fullButton} onPress={addTocart}>
              <Text style={styles.footerText}>Add for ${item?.price} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  dishName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dishDescription: {
    fontSize: 16,
    color: Colors.mwdium,
  },
  footer: {
    height: 100,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 10,
    left: 0,
    width: "100%",
    padding: 10,
    marginBottom: -10,
    elevation: 20,
    shadowColor: "back",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Dish;
