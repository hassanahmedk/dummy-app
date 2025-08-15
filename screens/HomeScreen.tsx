import { RootStackParamList } from "@/types/rootStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ route, navigation }: HomeScreenProps) {
  const homeText = route.params?.homeText;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("HomeScreen focused");
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      console.log("HomeScreen blurred");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ab,
        commodi aspernatur laboriosam ipsa distinctio harum veritatis atque
        pariatur fugiat ex consectetur quam similique possimus soluta
        voluptatibus sapiente excepturi vitae.
      </Text>

      {homeText ? <Text>{homeText}</Text> : null}
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile", { username: "Hassan" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
    textAlign: "center",
  },
});
