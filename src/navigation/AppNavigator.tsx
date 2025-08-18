import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import HomeTabs from "./HomeTabs";
import { linking } from "./linking";

export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <HomeTabs />
    </NavigationContainer>
  );
}
