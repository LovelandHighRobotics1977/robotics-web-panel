<template>
  <div class="content list">
    <title>LHR - Gallery</title>
    <center>
      <div class="infocard" v-for="(picture, index) of pictures" v-bind:key="picture">
        <img :src="picture" class="gimg">
        <i class="fas fa-times exit" v-on:click="remove_image(index)"></i>
      </div>
      <div class="infocard">
        <img :src="picture" class="gimg">
        <input type="text" class="add" v-on:input="update_image()">
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
  },
  methods: {
    remove_image(index) {
      this.$delete(this.$data.pictures, index)
      //this.$data.pictures = this.$data.pictures.slice(index)
    },
    add_image() {
      this.$data.pictures.push(this.$data.picture)
    },
    update_image() {
      this.$data.picture = document.body.getElementsByClassName("add")[0].value;
    }
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
  &:hover {
    opacity: .5;
    background: rgba(0,0,0,.3);
  }
}

.exit {
  transform: translate(-10rem,-10rem);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
