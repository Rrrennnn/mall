<template>
  <nav-bar>
    <div slot="left" class="back" @click="goBack">
      <img src="~assets/img/common/back.svg" alt />
    </div>
    <div slot="center" class="title">
      <div
        class="title-item"
        v-for="(item,index) in titles"
        :key="index"
        :class="{active:index === currentIndex}"
        @click="titleClick(index)"
      >{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    goBack(){
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.back {
  margin-top: 2px;
}
.back img {
  width: 16px;
  height: 16px;
}
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>
