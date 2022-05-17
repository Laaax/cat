<script>
import "../assets/cat-section.css";
import { useCatStore } from "../stores/cat.js";

export default {
  name: "CatSection",

  props: {
    inView: { required: true, type: Boolean },
  },

  setup() {
    const catStore = useCatStore();
    return { catStore };
  },

  data() {
    return {
      id: 0,
    };
  },

  beforeMount() {
    this.catStore.getCat();
  },

  computed: {
    cat() {
      return this.catStore.catInfo;
    },
  },

  methods: {
    refresh() {
      this.catStore.getCat();
    },
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
</style>

<template>
  <Transition name="cat">
    <div class="flip-card" :key="cat.id">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img class="cat-img" v-bind:src="cat.img" alt="Cat image" />
        </div>
        <div class="flip-card-back">
          <p class="card-back-text">{{ cat.fact }}</p>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="refresh">
    <button @click="refresh" v-if="inView" class="float">
      <i class="fa fa-refresh"></i>
    </button>
  </Transition>
</template>
