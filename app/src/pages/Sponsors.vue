<template>
  <div class="content list">
    <title>LHR - Sponsors</title>
    <list :list="sponsors"/>
    <center><button class="add_button" v-on:click="new_sponsor">Sponsor</button></center>
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
  },
  methods: {
    new_sponsor() {

    }
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/colors.less";

.add_button {
  margin-top: 2rem;
  margin-bottom: 5rem;
  width: 7rem;
  height: 2rem;
  border: none;
  background: @accent-primary;
  color: @white;
  &:hover {
    cursor: pointer;
    background: @accent-secondary;
  }
}
</style>
