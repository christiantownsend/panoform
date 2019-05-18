<template>
  <div class="panoform-controls">
    <div class="panoform-controlbar top">
      <button v-on:click.prevent="closeViewer">Close</button>
    </div>
    <div class="panoform-controlbar">
      <button v-on:click.prevent="loadImage">Load Image</button>
      
      <button v-if="webVR" v-on:click.prevent="toggleWebVR">Toggle WebVR</button>
      <button v-if="deviceOrientationVR" v-on:click.prevent="toggleStereo">Toggle Stereo</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewerControls",
  data() {
    return {
      webVR: false,
      deviceOrientationVR: false,
      image: require("@/assets/pic.png")
    };
  },
  methods: {
    init() {
      if ("getVRDisplays" in navigator) {
        navigator.getVRDisplays().then(displays => {
          this.webVR = true;
        });
      } else {
        const deviceOrientationHandler = () => {
          this.deviceOrientationVR = true;
          window.removeEventListener(
            "deviceorientation",
            deviceOrientationHandler,
            false
          );
        };
        window.addEventListener(
          "deviceorientation",
          deviceOrientationHandler,
          false
        );
      }
    },
    loadImage() {
      this.$store.commit("setCurrentImage", this.image);
      this.$store.dispatch("addRecentImage", this.image);
    },
    closeViewer() {
      this.$store.commit("setViewing", false);
    },
    toggleVR() {
      let newVal = !this.$store.state.viewer.stereo;

      if (screen.orientation != null) {
        if (newVal) {
          screen.orientation.lock("landscape-primary").catch(e => {
            console.log("Orientation lock not supported on device");
          });
        } else {
          screen.orientation.unlock();
        }
      }

      this.$store.commit("setControls", newVal ? 1 : 0);
      this.$store.commit("setStereo", newVal);
      this.$store.commit("setFullscreen", newVal);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
