import React, { useContext } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useLeaderBoard } from "../api/User/UserService";
import { AuthenticationContext } from "../providers/AuthenticationProvider";
import User from "../models/User";
import Colors from "../constants/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface LeaderboardRowProps {
  user: User;
}

const LeaderboardRow = ({ user }: LeaderboardRowProps) => {
  const { navigate } =
    useNavigation<NavigationProp<{ LeaderboardEntry: { user: User } }>>();

  if (!user) return null;

  return (
    <Pressable
      onPress={() => navigate("LeaderboardEntry", { user })}
      style={{
        padding: 8,
        paddingLeft: 32,
        marginTop: 8,
        marginBottom: 8,
        width: "100%",
        height: 50,
        backgroundColor: Colors.lac,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
      key={user.id}
    >
      <Text style={{ color: Colors.ocean, fontWeight: "500" }}>
        {`#${user.position ?? ""}`}
      </Text>
      <Text
        style={{
          color: Colors.ocean,
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        {user.username}
      </Text>
      <Text style={{ marginRight: 8 }}>{user.score}</Text>
    </Pressable>
  );
};

const LeaderboardScreen = () => {
  const { navigate } =
    useNavigation<NavigationProp<{ LeaderboardEntry: { user: User } }>>();

  const { username } = useContext(AuthenticationContext);
  const { leaderboard } = useLeaderBoard(username);

  if (!leaderboard) return null;

  const isCurrentUserLeader = leaderboard.me.position <= 5;

  return (
    <View
      style={{
        padding: 8,
        paddingTop: 16,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: Colors.ocean,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "800",
          paddingBottom: 16,
        }}
      >
        Top drinkers
      </Text>
      {leaderboard && (
        <FlatList
          style={{ width: "100%" }}
          data={leaderboard.best}
          renderItem={(user) => <LeaderboardRow user={user.item} />}
        />
      )}

      <Pressable
        onPress={() => navigate("LeaderboardEntry", { user: leaderboard.me })}
        style={{ alignItems: "center" }}
      >
        {!isCurrentUserLeader ? (
          <>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "800",
                paddingBottom: 16,
              }}
            >
              Your ranking
            </Text>
            <LeaderboardRow user={leaderboard.me} />
          </>
        ) : (
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "800",
              paddingBottom: 16,
            }}
          >
            You are number {leaderboard.me.position}
          </Text>
        )}

        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "800",
            paddingBottom: 16,
          }}
        >
          Keep up the good work!
        </Text>
      </Pressable>
    </View>
  );
};

export default LeaderboardScreen;
