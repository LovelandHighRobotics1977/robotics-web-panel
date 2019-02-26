<template>
  <div class="divTableCell">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "desk-cell"
};
</script>

<style lang="less">
.divTableCell {
  display: table-cell;
}
</style>
