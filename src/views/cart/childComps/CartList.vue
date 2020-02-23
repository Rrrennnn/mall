<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in getCartList" :key="index" :itemInfo="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getCartList'])
  }
};
</script>

<style scoped>
.cart-list{
  height:calc(100% - 44px - 49px - 40px);
  width:100%;
}
.content{
  height:100%;
}
</style>
