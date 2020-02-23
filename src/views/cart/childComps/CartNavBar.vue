<template>
  <div class="cart-nav-bar">
    <nav-bar>
      <div slot="center">购物车({{getCartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./CartList"

import {mapGetters} from "vuex"

export default {
  name: "CartNavBar",
  components: {
    NavBar,
    CartList
  },
  data() {
    return {};
  },
  computed:{
    ...mapGetters(['getCartLength'])
  },
  methods: {}
};
</script>

<style scoped>
.cart-nav-bar{
  background-color:var(--color-tint);
  color:#fff;
  /* z-index:10; */
}
</style>
