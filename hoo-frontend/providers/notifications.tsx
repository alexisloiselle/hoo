import { getDevicePushTokenAsync } from "expo-notifications";
import { createContext, useContext, useEffect, useState } from "react";

import { AuthenticationContext } from "./AuthenticationProvider";
import { Token } from "../api/User/Token";

export const NotificationsContext = createContext({ token: null });

export const NotificationsProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const { username } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fcmToken = (await getDevicePushTokenAsync()).data;
        setToken(fcmToken);
      } catch (e) {
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
