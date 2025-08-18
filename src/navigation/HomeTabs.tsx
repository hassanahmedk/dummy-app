import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabBar from "../components/TabBar";
import { SettingsScreen } from "../screens";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
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
