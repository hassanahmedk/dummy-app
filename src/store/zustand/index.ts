import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  userName: string;
  email: string;
  dob: string;
}

interface UserActions {
  setUserName: (name: string) => void;
  setProfile: (profileData: {
    userName: string;
    email: string;
    dob: string;
  }) => void;
}

const useStore = create<UserState & UserActions>()(
  persist(
    combine<UserState, UserActions>(
      {
        userName: "",
        email: "",
        dob: "",
      },
      (set) => ({
        setUserName: (name) => set({ userName: name }),
        setProfile: (profileData) =>
          set({
            email: profileData.email,
            dob: profileData.dob,
            userName: profileData.userName,
          }),
      })
    ),
    {
      storage: createJSONStorage(() => AsyncStorage),
      name: "user-storage",
    }
  )
);

export default useStore;
