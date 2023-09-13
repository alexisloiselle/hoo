import { RouteProp } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import User from "../models/User";
import { useBio } from "../api/User/UserService";

interface IProps {
  route?: RouteProp<{ params: { user: User } }>;
}

export const LeaderboardEntry: React.FunctionComponent<IProps> = ({
  route: {
    params: { user },
  },
}) => {
  const { bio, isLoading } = useBio(user.username);

  return (
    <ScrollView alwaysBounceVertical={false}>
      <Text style={{ fontSize: 48, padding: 8, fontWeight: "bold" }}>
        {user.username}
      </Text>
      <Text style={{ fontSize: 24, padding: 8 }}>Score: {user.score}</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ padding: 8 }}>{bio}</Text>
      )}
    </ScrollView>
  );
};
