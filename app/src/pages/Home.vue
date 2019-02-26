<template>
  <div class="content">
    <title>Loveland High School Robotics</title>
    <div class="short-syn">
      <center>
        <h3>
          <span v-for="(line, index) of synopsis" v-bind:key="line">
            {{ line }}
            <br v-if="index != synopsis.length-1">
          </span>
        </h3>
      </center>
    </div>
    <div class="video-container">
      <center>
        <div class="video">
          <iframe
            width="100%"
            height="100%"
            :src="
              'https://www.youtube-nocookie.com/embed/' 
              + videoid 
              + '?autoplay=0&enablejsapi=1&modestbranding=1&showinfo=0&theme=light&controls=0&disablekb=1'"
            frameborder="0"
          ></iframe>
        </div>
      </center>
    </div>
    <div class="home-desc">
      <center>
        <p>{{ home_desc }}</p>
      </center>
    </div>

    <div class="home-desc quotes">
      <center>
        <h2>Member Quotes</h2>
      </center>
      <center v-for="quote of quotes" v-bind:key="quote">
        <p class="quote">
          "{{ quote.text }}"
          <br>
          - {{ quote.author.title }}, {{ quote.author.name }} ({{ quote.author.grad }} grad)
        </p>
      </center>
    </div>
  </div>
</template>

<script>
import home_data from "./../data/home.js";
import request from "request";

export default {
  name: "home",
  data() {
    return home_data;
  },
  mounted() {
    request(
      {
        method: "GET",
        url: "https://raw.githack.com/LovelandHighRobotics1977/robotics-web/master/src/data/home.json",
        encoding: null // <- this one is important !
      },
      (err, res, dat) => {
        let data = JSON.parse(dat);
        console.log("Error: " + err);
        this.$data.synopsis = data.synopsis;
        this.$data.videoid = data.videoid;
        this.$data.home_desc = data.home_desc;
        this.$data.quotes = data.quotes;
      }
    )
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/colors.less";

.video-container {
  background: @gray6;
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-radius: 0.5rem;
}

.video {
  width: 40rem;
  height: 22.5rem;
  transition: 500ms;
  &:hover {
    transition: 500ms;
    width: 45rem;
    height: 25.4rem;
    box-shadow: -0.3rem 0.3rem 0.1rem @gray4;
  }
}

.home-desc {
  background: @gray6;
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-bottom: 0.8rem;
  border-radius: 0.5rem;
}

.short-syn {
  background: @gray7;
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-radius: 0.5rem;
}

.quotes {
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
}

.quote {
  width: 80%;
}
</style>

