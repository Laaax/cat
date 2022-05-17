<script>
import "../assets/topbar.css";

export default {
  props: {
    loggedIn: { required: true, type: Boolean },
    name: { required: true, type: String },
  },

  methods: {
    logIn() {
      window.location.href = "http://localhost:8080/login";
    },
    logOut() {
      window.location.href = "http://localhost:8080/logout";
    },
  },
};
</script>

<template>
  <div class="topnav">
    <p v-if="loggedIn" class="user">{{ name }}</p>
    <button v-if="loggedIn" @click="logOut">Log out</button>
    <button v-else @click="logIn">Log in</button>
  </div>
</template>
