import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "react-query";
import ProfileScreen from "./screens/Profile";
import HomeScreen from "./screens/HomeScreen";
import LeaderboardScreen from "./screens/Leaderboard";
import AuthenticationProvider from "./providers/AuthenticationProvider";

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
};

export default App;
