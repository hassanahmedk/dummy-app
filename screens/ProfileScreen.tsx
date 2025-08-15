import { useGitHubUser } from "@/api/github/queries";
import { RootStackParamList } from "@/types/rootStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({
  route,
  navigation,
}: ProfileScreenProps) {
  const { username } = route.params;
  const { data, isLoading, error } = useGitHubUser(username);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f9832f" />
        <Text>Loading user profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "red" }}>Error loading profile</Text>
      </View>
    );
  }

  const user = data;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>GitHub Profile</Text>
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <Text style={styles.subtitle}>Username: {user.login}</Text>
      <Text>Name: {user.name || "N/A"}</Text>
      <Text>Bio: {user.bio || "No bio provided"}</Text>
      <Text>Public Repos: {user.public_repos}</Text>
      <Text>Followers: {user.followers}</Text>
      <Text>Following: {user.following}</Text>

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home", {})}
      />
      <Button
        title="Go back with params"
        onPress={() => navigation.popTo("Home", { homeText: "postText" })}
      />
      <Button title="Open Modal" onPress={() => navigation.navigate("Modal")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
});
