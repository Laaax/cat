<script>
import "../assets/comment-modal.css";
import api from "../api.js";

export default {
  name: "CommentModal",

  props: {
    loggedIn: { required: true, type: Boolean },
  },

  methods: {
    close() {
      this.showStatus = false;
      this.$emit("close");
    },
    logIn() {
      window.location.href = "http://localhost:8080/login";
    },
    async postComment() {
      let comment = this.message.replace(/(\r\n|\n|\r)/gm, "").trim();
      if (comment == "") {
        this.statusMessage = "Comment is empty";
        this.showStatus = true;
        return;
      }
      try {
        let res = await api.postComment(comment);
        this.statusMessage = res.data;
        this.message = "";
        this.$emit("get-comments");
      } catch (err) {
        this.statusMessage = err;
      } finally {
        this.showStatus = true;
      }
    },
  },
  computed: {
    characterCount() {
      return this.message.length;
    },
  },
  data() {
    return {
      message: "",
      max: 120,
      statusMessage: "",
      showStatus: false,
    };
  },
};
</script>

<template>
  <transition name="modal-fade">
    <div @click.self="close" class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header"> Post a comment! </slot>
        </header>

        <section class="modal-body">
          <textarea
            class="comment-input"
            v-model="message"
            placeholder="comment here"
            :maxlength="max"
          />
        </section>

        <footer class="modal-footer">
          <p v-if="showStatus" class="status">{{ statusMessage }}</p>
          <button v-if="loggedIn" class="comment-button" @click="postComment">
            Submit
          </button>
          <button v-else @click="logIn" class="comment-button">Log in</button>
          <p class="counter">{{ characterCount }}/120</p>
        </footer>
      </div>
    </div>
  </transition>
</template>
