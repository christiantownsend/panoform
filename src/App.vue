<template>
  <div id="app">
    <Viewer v-if="this.$store.state.viewing" />

    <section>
      <ImagePicker />
      <button v-on:click.prevent="clearDB">Clear DB</button>
    </section>

    <main>
      <figure v-for="image in recentImages" v-bind:key="image.key">
        <img :src="image.data" v-on:click="setImage(image.data)" />
      </figure>
    </main>
  </div>
</template>

<script>
import Viewer from "./components/Viewer";
import ImagePicker from "./components/ImagePicker";

export default {
  name: "app",
  components: {
    Viewer,
    ImagePicker
  },
  computed: {
    recentImages() {
      return this.$store.state.recentImages;
    }
  },
  methods: {
    clearDB() {
      this.$store.dispatch("clearRecentImages");
    },
    setImage(image) {
      this.$store.commit("setCurrentImage", image);
      this.$store.dispatch("addRecentImage", image);
      this.$store.commit("setViewing", true);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  margin: 0;
  padding: 0;
}

section,
main {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2em 0;
}

main {
  display: grid;
  grid-gap: 2em;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
}

main figure {
  margin: 0;
  cursor: pointer;
  position: relative;
  display: block;
  width: 100%;
  border-radius: 0.5em;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

main figure::after {
  content: "";
  border-radius: inherit;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  opacity: 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

main figure:hover {
  transform: scale(1.025, 1.025);
}

main figure:hover::after {
  opacity: 1;
}

main figure img {
  border-radius: inherit;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
