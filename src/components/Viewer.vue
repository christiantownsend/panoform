<template>
  <div id="panoform-viewer" class="panoform-container">
    <ViewerControls />
    <ViewerRenderer />
  </div>
</template>

<script>
import ViewerRenderer from "./ViewerRenderer";
import ViewerControls from "./ViewerControls";

export default {
  name: "Viewer",
  components: {
    ViewerRenderer,
    ViewerControls
  }
};
</script>

<style>
.panoform-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.panoform-renderer {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
