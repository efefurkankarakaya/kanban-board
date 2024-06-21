import { IUserModel } from "@/models/user.model";
import { create } from "zustand";

interface UserStore {
  user: IUserModel;
  updateUser: (userData: Partial<IUserModel>) => void;
  resetUser: () => void;
}

const initialState: IUserModel = {
  _id: "",
  userName: "",
  createdAt: new Date(),
  lastLogin: new Date()
};

const useUserStore = create<UserStore>((set) => ({
  user: initialState,
  updateUser: (userData: Partial<IUserModel>) => set((state) => ({ user: { ...state.user, ...userData } })),
  resetUser: () => set((state) => ({ ...state, user: { ...initialState } }))
}));

export default useUserStore;
