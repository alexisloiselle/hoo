import { createContext, useState } from "react";

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
  const [username, setUsername] = useState<string | undefined>("dragon");

  return (
    <AuthenticationContext.Provider
      value={{
        username,
        setUsername: (username: string) => setUsername(username),
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
