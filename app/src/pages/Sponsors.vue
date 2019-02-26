<template>
  <div class="content list">
    <title>LHR - Sponsors</title>
    <list :list="sponsors"/>
  </div>
</template>

<script>
import List from "./../components/List.vue";
import sponsors_data from "./../data/sponsors.js";
import request from "request";

export default {
  name: "contact",
  data() {
    return sponsors_data;
  },
  components: {
    List
  },
  mounted() {
    request(
      {
        method: "GET",
        url: "http://raw.githack.com/LovelandHighRobotics1977/robotics-web/master/src/data/sponsors.json",
        encoding: null // <- this one is important !
      },
      (err, res, dat) => {
        let data = JSON.parse(dat);
        console.log("Error: " + err);
        this.$data.sponsors = data.sponsors;
      }
    )
  }
};
</script>

<style>
</style>
