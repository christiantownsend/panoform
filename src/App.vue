<template>
  <div id="app">
    <Viewer v-if="this.$store.state.viewing" />

    <header>
      <div class="container flex">
        <div class="logo">
          <img src="./assets/logo.png" alt="Panoform Logo" />
        </div>
        <nav></nav>
      </div>
    </header>

    <section>
      <h2>Upload an Image</h2>
      <p>Note: If you're on iOS, please enable <strong>Settings > Safari > Motion & Orientation Access</strong> to allow you to view your image in VR mode</p>
      <ImagePicker />
    </section>

    <section>
      <div class="flex">
        <h2>Recent Images</h2>
        <button v-if="recentImages.length != 0" class="button" v-on:click.prevent="clearDB">Clear</button>
      </div>

      <main>
        <p v-if="recentImages.length == 0">No images have been stored</p>
        <figure v-for="image in recentImages" v-bind:key="image.key">
          <button v-on:click.prevent="removeImage(image.key)"></button>
          <img :src="image.data" v-on:click="setImage(image.data)" />
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
      this.$store.commit("setViewing", true);
    },
    removeImage(imageKey) {
      this.$store.dispatch("removeRecentImage", imageKey);
    }
  }
};
</script>

<style lang="scss">
*,
*::after,
*::before {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  background-color: #fafafa;
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
}

header {
  width: 100%;
  padding: 1em 0;
  // box-shadow: 0 3px 6px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.1);
  background-color: #fff;
  border-bottom: 1px solid #eee;

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

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
  margin-bottom: 2rem;
}

section, header {
  margin-bottom: 4rem;
}

h2 {
  color: #222;
}

p {
  color: #666;

  strong {
    color: #222;
  }
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

  &::after {
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

  &:hover {
    transform: scale(1.025, 1.025);
  }

  &:hover::after {
    opacity: 1;
  }

  img {
    // position: absolute;
    border-radius: inherit;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
  }

  button {
    z-index: 1;
    position: absolute;
    display: inline-block;
    border: none;
    margin: 0;
    text-decoration: none;
    background: none;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-repeat: no-repeat;
    background-position: center;

    height: 3em;
    width: 3em;
    top: 1em;
    right: 1em;
    background-image: url("assets/close-icon.svg");
  }
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
