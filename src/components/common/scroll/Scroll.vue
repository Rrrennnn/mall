<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Scroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    };
  },
  mounted() {
    //1.创建scroll对象
    this.scroll = new Scroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    });
   //2.监听滚动的位置
   this.scroll.on('scroll',(position) =>{
     this.$emit('scroll',position)
   }),
   //3.上拉加载更多
   this.scroll.on('pullingUp',() => {
     this.$emit('pullingUp')
   })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    // refresh(){
    //   this.srcoll && this.scroll.refresh()
    // }
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped>
</style>
