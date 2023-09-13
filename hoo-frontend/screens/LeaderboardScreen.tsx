import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { useLeaderBoard } from "../api/User/UserService";
import { AuthenticationContext } from "../providers/AuthenticationProvider";
import User from "../models/User";
import Colors from "../constants/Colors";

interface LeaderboardRowProps {
  user: User;
}

const LeaderboardRow = ({ user }: LeaderboardRowProps) => {
  if (!user) return null;

  return (
    <View
      style={{
        padding: 8,
        paddingLeft: 32,
        marginTop: 8,
        marginBottom: 8,
        width: "100%",
        height: 50,
        backgroundColor: Colors.lightPrimary,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
      key={user.id}
    >
      <Text style={{ color: Colors.primary, fontWeight: "500" }}>
        {user.position ?? ""}
      </Text>
      <Text
        style={{ color: Colors.primary, fontWeight: "500", marginLeft: -32 }}
      >
        {user.username}
      </Text>
      <Text></Text>
    </View>
  );
};

const LeaderboardScreen = () => {
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
        backgroundColor: Colors.primary,
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
    </View>
  );
};

export default LeaderboardScreen;
