<template>
  <div>
    <swiper v-if="banners.length">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad" alt />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
		  banners: {
		    type: Array,
        default(){
          return []
        }
      }
    },
  data() {
    return {
      isLoad:false
    };
  },
  methods: {
		  // stopTimer() {
		  //   this.$refs.swiper.stopTimer()
      // },
      // startTimer() {
		  //   if (this.$refs.swiper) {
      //     this.$refs.swiper.startTimer()
      //   }
      // }
      imageLoad(){
        if(!this.isLoad){
          this.$emit("swiperImageLoad")
          this.isLoad = true
        }

      }
    }
};
</script>

<style scoped>
</style>
