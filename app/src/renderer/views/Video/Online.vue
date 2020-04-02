<template>
  <div style="height:100%">
    <iframe :src="IFrame" id="thisframe" ></iframe>
  </div>
</template>

<script>
export default {
  name: "redirect",
  data() {
    return {
      IFrame: "http://localhost:8080/#/"
    };
  },
  methods: {
  },
  mounted() {

  }
};
</script>
<style scoped>
#thisframe {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  /* vertical-align: middle; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>