import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import InfoModal from "../components/modals/InfoModal";
import { HomeScreen, ProfileScreen } from "../screens";
import { RootStackParamList } from "../types/rootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: route.params?.username || "Profile",
          headerTintColor: "#f9832f",
          headerRight: () => (
            <Button onPress={() => alert("This is a button")} title="Info" />
          ),
        })}
      />
      <Stack.Screen
        name="Modal"
        component={InfoModal}
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
