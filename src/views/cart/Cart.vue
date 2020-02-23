<template>
  <div class="cart">
    <cart-nav-bar />
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import CartNavBar from "./childComps/CartNavBar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

// import {mapGetters} from "vuex"

export default {
  name: "Cart",
  components:{
    CartNavBar,
    CartList,
    CartBottomBar
  },
  data() {
    return {};
  },
  // computed:{
  //   ...mapGetters(['getCartList'])
  // },
  methods: {}
};
</script>

<style scoped>
.cart{
  height:100vh;
}
</style>
