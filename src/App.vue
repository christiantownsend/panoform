<template>
  <div id="app">
    <Viewer v-if="this.$store.state.viewing" />

    <header class="header">
      <div class="container header_container">
        <img class="header_logo" src="./assets/logo-full.svg" alt="Panoform Logo" />
        <nav class="header_nav"></nav>
      </div>
    </header>

    <section>
      <div class="container">
        <h2 class="section_header">Upload an Image</h2>
        <p class="text-center">
          If your device is running iOS 12 or below, please enable
          <strong>Settings > Safari > Motion & Orientation Access</strong> to enable VR
        </p>
        <p class="text-center">If your device is running iOS 13 or higher, just tap <a href="#" v-on:click.prevent="enableOrientation">here</a> to enable VR</p>
        <ImagePicker class="text-center" />
      </div>
    </section>

    <section class="gray">
      <div class="container">
        <div class="flex">
          <h2>Recent Images</h2>
          <button
            v-if="recentImages.length != 0"
            class="button inline"
            v-on:click.prevent="clearDB"
          >Clear</button>
        </div>

        <!-- <main>
          <figure v-for="image in recentImages" v-bind:key="image.key">
            <button v-on:click.prevent="removeImage(image.key)"></button>
            <img :src="image.data" v-on:click="setImage(image.data)" />
          </figure>
        </main>-->
        <p v-if="recentImages.length == 0">No images have been stored</p>
        <div class="grid">
          <div class="grid_item card" v-for="image in recentImages" v-bind:key="image.key">
            <img class="card_image" :src="image.data" v-on:click="setImage(image.data)" alt />
            <div class="card_body flex around">
              <button v-on:click.prevent="setImage(image.data)" class="button inline">View</button>
              <button v-on:click.prevent="removeImage(image.key)" class="button inline">Delete</button>
            </div>
          </div>
        </div>
      </div>
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
    },
    enableOrientation() {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === "granted") {
              console.log('Orientation Permission Granted')
            }
          })
          .catch(console.error);
      } else {
        console.log("Non-iOS Device")
      }
    }
  }
};
</script>

<style lang="scss">

@import url("https://fonts.googleapis.com/css?family=Lato:400,700|Montserrat:600&display=swap");

/* BASE */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  height: 100%;

  font: 1em/1.5 "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  background-color: #fafafa;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 600;
}

body {
  margin: 0;
  min-height: 100%;

  display: flex;
  flex-direction: column;
}

h1,
h2,
h3,
h4,
h5,
h6,
hgroup,
ul,
ol,
dd,
p,
figure,
pre,
table,
fieldset,
hr,
.header,
.button {
  margin: 0 0 1.5rem 0;
}

li {
  margin-bottom: 0.75rem;
}

h1,
h2,
h3,
h4,
h5,
h6,
hgroup {
  color: #224;
}

ul,
ol,
dd,
p,
figure,
pre,
table,
fieldset,
hr {
  color: #556;
}

a {
  color: #f42766;
}

.button {
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  color: white;
  background-color: #f42766;
  border-radius: 0.3rem;
  transition: all 0.1s ease-in-out;
}

.button.outline {
  background-color: transparent;
  border: 1px solid;
}

.button.inline {
  display: inline;
  border: none;
  background: transparent;
  color: #f42766;
  font-weight: 600;
  padding: 0;
  // margin-left: 1.5rem;
}

.button.outline:hover {
  background-color: white;
  color: #f42766;
}

.container {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
}

.island {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  padding: 1.5rem;
  position: relative;
  transition: transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
}

.card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  border-radius: 0.3rem;
  // padding: 1.5rem;
  position: relative;
  transition: transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
}

.card_image {
  width: 100%;
  height: auto;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.card_body {
  padding: 1.5rem;
  padding-bottom: 0;
}

.island::after,
.card::after {
  content: "";
  border-radius: inherit;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0.5em 10px rgba(0, 0, 0, 0.15);
  opacity: 0;
  transition: opacity 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.island:hover,
.card:hover {
  transform: translateY(-0.5em);
}

.island:hover::after,
.card:hover::after {
  opacity: 1;
}

.island_image {
  height: 4.5rem;
  width: auto;
  margin: 1.5rem 0;
}

.island_image.landscape {
  height: auto;
  width: 100%;
}

.flipper {
  transform-style: preserve-3d;
  transform: perspective(1000px);
  position: relative;
}

.flipper .front,
.flipper .back {
  border-radius: 0.3rem;
  backface-visibility: hidden;
  transition: transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.flipper:hover .front {
  transform: rotateY(180deg);
}

.flipper:hover .back {
  transform: rotateY(360deg);
}

.flipper .back {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #224;
  transform: rotateY(180deg) translateZ(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.media {
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-bottom: 3rem;
}

.media_image {
  width: 200px;
}

.media_text {
  grid-column: span 3;
}

.grid {
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.grid.three {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.grid_item {
  align-self: start;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.flex.around {
  justify-content: space-around;
}

.flex_item {
  flex-basis: 0;
  flex-grow: 1;
  min-width: 200px;
  padding-right: 1.5rem;
}

.flex_item img,
.grid_item img {
  display: block;
  width: 100%;
}

.text-center {
  text-align: center;
}

section {
  padding: 6rem 0;
}

section.gray {
  background-color: #f3f3f3;
}

.section_header {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 4.5rem;
}

/* HEADER */

.header {
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid #ddd;
  width: 100%;
  // position: fixed;
  z-index: 1;
}

.header_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
}

.header_logo {
  height: 1.5rem;
  margin: 1.5rem 1.5rem 0 0;
  margin-bottom: 0;
}

.header_nav {
  margin: 1.5rem 0;
}

.header_nav > .nav_item {
  text-decoration: none;
  margin: 0 0 0 1.5rem;
  color: inherit;
  white-space: nowrap;
}

.header_nav > .nav_item:first-child {
  margin-left: 0;
}

.header_nav > .nav_item-emphasis {
  text-decoration: none;
  font-weight: 700;
  color: #f42766;
}

/* FOOTER */

footer {
  margin-top: auto;
  color: #889;
  padding: 1.5rem 0;
}

.footer_container {
  display: flex;
  justify-content: space-between;
}

.footer_nav > .nav_item {
  margin: 0 0 0 1.5rem;
  white-space: nowrap;
}

/* HERO */

.hero {
  height: 100vh;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;

  /* background-color: rgba(0, 0, 0, .2); */

  // background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../images/photos/model.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.hero_title {
  font-size: 3.5rem;
  color: white;
}

.hero .button {
  border-color: white;
}
</style>

