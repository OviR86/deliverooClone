import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useBasketStore from "@/store/basketStore";
import Colors from "@/constants/Colors";
import ConfettiCannon from "react-native-confetti-cannon";
import { Link } from "expo-router";
import GmailStyleSwipeableRow from "@/Components/SwipableRow";

const Basket = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);

  const startCheckout = () => {
    setOrder(true);
    clearCart();
  };

  const fees = {
    service: 2.99,
    delivery: 5.99,
  };
  return (
    <>
      {order && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={2000}
          fadeOut={true}
          autoStart={true}
        />
      )}
      {order && (
        <View style={{ marginTop: "50%", padding: 20, alignItems: "center" }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Thank You for your order!
          </Text>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.orderBtn}>
              <Text style={styles.footerText}>New order</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {!order && (
        <>
          <View style={{ paddingBottom: 100 }}>
            <FlatList
              data={products}
              ListHeaderComponent={<Text style={styles.section}>Items</Text>}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: Colors.gray }} />
              )}
              renderItem={({ item }) => (
                <GmailStyleSwipeableRow onDelete={() => reduceProduct(item)}>
                  <View style={styles.row}>
                    <Text style={{ color: Colors.primary, fontSize: 18 }}>
                      {item.quantity} x
                    </Text>
                    <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                    <Text style={{ fontSize: 18 }}>$ {item.price}</Text>
                  </View>
                </GmailStyleSwipeableRow>
              )}
              ListFooterComponent={
                <View>
                  <View style={{ height: 1, backgroundColor: Colors.gray }} />
                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Subtotal: </Text>
                    <Text style={{ fontSize: 18 }}>${total.toFixed(2)} </Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Service fee: </Text>
                    <Text style={{ fontSize: 18 }}>${fees.service} </Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Delivery: </Text>
                    <Text style={{ fontSize: 18 }}>${fees.delivery} </Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.total}>Order Total: </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      ${(total + fees.delivery + fees.service).toFixed(2)}{" "}
                    </Text>
                  </View>
                </View>
              }
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.fullButton} onPress={startCheckout}>
              <Text style={styles.footerText}>Order now</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
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
  footerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  orderBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    width: 250,
    height: 50,
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Basket;
