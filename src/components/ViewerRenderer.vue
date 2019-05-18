<template>
  <div id="viewer-container" class="panoform-renderer"></div>
</template>

<script>
import * as THREE from "three";
import StereoEffect from "@twerkus/three-stereo-effect";
import DeviceOrientationControls from "three-device-orientation";
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
  name: "ViewerRenderer",
  data() {
    return {
      container: null,
      camera: null,
      controls: null,
      scene: null,
      normalRenderer: null,
      stereoRenderer: null,
      device: null
    };
  },
  computed: {
    currentImage() {
      return this.$store.state.viewer.currentImage;
    },
    isStereo() {
      return this.$store.state.viewer.stereo;
    },
    isFullscreen() {
      return this.$store.state.viewer.fullscreen;
    },
    storeControls() {
      return this.$store.state.viewer.controls;
    },
    webVRDevice() {
      return this.$store.state.viewer.webVRDevice;
    },
    isWebVR() {
      return this.$store.state.viewer.webVR;
    }
  },
  watch: {
    currentImage(newVal) {
      this.loadImage(newVal);
    },
    isStereo(newVal) {
      let newMode;
      newVal
        ? (newMode = PANOFORM.modes.STEREO)
        : (newMode = PANOFORM.modes.NORMAL);
      this.setMode(newMode);
    },
    isFullscreen(newVal) {
      this.setFullscreen(newVal);
    },
    storeControls(newVal) {
      this.setControls(newVal);
    },
    webVRDevice(device) {
      this.device = device;
      this.normalRenderer.vr.setDevice(this.device);
    },
    isWebVR(newVal) {
      if (newVal) {
        this.device.requestPresent([
          {
            source: /*document.getElementById("panoform-viewer")*/ this
              .container
          }
        ]);
        this.normalRenderer.vr.enabled = true;
      } else {
        this.device.exitPresent();
        this.normalRenderer.vr.enabled = false;
      }
    }
  },
  methods: {
    init() {
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

      // START RENDERING
      this.normalRenderer.setAnimationLoop(() => {
        this.controls.update();
        this.render(this.mode);
      });
    },
    render(mode) {
      mode == PANOFORM.modes.STEREO
        ? this.stereoRenderer.render(this.scene, this.camera)
        : this.normalRenderer.render(this.scene, this.camera);
    },

    /*
    EVENT HANDLERS
    */

    onWindowResize() {
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.normalRenderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
    },
    onOrientationChange() {
      const createOrientationPromise = () => {
        const timeout = 240;
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
        // window.scrollTo(0, 1);
        // console.log('ORIENTATION CHANGED')
        // console.log(screen.orientation)
        // if (screen.orientation.type == 'landscape-primary' || screen.orientation.type == 'landscape-secondary') {
        //   this.$store.commit('setStereo', true);
        // }
        // else {
        //   this.$store.commit('setStereo', false);
        // }
        this.onWindowResize();
      });
    },
    onFullscreenChange() {
      let fullscreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        document.webkitFullscreenElement;

      this.$store.commit("setFullscreen", fullscreen != null);
    },

    /*
    SETTING METHODS
    */

    setMode(value) {
      value == PANOFORM.modes.STEREO
        ? (this.mode = PANOFORM.modes.STEREO)
        : (this.mode = PANOFORM.modes.NORMAL);

      this.onWindowResize();
    },
    setControls(value) {
      this.controls ? this.controls.dispose() : undefined;

      switch (value) {
        case 1:
          console.log("setting deviceorientation controls");
          this.controls = new DeviceOrientationControls(
            this.camera,
            this.container
          );
          this.controls.alphaOffset = 1.5;
          this.controls.connect();
          this.controls.update();
          break;
        default:
          console.log("setting orbit controls");
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
    setFullscreen(value) {
      value ? enterFullscreen() : exitFullscreen();

      function enterFullscreen() {
        var el = document.getElementById("panoform-viewer");
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullScreen) {
          el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      }

      function exitFullscreen() {
        let fullscreen =
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ||
          document.webkitFullscreenElement;

        if (fullscreen != null) {
          document.exitFullscreen && document.exitFullscreen();
          document.msExitFullscreen && document.msExitFullscreen();
          document.mozCancelFullScreen && document.mozCancelFullScreen();
          document.webkitExitFullscreen && document.webkitExitFullscreen();
        }
      }
    },

    /*
    SCENE CONTROL METHODS
    */

    clearScene() {
      this.scene.children.forEach(c =>
        this.scene.remove(this.scene.getObjectById(c.id))
      );
    },
    loadImage(path) {
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
          this.scene.add(mesh);
          mesh.position.set(0, 0, 0);
          mesh.rotation.set(0, -1.5, 0);
        });
      } else {
        return;
      }
    }
  },
  mounted() {
    this.init();
    this.loadImage(this.$store.state.viewer.currentImage);
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
</style>
