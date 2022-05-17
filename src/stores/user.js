import { defineStore } from "pinia";
import api from "../api.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    name: "",
  }),
  getters: {
    userStatus(state) {
      return state.isLoggedIn;
    },
    userName(state) {
      return state.name;
    },
  },
  actions: {
    async checkUser() {
      try {
        let res = await api.user();
        if (res.data) {
          this.isLoggedIn = res.data.name;
          this.name = res.data["https://cattttttttapp.com/username"];
        }
      } catch (err) {
        return;
      }
    },
  },
});
