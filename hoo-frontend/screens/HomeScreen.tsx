import React from "react";
import { View } from "react-native";
import HydrationIndicator from "../components/HydrationIndicator";
import Colors from "../constants/Colors";

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
      }}
    >
      <HydrationIndicator />
    </View>
  );
};

export default HomeScreen;
