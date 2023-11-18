import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CustomHeader from "../Components/CustomHeader";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Stack.Screen
          name="(modal)/location-search"
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
            gestureEnabled: true,
            headerTitle: "Select Location",

            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/filter"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            gestureEnabled: true,
            headerTitle: "Filter",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGray,
            },
          }}
        />
        <Stack.Screen
          name="(modal)/dish"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            gestureEnabled: true,
            headerTitle: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 6,
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="basket"
          options={{
            headerTitle: "Basket",

            headerLeft: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 6,
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="arrow-back-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
