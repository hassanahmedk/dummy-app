import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { Button, Text } from "react-native";
import { HomeScreen, ProfileScreen } from "./screens";
import InfoScreen from "./screens/modals/InfoModal";
import SettingsScreen from "./screens/SettingsScreen";
import { RootStackParamList } from "./types/rootStackParamList";

import MyTabBar from "./components/TabBar";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/"), "https://app.example.com"],
  config: {
    screens: {
      Home: {
        screens: {
          Home: "home",
          Profile: "profile/:username",
          Modal: "modal",
        },
      },
      Settings: "settings",
    },
  },
} as any;

function HomeTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false, tabBarLabelPosition: "beside-icon" }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: route.params.username || "Profile",
          headerTintColor: "#f9832f",
          headerRight: () => (
            <Button onPress={() => alert("This is a button")} title="Info" />
          ),
        })}
      />
      <Stack.Screen
        name="Modal"
        component={InfoScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <HomeTabs />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
