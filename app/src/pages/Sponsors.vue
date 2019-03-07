<template>
  <div class="content list">
    <title>LHR - Sponsors</title>
    <div class="edit_overlay" v-if="inputting">
        <div class="listing">
          <desk-row>
            <desk-cell v-if="edit.logo != 'none'">
              <img :src="edit.logo" class="logo" :style="edit.logo_sizing">
            </desk-cell>
            <desk-cell class="detail">
              <h2>{{ edit.title }}</h2>
              <p v-for="desc of edit.description" v-bind:key="desc">{{ desc }}</p>
              <p>{{ edit.url }}</p>
            </desk-cell>
          </desk-row>
        </div>
        <br>
        <center>
          <input
            type="text"
            ref="edit_logo"
            class="edit_input"
            placeholder="logo"
            v-on:input="update('logo')"
          ><br>
          <input
            type="text"
            ref="edit_title"
            class="edit_input"
            placeholder="title"
            v-on:input="update('title')"
          ><br>
          <div v-for="(desc, index) of edit.description" v-bind:key="desc"><input
            type="text"
            ref="edit_desc"
            class="edit_input"
            placeholder="description"
            v-on:input="update('desc', index)"
            :value="desc"
          ><i class="fas fa-times exit" v-on:click="remove_desc(index)"></i></div>
          <br>
          <input
            type="text"
            ref="edit_url"
            class="edit_input"
            placeholder="url"
            v-on:input="update('url')"
          >
          <br>
          <button class="add_button" v-on:click="add_desc()">Add Description</button>
          <br>
        </center>
    </div>
    <list :list="sponsors"/>
    <center>
      <button class="add_button" v-on:click="new_sponsor">Sponsor</button>
    </center>
  </div>
</template>

<script>
import List from "./../components/List.vue";
import DeskRow from "./../components/desk/Row.vue";
import DeskCell from "./../components/desk/Cell.vue";
import sponsors_data from "./../data/sponsors.js";
import request from "request";

export default {
  name: "contact",
  data() {
    return sponsors_data;
  },
  components: {
    List,
    DeskRow,
    DeskCell
  },
  mounted() {
    request(
      {
        method: "GET",
        url:
          "http://raw.githack.com/LovelandHighRobotics1977/robotics-web/master/src/data/sponsors.json",
        encoding: null // <- this one is important !
      },
      (err, res, dat) => {
        let data = JSON.parse(dat);
        console.log("Error: " + err);
        this.$data.sponsors = data.sponsors;
      }
    );
  },
  methods: {
    new_sponsor() {
      this.$data.edit = {
        logo: "",
        logo_sizing: "",
        url: "",
        title: "",
        description: [""]
      }
      this.$nextTick(() => this.$data.inputting = true);
    },
    edit_listing(index) {
      this.$data.edit = Object.assign({}, this.$data.sponsors[index]);
      this.$data.edit_original = Object.assign({}, this.$data.edit);
      this.$nextTick(() => this.$data.inputting = true);
    },
    remove_listing(index) {
      this.$delete(this.$data.sponsors, index);
    },
    update(src, index = 0) {
      if (src = "logo") if (this.$refs.edit_logo.value != "") this.$data.edit.logo = this.$refs.edit_logo.value; else this.$data.edit.logo = this.$data.edit_original.logo;
      if (src = "title") if (this.$refs.edit_title.value != "") this.$data.edit.title = this.$refs.edit_title.value; else this.$data.edit.title = this.$data.edit_original.title;
      if (src = "desc") if (this.$refs.edit_desc[index].value != "") {
        this.$data.edit.description[index] = this.$refs.edit_desc[index].value;
        this.$forceUpdate();
        this.$nextTick(() => this.$refs.edit_desc[index].focus());
      } else this.$data.edit.description[index] = this.$data.edit_original.description[index];
      if (src = "url") if (this.$refs.edit_url.value != "") this.$data.edit.url = this.$refs.edit_url.value; else this.$data.edit.url = this.$data.edit_original.url;
    },
    remove_desc(index) {
      this.$delete(this.$data.edit.description, index);
    },
    add_desc() {
      this.$data.edit.description.push("");
    }
  }
};
</script>

<style lang="less" scoped>
@import "./../stylesheets/colors.less";

.edit_overlay {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  margin-top: -5.2rem;
  margin-left: -0.5rem;
  padding: 3rem;
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

.logo {
  height: 6rem;
  padding-left: 0.7rem;
}

.detail {
  vertical-align: top;
  padding-top: 0.5rem !important;
  padding-left: 1rem;
  padding-right: 2rem;
}

.listing {
  background: @gray6;
  border-radius: 0.8rem;
  padding: 1.2rem 0rem 1.2rem 0.5rem;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  margin-top: none;
  float: left;
  width: auto;
  & p {
    font-size: x-large;
  }
}
</style>
