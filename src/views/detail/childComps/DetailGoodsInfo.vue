<template>
<!-- 判断goods对象是不是空对象，如果是空的，下面的东西全部都不渲染了 -->
  <div class="info-base" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.info-base {
  margin-top: 5px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 10px;
}
.info-price .new-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .old-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}

.info-price .discount {
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 5px;

  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -8px;
}
.info-other {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.info-other-item {
  flex: 1;
}
.info-service {
  /* margin-top:10px; */
  line-height: 60px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
/* .info-service-item {
  flex: 1;
} */
.info-service-item img {
  width: 13px;
  height: 13px;
  margin-right: 3px;
  /* position: relative; */
}
.info-servie-item span {
  font-size: 13px;
  color: #333;
}
</style>
