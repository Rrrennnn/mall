<template>
  <div class="detail-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="detail-desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="detail-key">{{detailInfo.detailImage[0].key}}</div>
    <div
      class="detail-list"
      v-for="(item,index) in detailInfo.detailImage[0].list"
      :key="index"
    >
      <img :src="item" alt @load="imgLoad"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailMoreInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  methods: {
    imgLoad() {
      //判断，所有图片加载完了，进行一次回调就行了
      if (++this.counter === this.imagesLength) {
        this.$emit('detailImageLoad');

      }

    }
  },
  watch:{
    detailInfo(){
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
};
</script>

<style scoped>
.detail-info {
  padding: 20px 0;
}
.info-desc {
  padding: 0 10px;
}
.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}
.detail-desc {
  padding: 20px 20px;
  font-size: 14px;
}
.detail-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
  text-align: center;
}
.detail-list img {
  width: 100%;
}
</style>
