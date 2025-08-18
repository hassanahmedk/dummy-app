import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../types/rootStackParamList";

export const linking: LinkingOptions<RootStackParamList> = {
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
