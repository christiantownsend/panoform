import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let db;

let store = new Vuex.Store({
  state: {
    viewing: false,
    viewer: {
      fullscreen: false,
      stereo: false,
      controls: 0,
      currentImage: null
    },
    recentImages: [

    ],

  },
  mutations: {
    setViewing(state, value) {
      state.viewing = value;
    },
    clearRecentImages(state) {
      state.recentImages = [];
    },
    setRecentImages(state, images) {
      state.recentImages = images;
    },
    addRecentImage(state, image) {
      state.recentImages.push(image);
    },
    setCurrentImage(state, image) {
      state.viewer.currentImage = image;
    },
    setStereo(state, value) {
      state.viewer.stereo = value;
    },
    setFullscreen(state, value) {
      state.viewer.fullscreen = value;
    },
    setControls(state, value) {
      state.viewer.controls = value;
    }
  },
  actions: {
    clearRecentImages({ commit }) {
      let objStore = db.transaction(['images'], 'readwrite').objectStore('images');

      let request = objStore.clear();

      request.onerror = () => {
        console.log('Error clearing database');
      }

      request.onsuccess = () => {
        commit('clearRecentImages');
      }
    },
    getRecentImages({ commit }) {
      let objStore = db.transaction(['images']).objectStore('images');
      let request = objStore.index('created').getAll();

      request.onerror = () => {
        console.log('Error getting images');
      }

      request.onsuccess = () => {
        console.log(request.result.reverse());
        commit('setRecentImages', request.result.reverse());
      }
    },
    addRecentImage({ commit }, data) {
      let image = {
        created: new Date().toJSON().slice(0, 19).replace('T', ' '),
        data: data
      }

      let objStore = db.transaction(['images'], 'readwrite').objectStore('images');
      let request = objStore.add(image);

      request.onerror = () => {
        console.log('Error adding image');
      }

      request.onsuccess = () => {
        commit('addRecentImage', image)
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (!'indexedDB' in window) return;

  const dbName = 'panoformDB';
  const dbVersion = 1;
  let request = window.indexedDB.open(dbName, dbVersion)

  request.onerror = e => {
    console.log(e);
  }

  request.onsuccess = e => {
    console.log('Database created');
    db = e.target.result;
    store.dispatch('getRecentImages');
  }

  request.onupgradeneeded = e => {
    let db = e.target.result;
    let objStore = db.createObjectStore('images', { keyPath: 'key', autoIncrement: true });
    objStore.createIndex('created', 'created', { unique: false })
    objStore.createIndex('data', 'data', { unique: true })
  }
})

export default store;