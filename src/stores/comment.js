import { defineStore } from "pinia";
import api from "../api.js";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    commentList: [{ _id: 0, name: "", comment: "No comments available" }],
  }),
  getters: {
    comments(state) {
      console.log(state.commentList);
      return state.commentList;
    },
  },
  actions: {
    async getComments() {
      try {
        let res = await api.getComments();
        this.commentList = res.data;
      } catch (err) {
        this.commentList = [
          { _id: 0, name: "", comment: "No comments available" },
        ];
      }
    },
  },
});
