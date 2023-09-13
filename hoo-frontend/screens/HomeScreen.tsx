import React, { useContext } from "react";
import { View } from "react-native";
import HydrationIndicator, {
  HydrationIndicatorPlaceholder,
} from "../components/HydrationIndicator";
import Colors from "../constants/Colors";
import { AuthenticationContext } from "../providers/AuthenticationProvider";
import { useUser } from "../api/User/UserService";
import FillSvg from "../components/FillSvg";

const HomeScreen = () => {
  const { username } = useContext(AuthenticationContext);
  const { user, isLoading } = useUser(username);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
      }}
    >
      {!isLoading ? (
        <HydrationIndicator user={user} />
      ) : (
        <HydrationIndicatorPlaceholder />
      )}
    </View>
  );
};

export default HomeScreen;
