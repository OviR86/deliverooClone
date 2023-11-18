import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
  ListRenderItem,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import ParallaxScrollView from "@/Components/ParallaxScrollView";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useBasketStore from "@/store/basketStore";

const Details = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 500) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  const DATA = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const { items, total } = useBasketStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundButton}
        >
          <Ionicons name="ios-arrow-back" color={Colors.primary} size={24} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" color={Colors.primary} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="search-outline" color={Colors.primary} size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
  };

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link href={{ pathname: "/(modal)/dish", params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>{item.price}</Text>
        </View>
        <Image source={item.img} style={styles.dishImage} />
      </TouchableOpacity>
    </Link>
  );
  return (
    <>
      <ParallaxScrollView
        scrollEvent={onScroll}
        style={{ fles: 1 }}
        backgroundColor={"#fff"}
        parallaxHeaderHeight={300}
        renderBackground={() => (
          <Image
            source={restaurant.img}
            style={{ width: "110%", height: 300 }}
          />
        )}
        contentBackgroundColor={Colors.lightGray}
        stickyHeaderHeight={110}
        renderStickyHeader={() => (
          <View key="stycky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{restaurant.name}</Text>
          </View>
        )}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery} ·{" "}
            {restaurant.tags.map(
              (tag, index) =>
                `${tag}${index < restaurant.tags.length - 1 ? "·" : ""}`
            )}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>
          <SectionList
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => `${item.id + index}`}
            scrollEnabled={false}
            sections={DATA}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.gray }}></View>
            )}
            SectionSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.gray }}></View>
            )}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title, index } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
        </View>
      </ParallaxScrollView>
      <Animated.View style={[animatedStyles, styles.stickySegments]}>
        <View style={styles.segmentsShadow}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.segmentScrollview}
          >
            {restaurant.food.map((item, index) => (
              <TouchableOpacity
                ref={(ref) => (itemsRef.current[index] = ref!)}
                key={index}
                style={
                  activeIndex === index
                    ? styles.segmentButtonActive
                    : styles.segmentButton
                }
                onPress={() => selectCategory(index)}
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.segmentTextActive
                      : styles.segmentText
                  }
                >
                  {" "}
                  {item.category}{" "}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Footer Basket */}

      {items > 0 && (
        <View style={styles.footer}>
          <Link href="/basket" asChild>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.basket}>{items}</Text>
              <Text style={styles.footerText}>View Basket</Text>
              <Text style={styles.basketTotal}> ${total}</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.lightGray,
  },
  stickySection: {
    marginLeft: 70,
    height: 100,
    justifyContent: "center",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  stickySectionText: {
    fontSize: 20,
    margin: 10,
  },
  restaurantName: {
    fontSize: 30,
    margin: 16,
  },
  restaurantDescription: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.mwdium,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    margin: 16,
  },
  item: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  dishText: {
    fontSize: 14,
    color: Colors.mwdium,
    paddingVertical: 4,
  },
  dish: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stickySegments: {
    position: "absolute",
    height: 70,
    left: 0,
    right: 0,
    top: 80,
    backgroundColor: "#fff",
    overflow: "hidden",
    paddingBottom: 10,
  },
  segmentsShadow: {
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    elevation: 5,
    width: "100%",
    height: "100%",
    shadowRadius: 5,
  },
  segment: {},
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentText: {
    color: Colors.primary,
    fontWeight: "300",
    fontSize: 16,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentTextActive: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  segmentScrollview: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 20,
    paddingBottom: 4,
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
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  basket: {
    color: "white",
    backgroundColor: "#19aa86",
    padding: 5,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  basketTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  footerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
});

export default Details;
