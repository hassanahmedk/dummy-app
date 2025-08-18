import { useGetUserDetailQuery } from "@/src/services/api";
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";

export function ProfileScreen({ route }: any) {
  const { username } = route.params;
  const { data, isLoading, error } = useGetUserDetailQuery(username);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#24292f" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>⚠️ Error loading profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: data?.avatar_url }} style={styles.avatar} />

      <Text style={styles.name}>{data?.name || data?.login}</Text>
      <Text style={styles.username}>@{data?.login}</Text>

      {data?.bio ? <Text style={styles.bio}>{data?.bio}</Text> : null}

      <View style={styles.metaRow}>
        <Text style={styles.meta}>📍 {data?.location || "Unknown"}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{data?.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{data?.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{data?.public_repos}</Text>
          <Text style={styles.statLabel}>Repos</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="View on GitHub"
          color="#0366d6"
          onPress={() => Linking.openURL(data?.html_url || "")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#f6f8fa",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#e1e4e8",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#24292f",
  },
  username: {
    fontSize: 16,
    color: "#586069",
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: "#24292f",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  metaRow: {
    marginBottom: 16,
  },
  meta: {
    fontSize: 14,
    color: "#586069",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#24292f",
  },
  statLabel: {
    fontSize: 12,
    color: "#586069",
  },
  buttonWrapper: {
    marginTop: 20,
    width: "100%",
  },
});
