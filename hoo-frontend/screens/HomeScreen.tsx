import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import FillSvg from "../components/FillSvg";

const HomeScreen = () => {
  const [currentValue, setCurrentValue] = useState(1000);
  const maxValue = 2000;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2a3f5b",
      }}
    >
      <Text>{`Your body is missing ${
        maxValue - currentValue
      }ml of water`}</Text>
      <TouchableWithoutFeedback
        onLongPress={() => setCurrentValue(currentValue + 50)}
      >
        <View
          style={{
            width: 300,
            height: 300,
            borderRadius: 999,
            backgroundColor: "#2c6cd4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FillSvg
            currentValue={currentValue}
            maxValue={maxValue}
            width={200}
            height={200}
          />
        </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity onPress={() => setCurrentValue(0)}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
