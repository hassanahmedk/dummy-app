import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function InfoModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Info Screen</Text>
      <Text style={styles.subtitle}>
        This is the info screen. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sapiente, reiciendis molestiae eos dolores mollitia
        minus! Accusamus rem fugit odit, iste illum ad consectetur maiores.
        Magnam ex mollitia commodi laboriosam blanditiis!
      </Text>
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
