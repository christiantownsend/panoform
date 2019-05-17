<template>
  <div id="app">
    <button v-on:click.prevent="viewing = !viewing">Toggle viewing</button>
    <button v-on:click.prevent="currentImage == image ? currentImage = image2 : currentImage = image">Change Image</button>
    <Viewer v-if="viewing" v-bind:image="currentImage"/>
  </div>
</template>

<script>
import Viewer from "./components/Viewer.vue";

export default {
  name: "app",
  components: {
    Viewer
  },
  data() {
    return {
      viewing: true,
      currentImage: null,
      image: require("@/assets/pic.png"),
      image2: require("@/assets/pic2.jpg")
    };
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
</style>
