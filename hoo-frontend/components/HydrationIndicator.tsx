import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import FillSvg from "../components/FillSvg";
import Colors from "../constants/Colors";
import User from "../models/User";
import { useDebounce } from "use-debounce";
import { useHydration } from "../api/User/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const sipSize = 50;

interface Props {
  user: User;
}

const HydrationIndicator = ({ user }: Props) => {
  const timer = useRef(null);
  const [currentValue, setCurrentValue] = useState(user?.currentMlLevel);
  const maxValue = user?.goalMlPerDay;
  const [debouncedCurrentValue] = useDebounce(currentValue, 3000);
  const { updateHydration } = useHydration(
    user?.username,
    (currentValue / maxValue) * 100
  );

  useEffect(() => {
    if (debouncedCurrentValue != user?.currentMlLevel) {
      updateHydration();
    }
  }, [debouncedCurrentValue]);

  useEffect(() => {
    setCurrentValue(user?.currentMlLevel);
  }, [user]);

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
      <>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "800",
            paddingBottom: 16,
          }}
        >{`Your body is missing ${(maxValue - currentValue).toFixed(
          0
        )}ml of water!`}</Text>
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
      </>
    </View>
  );
};

export function HydrationIndicatorPlaceholder() {
  return (
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
      <FillSvg currentValue={0} maxValue={1} width={200} height={200} />
    </View>
  );
}

export default HydrationIndicator;
