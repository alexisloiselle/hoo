import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";

export interface AuthenticationProviderState {
  username?: string;
  setUsername: (username: string | undefined) => void;
}

const initialState = {
  username: undefined,
  setUsername: () => {},
};

export const AuthenticationContext =
  createContext<AuthenticationProviderState>(initialState);

const AuthenticationProvider = ({ children }) => {
  const [username, setUsername] = useState<string | undefined>();

  const fonction = async (username) => {
    setUsername(username);
    await AsyncStorage.setItem("username", username);
  };

  React.useEffect(() => {
    const getUsername = async () => {
      const allo = await AsyncStorage.getItem("username");
      console.log(allo);
      setUsername(allo);
    };

    getUsername();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        username,
        setUsername: fonction,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
