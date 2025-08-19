import useStore from "@/src/store/zustand";
import { ProfileFormType, profileSchema } from "@/src/validation/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function SettingsScreen() {
  const { userName, email, dob, setProfile } = useStore();
  const setUserName = useStore((state) => state.setUserName);
  const clearProfile = useStore((state) => state.setProfile);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName,
      email,
      dob,
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSubmit = (data: ProfileFormType) => {
    setProfile(data);
  };

  const handleClear = () => {
    setProfile({ userName: "", email: "", dob: "" });
    reset({ userName: "", email: "", dob: "" });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Profile Settings</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            name="userName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.userName && (
            <Text style={styles.error}>{errors.userName.message}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          <Text style={styles.label}>Date of Birth</Text>
          <Controller
            control={control}
            name="dob"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.dateText}>
                    {value ? value : "Select Date"}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(_, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        onChange(selectedDate.toISOString().split("T")[0]);
                      }
                    }}
                  />
                )}
              </>
            )}
          />
          {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4a90e2" }]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e74c3c" }]}
            onPress={handleClear}
          >
            <Text style={styles.buttonText}>Clear Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.preview}>
          <Text style={styles.previewTitle}>Current Profile</Text>
          <Text style={styles.previewText}>User: {userName || "Not set"}</Text>
          <Text style={styles.previewText}>Email: {email || "Not set"}</Text>
          <Text style={styles.previewText}>DOB: {dob || "Not set"}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    marginVertical: 20,
    color: "#333",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 12,
    marginBottom: 6,
    color: "#444",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  dateButton: {
    height: 45,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fafafa",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  error: {
    fontSize: 14,
    color: "red",
    marginTop: 4,
  },
  preview: {
    marginTop: 30,
    alignItems: "center",
  },
  previewTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  previewText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#555",
  },
});
