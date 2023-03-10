import { create } from "zustand";
import { User } from "../utils/model";
import dataFetcher from "../utils/dataFetcher";
interface UserState {
  users: User[];
  getAllUser(): void;
  addUser(data: User): void;
  removeUser(id: string): void;
  editUser(d: User): void;
}

export const useStore = create<UserState>((set) => ({
  users: [],
  addUser: async (d: User) => {
    const [data, error] = await dataFetcher("/user/create", "post", d);

    if (typeof data !== null) {
      // console.log(data);
      const userData = data?.data as User;

      if (userData) {
        set((state) => ({
          users: [...state.users, userData],
        }));
      }
    }
    if (error) {
      console.log("Error got occurred:=> " + error);
    }
  },
  getAllUser: async () => {
    const [data, error] = await dataFetcher("/users", "get");

    if (typeof data !== null) {
      //   console.log(data);

      set((state) => ({
        users: data?.data as User[],
      }));
    }
    if (null) {
      console.log("Error got occurred:=> " + error);
    }
  },
  removeUser: async (_id: string) => {
    const [data, error] = await dataFetcher(`/user/${_id}`, "DELETE");

    if (typeof data !== null) {
      set((state) => ({
        users: state.users.filter((e) => e._id !== _id),
      }));
    }
    if (error) {
      console.log("Error got occurred:=> " + error);
    }
  },
  editUser: async (d: User) => {
    const [data, error] = await dataFetcher(`/user/${d._id}`, "PATCH", d);

    if (typeof data !== null) {
      // console.log(data);
      const userData = data?.data as User;

      if (userData) {
        set((state) => ({
          users: [...state.users.filter((e) => e._id !== d._id), userData],
        }));
      }
    }
    if (error) {
      console.log("Error got occurred:=> " + error);
    }
  },
}));
