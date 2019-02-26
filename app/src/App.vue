<template>
  <div id="app">
    <div>
      <center>
        <router-link replace to="/Home">
          <img src="./assets/images/banner.svg" class="banner">
        </router-link>
      </center>
    </div>
    <categories :categories="categories"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Categories from "./components/layout/Categories.vue";

export default {
  name: "robotics-web",
  components: {
    Categories
  },
  data() {
    return {
      categories: ["Home", "Gallery", "Sponsors", "Links", "Contact"]
    };
  }
};
</script>

<style lang="less">
@import "./stylesheets/colors.less";

body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  color: @white;
  font-family: Roboto;
  background: url("./assets/ig/1.png") no-repeat left top @background-primary;
  background-size: cover;
}

h2 {
  font-family: "Cuprum";
  font-weight: normal;
  font-size: 1.7rem;
}

h3 {
  font-weight: normal;
}

header {
  height: 4rem;
  font-size: 4rem;
  padding-bottom: 0.7rem;
}

.categories {
  padding: 0.5rem 0 0.5rem 0;
  background: @gray8;
  border-radius: 0.5rem;
  user-select: none;
}

.banner {
  width: 40%;
}

a {
  text-decoration: none;
  color: @white;
}

::-webkit-scrollbar {
  width: 0.4rem;
  height: 0.6rem;
}

::-webkit-scrollbar-track {
  background: none;
  border: none;
  &:hover {
    background: @scroll-shade;
    border-radius: 0.3rem;
    transition: 500ms;
  }
}

::-webkit-scrollbar-thumb {
  background: @accent-primary;
  border-radius: 0.3rem;
  &:hover {
    background: @accent-secondary;
    transition: 700ms;
  }
}

::-webkit-scrollbar-corner {
  background: transparent;
}

center {
  vertical-align: -webkit-baseline-middle;
}

.content {
  overflow: hidden;
}

.infocard {
  background: @gray5;
  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem .5rem 0.5rem;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  margin-top: none;
  float: left;
  &.link {
    width: 100%;
  }
  & > p {
    font-size: x-large;
  }
}

.linktext {
  display: inline-block;
  padding: 0.7rem 2rem 0 0.7rem;
  & > p {
    font-size: x-large;
  }
}

.list {
  margin-top: 0.5rem;
}
</style>
