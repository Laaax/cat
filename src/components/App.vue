<script>
import TopBar from "./TopBar.vue";
import SlideShow from "./SlideShow.vue";
import IntersectionObserver from "./IntersectionObserver.vue";
import CommentModal from "./CommentModal.vue";
import CatSection from "./CatSection.vue";
import { useUserStore } from "../stores/user.js";
import { useCommentStore } from "../stores/comment.js";
import "../assets/front.css";

// https://shouts.dev/articles/vuejs-scroll-to-elements-on-the-page

export default {
  name: "App",

  components: {
    TopBar,
    SlideShow,
    IntersectionObserver,
    CommentModal,
    CatSection,
  },

  setup() {
    const userStore = useUserStore();
    const commentStore = useCommentStore();
    return { userStore, commentStore };
  },

  data() {
    return {
      canScroll: true,
      currRef: "box-1",
      isIntersectingElement1: false,
      isIntersectingElement2: false,
      isIntersectingElement3: false,
      isIntersectingElement4: false,
      isModalVisible: false,
      inView: false,
    };
  },

  computed: {
    loggedIn() {
      return this.userStore.userStatus;
    },
    name() {
      return this.userStore.userName;
    },
    comments() {
      return this.commentStore.comments;
    },
  },

  beforeMount() {
    this.userStore.checkUser();
    this.commentStore.getComments();
  },

  methods: {
    onResize() {
      if (this.currRef == "box-1") {
        this.goto("box-1");
      } else if (this.currRef == "box-2") {
        this.goto("box-2");
      } else if (this.currRef == "box-3") {
        this.goto("box-3");
      } else {
        this.goto("box-4");
      }
    },
    delay() {
      setTimeout(() => {
        this.canScroll = true;
      }, 800);
    },
    wheel(e) {
      if (this.canScroll) {
        this.canScroll = false;
        this.delay();
        // up
        if (e.deltaY < 0) {
          if (this.currRef == "box-1") {
            this.goto("box-1");
          } else if (this.currRef == "box-2") {
            this.goto("box-1");
          } else if (this.currRef == "box-3") {
            this.goto("box-2");
          } else if (this.currRef == "box-4") {
            this.goto("box-3");
          }
          // down
        } else if (e.deltaY > 0) {
          if (this.currRef == "box-1") {
            this.goto("box-2");
          } else if (this.currRef == "box-2") {
            this.goto("box-3");
          } else if (this.currRef == "box-3") {
            this.goto("box-4");
          } else if (this.currRef == "box-4") {
            this.goto("box-4");
          }
        }
      }
    },
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      this.currRef = refName;
      window.scrollTo(0, top);
    },
    onIntersectionElement1(value) {
      this.isIntersectingElement1 = value;
    },
    onIntersectionElement2(value) {
      this.isIntersectingElement2 = value;
      if (value) {
        this.inView = true;
      } else {
        this.inView = false;
      }
    },
    onIntersectionElement3(value) {
      this.isIntersectingElement3 = value;
    },
    onIntersectionElement4(value) {
      this.isIntersectingElement4 = value;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async getComments() {
      await this.commentStore.getComments();
    },
  },

  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener("resize", this.onResize);
  },

  beforeUnmount() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<template>
  <div @wheel="wheel" class="page">
    <div class="box">
      <div ref="box-1" class="box-1">
        <top-bar :loggedIn="loggedIn" :name="name" />
        <div class="title-box">
          <h1 class="title">Cat</h1>
          <intersection-observer
            sentinal-name="sentinal-1"
            @on-intersection-element="onIntersectionElement1"
          ></intersection-observer>
        </div>
      </div>
      <div ref="box-2" class="box-2">
        <cat-section :inView="inView" />
        <intersection-observer
          sentinal-name="sentinal-2"
          @on-intersection-element="onIntersectionElement2"
        ></intersection-observer>
      </div>
      <div ref="box-3" class="box-3">
        <h1 class="comment-title">Comments</h1>
        <slide-show :comments="comments" />
        <intersection-observer
          sentinal-name="sentinal-3"
          @on-intersection-element="onIntersectionElement3"
        ></intersection-observer>
        <button type="button" class="comment-button" @click="showModal">
          Post a Comment
        </button>

        <comment-modal
          :loggedIn="loggedIn"
          v-show="isModalVisible"
          @close="closeModal"
          @get-comments="getComments"
        />
      </div>
      <div ref="box-4" class="box-4">
        <hr class="box-4-hr" />
        <h2 class="box-4-text">Cat Sources</h2>
        <intersection-observer
          sentinal-name="sentinal-4"
          @on-intersection-element="onIntersectionElement4"
        ></intersection-observer>
        <a
          class="box-4-text"
          href="https://thecatapi.com"
          title="cat image"
          target="_blank"
          rel="noopener noreferrer"
          >Cat image</a
        >
        <a
          class="box-4-text"
          href="https://catfact.ninja"
          title="cat fact"
          target="_blank"
          rel="noopener noreferrer"
          >Cat fact</a
        >
        <a
          class="box-4-text"
          href="https://www.flaticon.com/free-icons/khao-manee-cat"
          title="khao-manee-cat icons"
          target="_blank"
          rel="noopener noreferrer"
          >Khao-manee-cat icons created by Vitaly Gorbachev - Flaticon</a
        >
      </div>
    </div>
  </div>
  <div class="nav" v-show="!isModalVisible">
    <fieldset v-bind:class="{ active: isIntersectingElement1 }">
      <legend @click="goto('box-1')">Home</legend>
    </fieldset>
    <fieldset v-bind:class="{ active: isIntersectingElement2 }">
      <legend @click="goto('box-2')">Cats</legend>
    </fieldset>
    <fieldset v-bind:class="{ active: isIntersectingElement3 }">
      <legend @click="goto('box-3')">Comments</legend>
    </fieldset>
    <fieldset v-bind:class="{ active: isIntersectingElement4 }">
      <legend @click="goto('box-4')">Cat Sources</legend>
    </fieldset>
  </div>
</template>
