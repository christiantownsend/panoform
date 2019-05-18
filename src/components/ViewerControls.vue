<template>
    <div class="panoform-controls">
        <div class="panoform-controlbar top">
            <button v-on:click.prevent="closeViewer">Close</button>
        </div>
        <div class="panoform-controlbar">
            <button v-on:click.prevent="loadImage">Test</button>
            <button v-on:click.prevent="toggleStereo">Toggle Stereo</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ViewerControls",
    data() {
        return {
            image: require('@/assets/pic.png')
        }
    },
    methods: {
        loadImage() {
            this.$store.commit('setCurrentImage', this.image);
            this.$store.dispatch('addRecentImage', this.image);
        },
        closeViewer() {
            this.$store.commit('setViewing', false);
        },
        toggleStereo() {
            let newVal = !this.$store.state.viewer.stereo;

            this.$store.commit('setControls', newVal ? 1 : 0);
            this.$store.commit('setStereo', newVal);
            this.$store.commit('setFullscreen', newVal);
        }
    }
}
</script>
