<template>
  <div class="content">
    <title>Loveland High School Robotics</title>
    <div class="short-syn">
      <center>
        <h3>
          <span v-for="(line, index) of synopsis" v-bind:key="line">
            <input type="text" class="input synopsis" :placeholder="line" v-on:input="update('synopsis')">
            <br v-if="index != synopsis.length-1">
          </span>
        </h3>
      </center>
    </div>
    <div class="video-container">
      <center>
        <input type="text" class="input videoid" :placeholder="original.videoid" v-on:input="update('videoid')">
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
        <textarea type="text" class="input home_desc" :placeholder="original.home_desc" v-on:input="update('home_desc')"></textarea>
      </center>
    </div>

    <div class="home-desc quotes">
      <center>
        <h2>Member Quotes</h2>
      </center>
      <center v-for="(quote, index) of quotes" v-bind:key="quote">
        <i class="fas fa-times exit" v-on:click="remove_quote(index)"></i>
        <p class="quote">
          "{{ quote.text }}"
          <br>
          - {{ quote.author.title }}, {{ quote.author.name }} ({{ quote.author.grad }} grad)
        </p>
      </center>
      <center>
        <i class="fas fa-plus add" v-on:click="add_quote()"></i>
        <p class="quote">
          <span class="up">"</span><textarea type="text" class="input quote_text" placeholder="(quote)" :style="'width: ' + widths.quote.text + 'ch;'" v-on:input="update('quote_text')"></textarea><span>"</span>
          <br>
          <span>-</span> <input type="text" class="input quote_author_title" placeholder="(Author Title)" :style="'width: ' + widths.quote.author.title + 'ch;'" v-on:input="update('quote_author_title')"><span>,</span> <input type="text" class="input quote_author_name" placeholder="(Author Name)" :style="'width: ' + widths.quote.author.name + 'ch;'" v-on:input="update('quote_author_name')"> <span>(</span><input type="text" class="input quote_author_grad" placeholder="(Author Graduation Year)" :style="'width: ' + widths.quote.author.grad + 'ch;'" v-on:input="update('quote_author_grad')"><span> grad)</span>
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
    this.$data.original = Object.assign({}, this.$data);

  },
  methods: {
    update(src) {
      let value = document.body.getElementsByClassName(src)[0].value;

      if (src == "videoid" && value.length == 11) this.$data.videoid = value; else this.$data.videoid = this.$data.original.videoid.slice();
      if (src == "quote_text") this.$data.widths.quote.text = value.length+9;
      if (src == "quote_text") this.$data.quote.text = value;
      if (src == "quote_author_title") this.$data.widths.quote.author.title = value.length+2;
      if (src == "quote_author_title") this.$data.quote.author.title = value;
      if (src == "quote_author_name") this.$data.widths.quote.author.name = value.length+2;
      if (src == "quote_author_name") this.$data.quote.author.name = value;
      if (src == "quote_author_grad") this.$data.widths.quote.author.grad = value.length+2;
      if (src == "quote_author_grad") this.$data.quote.author.grad = value;
      if (src == "discord") this.$data.submition.author.discordID = value;
      if (src == "source") {
        this.$data.submition.source.type = "github";
        this.$data.submition.source.user = "foo";
        this.$data.submition.source.id = value;
      }
      if (src == "notes") this.$data.submition.notes = value;
    },
    remove_quote(index) {
      this.$delete(this.$data.quotes, index)
      // this.$data.quotes = this.$data.quotes.slice(index);
    },
    add_quote() {
      console.log("Adding quote");
      this.$data.quotes.push(this.$data.quote);
      document.body.getElementsByClassName("quote_text")[0].value = ""
      document.body.getElementsByClassName("quote_author_title")[0].value = ""
      document.body.getElementsByClassName("quote_author_name")[0].value = ""
      document.body.getElementsByClassName("quote_author_grad")[0].value = ""
    }
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


.input {
  background: transparent;
  border: none;
  outline-color: transparent !important;
  color: @white;
  width: 100%;
  text-align: center;
  display: inline;
  :focus {
    outline-color: transparent !important;
  }
  &.home_desc {
    height: 4rem;
    resize: none;
  }
  &.quote_text,.quote_author_title,.quote_author_name,.quote_author_grad {
    width: fit-content;
  }
}

.up {
  vertical-align: top;
}

.exit {
  transform: translate(40vw,2.5rem);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}

.add {
  transform: translate(40vw,2.5rem);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>

