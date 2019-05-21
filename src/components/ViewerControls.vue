<template>
  <div class="controls">
    <div class="controlbar top">
      <button
        class="button close enabled"
        v-on:click.prevent="closeViewer"
      ></button>
    </div>
    <div class="controlbar">
      <button
        class="button VR"
        :class="{ enabled: isWebVR }"
        v-if="webVR"
        v-on:click.prevent="toggleWebVR"
      ></button>
      <button
        class="button VR"
        :class="{ enabled: isStereo }"
        v-if="deviceOrientationVR"
        v-on:click.prevent="toggleVR"
      ></button>
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
    };
  },
  computed: {
    isStereo() {
      return this.$store.state.viewer.stereo;
    },
    isWebVR() {
      return this.$store.state.viewer.webVR;
    },
  },
  methods: {
    init() {
      if ("getVRDisplays" in navigator) {
        navigator.getVRDisplays().then(displays => {
          this.$store.commit("setWebVRDevice", displays[0]);
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
    },
    toggleWebVR() {
      let newVal = !this.$store.state.viewer.webVR;

      this.$store.commit("setWebVR", newVal);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.controls {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.controlbar {
  position: absolute;
  top: auto;
  bottom: 0;
  width: 100%;
  padding: 1em;
  /* background-color: rgba(0,0,0,.5); */
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: initial;

  &.top {
    top: 0;
    bottom: auto;
    justify-content: flex-start;
  }

  .button {
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

    filter: brightness(80%);

    &.enabled,
    &:hover {
      filter: brightness(100%);
    }

    &.close {
      background-image: url("../assets/close-icon.svg");
    }

    &.VR {
      background-image: url("../assets/vr-icon.svg");
    }
  }
}
</style>
