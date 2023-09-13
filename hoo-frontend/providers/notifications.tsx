import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

import { AuthenticationContext } from "./AuthenticationProvider";
import { Token } from "../api/User/Token";

export const NotificationsContext = createContext({ token: null });

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export const NotificationsProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const { username } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fcmToken = await registerForPushNotificationsAsync();
        console.log(fcmToken);
        setToken(fcmToken);
      } catch (e) {
        console.log(e);
        console.error(JSON.stringify(e.response.data));
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const sendToken = async (newToken: string, newUsername: string) => {
      try {
        await Token.putToken(newToken, newUsername);
      } catch (e) {
        console.error(JSON.stringify(e.response.data));
      }
    };

    if (token && username) {
      sendToken(token, username);
    }
  }, [token, username]);

  return (
    <NotificationsContext.Provider value={{ token }}>
      {children}
    </NotificationsContext.Provider>
  );
};
