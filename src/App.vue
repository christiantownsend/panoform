<template>
  <div id="app">
    <Viewer v-if="this.$store.state.viewing"/>

    <header>
      <div class="container flex">
        <div class="logo"><img src="./assets/logo.png" alt="Panoform Logo"></div>
        <nav>
          <a href="">Grids</a>
          <a href="">About</a>
        </nav>
      </div>
    </header>

    <section>
      <h2>Upload an Image</h2>
      <ImagePicker/>
    </section>

    <section>
      <div class="flex">
        <h2>Recent Images</h2>
        <button class="button" v-on:click.prevent="clearDB">Clear</button>
      </div>

      <main>
        <figure v-for="image in recentImages" v-bind:key="image.key">
          <img :src="image.data" v-on:click="setImage(image.data)">
        </figure>
      </main>
    </section>
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

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

section {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 3rem;
}

header {
  width: 100%;
  padding: 1em 0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.1);
  margin-bottom: 4rem;
  
  .container {
    margin: 0 auto;
    width: 90%;
    max-width: 1000px;
  }

  .logo {
    max-width: 300px;

    img {
      width: 100%;
    }
  }

  nav {
    display: flex;

    a {
      margin-left: 1em;
      text-decoration: none;
      color: black;
      font-weight: 600;
    }
  }
}

h2 {
  color: #222;
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

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  display: inline-block;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  background: none;
  font-weight: 600;
  color: #ee3933;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover,
  &:focus {
    color: darken(#ee3933, 10%);
  }
}
</style>
