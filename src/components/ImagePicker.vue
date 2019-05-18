<template>
  <form>
    <label for="filepicker">Choose an image</label>
    <input
      id="filepicker"
      type="file"
      accept="image/*"
      v-on:change="handleFileSelect"
    />
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
