<template>
  <div id="panoform-viewer" class="panoform-container">
    <ViewerControls/>
    <ViewerRenderer/>
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

.panoform-controls {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.panoform-controlbar {
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
}

.panoform-controlbar.top {
    top: 0;
    bottom: auto;
    justify-content: flex-start;
}

.panoform-controlbar-button {
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

    height: 2em;
    width: 2em;

    -webkit-filter: brightness(80%);
    filter: brightness(80%);
}

.panoform-controlbar-button.enabled, .panoform-controlbar-button:hover {
    -webkit-filter: brightness(100%);
    filter: brightness(100%);
}
</style>
