import React from "react";
import { Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

interface IProps {
  text: string;
  url: string;
}

export const Link: React.FunctionComponent<IProps> = ({ url, text }) => {
  return (
    <TouchableOpacity
      onPress={async () => await WebBrowser.openBrowserAsync(url)}
    >
      <Text
        style={{
          fontSize: 16,
          textDecorationLine: "underline",
          color: "blue",
          paddingVertical: 4,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
