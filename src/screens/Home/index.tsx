import {
  useLazyGetUsersQuery,
  useLazySearchUsersQuery,
} from "@/src/services/api";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Mode = "feed" | "search";

export function HomeScreen({ navigation }: any) {
  const [users, setUsers] = useState<any[]>([]);
  const [mode, setMode] = useState<Mode>("feed");
  const [since, setSince] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPage] = useState(1);

  const [fetchUsers, feedState] = useLazyGetUsersQuery();
  const [searchUsers, searchState] = useLazySearchUsersQuery();

  const loadFirstFeedPage = useCallback(async () => {
    setMode("feed");
    setHasMore(true);
    const firstSince = 0;

    try {
      const res = await fetchUsers({
        since: firstSince,
        per_page: 20,
      }).unwrap();
      setUsers(res);
      setSince(res.length ? res[res.length - 1].id : 0);
      setHasMore(res.length > 0);
    } catch (e) {
      Alert.alert("Error loading users");
    }
  }, [fetchUsers]);

  const loadMoreFeed = useCallback(async () => {
    if (mode !== "feed") return;
    if (!hasMore) return;
    if (feedState.isFetching) return;

    try {
      const res = await fetchUsers({ since, per_page: 20 }).unwrap();
      if (res.length === 0) {
        setHasMore(false);
        return;
      }
      setUsers((prev) => [...prev, ...res]);
      setSince(res[res.length - 1].id);
    } catch (e) {
      Alert.alert("Error loading users");
    }
  }, [mode, hasMore, feedState.isFetching, fetchUsers, since]);

  const runSearch = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) {
        setSearchTerm("");
        setUsers([]);
        await loadFirstFeedPage();
        return;
      }
      setMode("search");
      try {
        const res = await searchUsers({
          q: trimmed,
          page: searchPage,
          per_page: 30,
        }).unwrap();
        setUsers(res.items);
      } catch (e) {
        Alert.alert("Error fetching search results");
      }
    },
    [loadFirstFeedPage, searchUsers, searchPage]
  );

  const debouncedSearch = useMemo(() => debounce(runSearch, 400), [runSearch]);

  useEffect(() => {
    loadFirstFeedPage();
  }, [loadFirstFeedPage]);

  const onChangeSearch = (text: string) => {
    setSearchTerm(text);
    debouncedSearch(text);
  };

  const onClearSearch = async () => {
    debouncedSearch.cancel();
    setSearchTerm("");
    setUsers([]);
    await loadFirstFeedPage();
  };

  const onRefresh = async () => {
    if (mode === "feed") {
      await loadFirstFeedPage();
    } else {
      await runSearch(searchTerm);
    }
  };

  const isLoading =
    (mode === "feed" && feedState.isFetching && users.length === 0) ||
    (mode === "search" && searchState.isFetching && users.length === 0);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search GitHub users…"
          value={searchTerm}
          onChangeText={onChangeSearch}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.searchInput}
        />
        {searchTerm.length > 0 ? (
          <TouchableOpacity onPress={onClearSearch} style={styles.clearBtn}>
            <Text style={styles.clearTxt}>×</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color="#999" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate("Profile", { username: item.login })
              }
            >
              <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
              <Text style={styles.login}>{item.login}</Text>
            </TouchableOpacity>
          )}
          refreshing={feedState.isFetching || searchState.isFetching}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            // when end, fetch more.. infinite scroll
            if (mode === "feed") loadMoreFeed();
          }}
          ListFooterComponent={
            mode === "feed" && feedState.isFetching ? (
              <ActivityIndicator style={{ marginVertical: 16 }} />
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No users to show</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  clearBtn: {
    height: 28,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  clearTxt: { fontSize: 22, lineHeight: 22, color: "#6b7280" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  login: { fontSize: 16, fontWeight: "600", color: "#111827" },

  empty: { alignItems: "center", padding: 24 },
  emptyText: { color: "#6b7280" },
});
