import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "../components/Link";

interface IProps {}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 48, fontWeight: "bold", paddingVertical: 16 },
});

export const MoreScreen: React.FunctionComponent<IProps> = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Text style={styles.title}>FAQ</Text>
      <Link
        url="https://www.canada.ca/en/department-national-defence/corporate/news/regional-news/western-sentinel/2021/08/facts-on-fluids-how-to-stay-hydrated.html"
        text="What are the health benefits of water?"
      />
      <Link
        url="https://en.wikipedia.org/wiki/Water"
        text="More about water?"
      />
      <Link
        url="https://www.wikihow.com/Chug-Water"
        text="How to drink water?"
      />
      <Text style={styles.title}>About us</Text>
      <Link
        url="https://lauberiviere.org/a-propos/"
        text="Lauberivière: where our profits go"
      />
      <Link
        url="https://lauberiviere.org/dons/"
        text="You want to donate too?"
      />
    </View>
  );
};
