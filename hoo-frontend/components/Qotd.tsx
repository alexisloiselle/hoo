import React from "react";
import { Text } from "react-native";

import { useQotd } from "../api/Qotd/QotdService";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Qotd: React.FunctionComponent = () => {
  const insets = useSafeAreaInsets();

  const { qotd } = useQotd();

  return !!qotd ? (
    <Text
      style={{
        marginTop: 16 + insets.top,
        color: "white",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "500",
        paddingHorizontal: 16,
        fontStyle: "italic",
      }}
    >
      {qotd}
    </Text>
  ) : null;
};
