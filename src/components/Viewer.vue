<template>
  <div id="viewer-container"></div>
</template>

<script>
import * as THREE from "three";
import StereoEffect from "@twerkus/three-stereo-effect";
import DeviceOrientationControls from "@twerkus/three-stereo-effect";
import OrbitControls from "three-orbitcontrols";

const PANOFORM = {
  controls: {
    ORBIT: 0,
    DEVICEORIENTATION: 1
  },
  modes: {
    NORMAL: 0,
    STEREO: 1
  },
  classes: {
    CONTAINER: "panoform-container",
    RENDERER: "panoform-renderer",
    CONTROLBAR: "panoform-controlbar",
    CONTROLBARBUTTON: "panoform-controlbar-button",
    buttons: {
      VR: "panoform-controlbar-button-VR",
      FULLSCREEN: "panoform-controlbar-button-fullscreen"
    }
  }
};

export default {
  name: "Viewer",
  data() {
    return {
      container: null,
      camera: null,
      controls: null,
      scene: null,
      normalRenderer: null,
      stereoRenderer: null,
    };
  },
  props: ["image"],
  watch: {
    image: function(newVal, oldVal) {
      this.loadImage(newVal);
    }
  },
  methods: {
    init: function() {
      this.container = document.getElementById("viewer-container");

      // INITIALIZE SCENE
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.container.clientWidth / this.container.clientHeight,
        1,
        1100
      );
      this.camera.position.z = 0.5;

      // CREATE RENDERER
      this.normalRenderer = new THREE.WebGLRenderer();
      this.normalRenderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
      this.normalRenderer.setPixelRatio(window.devicePixelRatio);

      // CREATE STEREO RENDERER
      this.stereoRenderer = new StereoEffect(this.normalRenderer);
      this.stereoRenderer.eyeSeparation = 0;
      this.stereoRenderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );

      // SETTINGS
      this.setMode(PANOFORM.modes.NORMAL);
      this.setControls(PANOFORM.controls.ORBIT);

      // CREATE EVENT LISTENERS
      window.addEventListener("resize", () => this.onWindowResize());
      window.addEventListener("orientationchange", () =>
        this.onOrientationChange()
      );
      window.addEventListener("fullscreenchange", () =>
        this.onFullscreenChange()
      );

      // ATTACH RENDERER TO CONTAINER
      this.container.appendChild(this.normalRenderer.domElement);

      // CREATE CONTROLBAR
      // this.controlBar = new ControlBar(this);

      // APPLY CSS CLASSES
      // this.container.classList.add(PANOFORM.classes.CONTAINER);
      // this.normalRenderer.domElement.classList.add(PANOFORM.classes.RENDERER);

      // START RENDERING
      this.normalRenderer.setAnimationLoop(() => {
        this.controls.update();
        this.render(this.mode);
      });
    },
    render: function(mode) {
      this.mode == PANOFORM.modes.STEREO
        ? this.stereoRenderer.render(this.scene, this.camera)
        : this.normalRenderer.render(this.scene, this.camera);
    },

    /*
    EVENT HANDLERS
    */

    onWindowResize: function() {
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.normalRenderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
    },
    onOrientationChange: function() {
      const createOrientationPromise = () => {
        const timeout = 500;
        return new window.Promise(function(resolve) {
          const go = (i, height0) => {
            window.innerHeight != height0 || i >= timeout
              ? resolve()
              : window.requestAnimationFrame(() => go(i + 1, height0));
          };
          go(0, window.innerHeight);
        });
      };

      createOrientationPromise().then(() => {
        window.scrollTo(0, 1);
        this.onWindowResize();
      });
    },
    onFullscreenChange: function() {
      let fullscreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        document.webkitFullscreenElement;
      fullscreen ? (this.isFullscreen = true) : (this.isFullscreen = false);
    },

    /*
    SETTING METHODS
    */

    setMode: function(value) {
      value == PANOFORM.modes.STEREO
        ? (this.mode = PANOFORM.modes.STEREO)
        : (this.mode = PANOFORM.modes.NORMAL);

      this.onWindowResize();
    },
    setControls: function(value) {
      this.controls ? this.controls.dispose() : undefined;

      switch (value) {
        case PANOFORM.modes.DEVICEORIENTATION:
          this.controls = new DeviceOrientationControls(
            this.camera,
            this.container
          );
          this.controls.alphaOffset = 1.5;
          this.controls.connect();
          this.controls.update();
          this.controls.update();
          break;
        default:
          this.controls = new OrbitControls(
            this.camera,
            this.normalRenderer.domElement
          );
          this.controls.enableZoom = false;
          this.controls.rotateSpeed = -0.05;
          this.controls.enableDamping = true;
          this.controls.dampingFactor = 0.1;
          this.controls.update();
          break;
      }
    },

    /*
    SCENE CONTROL METHODS
    */

    clearScene: function() {
      this.scene.children.forEach(c =>
        this.scene.remove(this.scene.getObjectById(c.id))
      );
    },
    loadImage: function(path) {
      if (path != null) {
        this.clearScene();
  
        const loader = new THREE.TextureLoader();
        loader.load(path, texture => {
          const sphereGeometry = new THREE.SphereGeometry(100, 60, 40);
          const sphereMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
          });
  
          sphereGeometry.scale(-1, 1, 1);
          const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
          // mesh.name = name;
          this.scene.add(mesh);
          mesh.position.set(0, 0, 0);
          mesh.rotation.set(0, -1.5, 0);
        });
      }
      else {
        return;
      }
    }
  },
  mounted() {
    this.init();
    this.loadImage(this.image);
  }
};
</script>

<style>
/* #viewer-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
} */

#viewer-container {
  width: 100vw;
  height: 100vh;
}
</style>
