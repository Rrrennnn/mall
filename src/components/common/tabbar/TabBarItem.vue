<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive">
      <slot name="icon"></slot>
    </div>
    <div class="item-active-icon" v-show="isActive">
      <slot name="active-icon"></slot>
    </div>
    <div class="item-text" :style="activeStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  //   data(){
  //       return{
  //           isActive:false
  //       }
  //   },
  props: {
    link: String
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: "#ff8198" } : {};
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.link)
    }
  }
};
</script>

<style>
#tab-bar-item {
  flex: 1;
}
.item-icon img,
.item-active-icon img {
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-top: 5px;
}
.item-text {
  font-size: 14px;
  margin-top: 2px;
  color: #333;
}
</style>
