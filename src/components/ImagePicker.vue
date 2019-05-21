<template>
  <form>
    <input id="filepicker" type="file" accept="image/*" v-on:change="handleFileSelect">
    <label for="filepicker">Choose an image</label>
  </form>
</template>

<script>
export default {
  name: "ImagePicker",
  methods: {
    handleFileSelect(e) {
      const file = e.target.files[0];
      const width = 2048 * 2;
      const height = 1024 * 2;

      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const elem = document.createElement("canvas");
          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext("2d");
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, width, height);
          // ctx.drawImage(img, 0, 0, img.width, img.height);

          const image = ctx.canvas.toDataURL("image/jpeg");

          this.$store.commit("setCurrentImage", image);
          this.$store.dispatch("addRecentImage", image);
          this.$store.commit("setViewing", true);
        };

        reader.onerror = error => console.log(error);
      };

      reader.readAsDataURL(file);

      e.target.value = null;
    }
  }
};
</script>

<style lang="scss" scoped>
#filepicker {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

#filepicker + label {
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  font-weight: 600;
  background: #ee3933;
  border-radius: 0.5rem;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}

#filepicker:focus + label {
	outline: 1px dotted #000;
	outline: -webkit-focus-ring-color auto 5px;
}

#filepicker:focus + label,
#filepicker + label:hover {
  background: darken(#ee3933, 10%);
}
</style>
