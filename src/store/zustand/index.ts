import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  userName: string;
  email: string;
  dob: string;
  setUserName: (name: string) => void;
  setProfile: (profileData: {
    userName: string;
    email: string;
    dob: string;
  }) => void;
}

const useStore = create<UserState>()(
  persist(
    (set) => ({
      userName: "",
      email: "",
      dob: "",
      setUserName: (name) => set({ userName: name }),
      setProfile: (profileData) =>
        set({
          email: profileData.email,
          dob: profileData.dob,
          userName: profileData.userName,
        }),
    }),
    {
      storage: createJSONStorage(() => AsyncStorage),
      name: "user-storage",
    }
  )
);

export default useStore;
