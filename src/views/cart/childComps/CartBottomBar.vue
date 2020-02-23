<template>
  <div class="bottom-bar">
    <div class="check">
      <check-button class="check-button" :is-checked="selectAll" @click.native="allClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计:￥{{totalPrice}}</div>
    <div class="buy">去计算({{cartCount}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data() {
    return {};
  },
  computed:{
    totalPrice(){
      return this.$store.state.cartList.filter(item => item.checked).reduce((previousValue,item) => {
        return previousValue + item.price * item.count
      },0).toFixed(2)
    },
    cartCount(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    selectAll(){
      if(this.$store.state.cartList.length === 0){
        return false
      }
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    allClick(){
      if(this.selectAll){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar{
  height:40px;
  position:relative;
  display:flex;
  align-items: center;
  justify-content: center;
  /* bottom:49px; */
  background-color:#eee;
}
.check{
  display:flex;
  width:60px;
  /* line-height:40px; */

}
.check-button{
  line-height:20px;
  padding:0 5px;
}
.total-price{
  flex:1;
  text-align: center;
}
.buy{
  display:flex;
  width:90px;

}
</style>
