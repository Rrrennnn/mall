<template>
  <div class="goods" @click="itemClick">
    <img :src="getImages" @load="imageLoad" alt />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed:{
    getImages(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad(){
      //事件总线
      this.$bus.$emit("itemImageLoad")
    },
    itemClick(){

      this.$router.push('/detail/'+this.goodsItem.iid)

    }
  }
};
</script>

<style scoped>
.goods {
  /* flex:1; */
  padding-bottom: 20px;
  position: relative;
  width:48%;
  margin:0 1%;
}
.goods img {
  width: 100%;
  border-radius: 1%;
}
.goods-info {
  font-size: 12px;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
