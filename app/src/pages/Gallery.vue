<template>
  <div class="content list">
    <title>LHR - Gallery</title>
    <center>
      <div class="infocard" v-for="picture of pictures" v-bind:key="picture">
        <img :src="picture" class="gimg">
      </div>
    </center>
  </div>
</template>

<script>
import gallery_data from "./../data/gallery.js";
import request from "request";

export default {
  name: "gallery",
  data() {
    return gallery_data;
  },
  mounted() {
    request(
      {
        method: "GET",
        url: "http://raw.githack.com/LovelandHighRobotics1977/robotics-web/master/src/data/gallery.json",
        encoding: null // <- this one is important !
      },
      (err, res, dat) => {
        let data = JSON.parse(dat);
        console.log("Error: " + err);
        this.$data.pictures = data.pictures;
      }
    )
  }
};
</script>

<style lang="less">
.gimg {
  @gimg-pad: 0.5rem;
  height: 20rem;
  padding-top: @gimg-pad;
  padding-bottom: @gimg-pad;
  padding-right: @gimg-pad;
  padding-left: @gimg-pad;
}
</style>
