import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import FillSvg from "../components/FillSvg";
import Colors from "../constants/Colors";

const sipSize = 50;

const HydrationIndicator = () => {
  const timer = useRef(null);
  const [currentValue, setCurrentValue] = useState(1000);
  const maxValue = 2000;

  const addOne = () => {
    setCurrentValue((prevValue) => {
      return prevValue + sipSize > maxValue ? maxValue : prevValue + sipSize;
    });
    if (timer.current) clearTimeout(timer.current!);
    timer.current = setTimeout(addOne, 200);
  };

  const stopTimer = () => {
    clearTimeout(timer.current);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{`Your body is missing ${
        maxValue - currentValue
      }ml of water`}</Text>
      <TouchableWithoutFeedback onPressIn={addOne} onPressOut={stopTimer}>
        <View
          style={{
            width: 300,
            height: 300,
            borderRadius: 999,
            backgroundColor: Colors.lightestPrimary,
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

export default HydrationIndicator;
