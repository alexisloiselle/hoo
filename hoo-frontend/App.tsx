import React, { useContext } from "react";
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
import { AuthenticationContext } from "./providers/AuthenticationProvider";
import { MoreScreen } from "./screens/MoreScreen";

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
        <AppContainer />
      </AuthenticationProvider>
    </QueryClientProvider>
  );
};

const AppContainer = () => {
  const { username } = useContext(AuthenticationContext);
  console.log(username);
  return username ? (
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
              tabBarIcon: ({ color }) => <ProfileSvg color={color} size={25} />,
            }}
          />
          <Tab.Screen
            name="More"
            component={MoreScreen}
            options={{
              ...CommonTabBarOptions,
              headerShown: false,
              tabBarLabel: "More",
              tabBarIcon: ({ color }) => <OwlSvg color={color} size={25} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NotificationsProvider>
  ) : (
    <PosoFormScreen />
  );
};

export default App;
