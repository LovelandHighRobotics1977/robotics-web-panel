<template>
  <div class="content list">
    <title>LHR - Gallery</title>
    <div class="add_overlay" v-if="inputting">
      <center>
        <img :src="picture" class="gimg">
        <input type="text" ref="add_input" class="add_input" v-on:input="update_image()" v-on:keyup="add_image">
      </center>
    </div>
    <center>
      <div class="infocard" v-for="(picture, index) of pictures" v-bind:key="picture">
        <img :src="picture" class="gimg">
        <i class="fas fa-times exit" v-on:click="remove_image(index)"></i>
      </div>
    </center>
    <center><button class="add_button" v-on:click="enter_image()">Add Image</button></center>
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
    add_image(e) {
      if (e.keyCode === 13) {
        this.$data.pictures.push(this.$data.picture);
        this.$data.inputting = false;
      }
    },
    enter_image() {
      this.$data.inputting = true;
      this.$nextTick(() => this.$refs.add_input.focus());
    },
    update_image(e) {
      console.log(e);
      this.$data.picture = document.body.getElementsByClassName("add_input")[0].value;
    }
  }
};
</script>

<style lang="less">
@import "./../stylesheets/colors.less";

.content.list {
  display: grid;
}

.gimg {
  @gimg-pad: 0.5rem;
  height: 20rem;
  padding-top: @gimg-pad;
  padding-bottom: @gimg-pad;
  padding-right: @gimg-pad;
  padding-left: @gimg-pad;
}

.infocard {
  .exit {
    display: none;
  }
  &:hover {
    .gimg {
      opacity: .5;
      background: rgba(0,0,0,.6);
    }
    .exit {
      display: block;
      position: absolute;
    }
  }
}

.add,.exit {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}

.exit {
  transform: translate(10rem,-10rem);
}

.add_overlay {
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.6);
  position: fixed;
  margin-top: -5.2rem;
  margin-left: -.5rem;
}

.add_input {
  display: -webkit-box;
}

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
