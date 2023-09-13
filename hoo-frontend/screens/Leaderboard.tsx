import React from "react";
import { View, Text } from "react-native";
import {useLeaderBoard} from "../api/User/UserService";

const LeaderboardScreen = () => {

  const{user} = useLeaderBoard("alexis")
  console.log(user)

  
  return (
    <View>
      <Text>Leaderboard</Text>
    </View>
  );
};

export default LeaderboardScreen;
