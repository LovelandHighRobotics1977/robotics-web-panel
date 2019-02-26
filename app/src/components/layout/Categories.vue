<template>
  <div class="categories">
    <center>
      <router-link
        v-for="category of categories"
        v-bind:key="category"
        :class="'category ' +  category"
        replace
        :to="'/' + category"
      >{{ category }}</router-link>
    </center>
  </div>
</template>

<script>
export default {
  name: "categories",
  props: ["categories"]
};
</script>

<style lang="less">
@import "./../../stylesheets/colors.less";

@cat-height: 2.7rem;
.category {
  @cat-pad-side: 3.2rem;
  @cat-pad-lat: 0.9rem;
  @cat-marg: 0.7rem;
  font-size: 1.2rem;
  font-family: "Cuprum";
  display: inline-flex;
  padding: @cat-pad-lat @cat-pad-side @cat-pad-lat @cat-pad-side;
  margin-left: @cat-marg;
  vertical-align: middle;
  background: @gray5;
  border-radius: 0.4rem;
  user-select: none;
  &:hover {
    @cat-pad-side: 3.15rem;
    @cat-pad-lat: 0.85rem;
    padding-left: @cat-pad-side;
    padding-right: @cat-pad-side;
    padding-top: @cat-pad-lat;
    padding-bottom: @cat-pad-lat;
    background: @gray7;
    transition: 80ms;
  }
}
</style>

