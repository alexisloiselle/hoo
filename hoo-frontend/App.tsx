import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "react-query";

import ProfileScreen from "./screens/Profile";
import HomeScreen from "./screens/HomeScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import { NotificationsProvider } from "./providers/notifications";
import PosoFormScreen from "./screens/PosoForm";

import OwlSvg from "./components/OwlSvg";
import ProfileSvg from "./components/ProfileSvg";
import LeaderboardSvg from "./components/LeadeboardSvg";
import Colors from "./constants/Colors";
import { LeaderboardEntry } from "./screens/LeaderboardEntry";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();
const CommonTabBarOptions = {
  tabBarActiveTintColor: Colors.accent,
  tabBarInactiveTintColor: Colors.neutral,
  tabBarActiveBackgroundColor: Colors.lightPrimary,
  tabBarInactiveBackgroundColor: Colors.lightestPrimary,
};

const LeaderboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LeaderboardLanding"
        component={LeaderboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LeaderboardEntry"
        component={LeaderboardEntry}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <NotificationsProvider>
          <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  ...CommonTabBarOptions,
                  headerShown: false,
                  tabBarLabel: "Home",
                  tabBarIcon: ({ color }) => <OwlSvg color={color} size={25} />,
                }}
              />
              <Tab.Screen
                name="Leaderboard"
                component={LeaderboardStack}
                options={{
                  ...CommonTabBarOptions,
                  tabBarLabel: "Leaderboard",
                  tabBarIcon: ({ color }) => (
                    <LeaderboardSvg color={color} size={25} />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  ...CommonTabBarOptions,
                  tabBarLabel: "Profile",
                  tabBarIcon: ({ color }) => (
                    <ProfileSvg color={color} size={25} />
                  ),
                }}
              />
              <Tab.Screen
                name="Poso"
                component={PosoFormScreen}
                options={{
                  ...CommonTabBarOptions,
                  headerShown: false,
                  tabBarLabel: "Poso",
                  tabBarIcon: ({ color }) => (
                    <ProfileSvg color={color} size={25} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </NotificationsProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
};

export default App;
