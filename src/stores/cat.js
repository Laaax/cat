import { defineStore } from "pinia";
import axios from "axios";
import image from "../assets/cat.png";

export const useCatStore = defineStore("cat", {
  state: () => ({
    img: image,
    fact: "",
    id: 0,
  }),
  getters: {
    catInfo(state) {
      return { img: state.img, fact: state.fact, id: state.id };
    },
  },
  actions: {
    getCat() {
      const requestImg = axios.get(
        "https://api.thecatapi.com/v1/images/search",
        {
          params: {
            limit: 1,
            size: "full",
            api_key: "",
          },
        }
      );
      const requestFact = axios.get("https://catfact.ninja/fact");
      axios
        .all([requestImg, requestFact])
        .then(
          axios.spread((...responses) => {
            const responseImg = responses[0];
            const responseFact = responses[1];
            this.img = responseImg.data[0].url;
            this.id = responseImg.data[0].id;
            this.fact = responseFact.data.fact;
          })
        )
        .catch((errors) => {
          this.id = 0;
          this.img = image;
          this.fact = "Get cat error";
        });
    },
  },
});
