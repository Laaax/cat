<script>
import "../assets/slider.css";
import { useCommentStore } from "../stores/comment.js";

export default {
  name: "SlideShow",
  props: {
    comments: { required: true, type: Object },
  },

  created() {
    const unwatch = this.$watch("comments", (newVal, oldVal) => {
      if (newVal.length > 1) {
        this.startSlide();
        unwatch();
      }
    });
  },

  setup() {
    const commentStore = useCommentStore();
    return { commentStore };
  },

  data() {
    return {
      auto: true,
      timer: null,
      currentIndex: 0,
    };
  },

  mounted() {
    if (this.comments.length > 1) {
      this.startSlide();
    }
  },

  methods: {
    startSlide: function () {
      this.timer = setInterval(this.goNext, 7000);
    },

    goNext() {
      if (this.auto) {
        this.currentIndex += 1;
      } else {
        this.auto = true;
      }
    },

    next: function () {
      this.auto = false;
      this.currentIndex += 1;
    },

    prev: function () {
      this.auto = false;
      this.currentIndex -= 1;
    },
  },

  computed: {
    currentComment: function () {
      let calc = Math.abs(this.currentIndex) % this.comments.length;
      return this.comments[calc];
    },
  },
};
</script>

<template>
  <div class="slider">
    <transition-group class="comment-section" name="fade" tag="div">
      <div class="comment-section" :key="currentComment._id">
        <p class="comment">{{ currentComment.comment }}</p>
        <p class="name">{{ currentComment.name }}</p>
      </div>
    </transition-group>
  </div>
</template>
