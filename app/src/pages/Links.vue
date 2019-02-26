<template>
  <div class="content list">
    <title>LHR - Links</title>
    <list :list="links"/>
  </div>
</template>

<script>
import List from "./../components/List.vue";
import links_data from "./../data/links.js";
import request from "request";

export default {
  name: "links",
  data() {
    return links_data;
  },
  components: {
    List
  },
  mounted() {
    request(
      {
        method: "GET",
        url: "https://raw.githack.com/LovelandHighRobotics1977/robotics-web/master/src/data/links.json",
        encoding: null // <- this one is important !
      },
      (err, res, dat) => {
        let data = JSON.parse(dat);
        console.log("Error: " + err);
        this.$data.links = data.links;
      }
    )
  }
};
</script>

<style lang="less">
</style>
