<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll"
      :probe-type="3"
      @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-goods-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-more-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :comment="comment" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="topClick" v-show="isShowBack" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailMoreInfo from "./childComps/DetailMoreInfo";
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList"
import BackTop from "components/content/backTop/BackTop"
import Toast from "components/common/toast/Toast"

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";

import {debounce} from "common/utils"
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailMoreInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{},
      comment:{},
      recommend:[],
      themeTopYs:[],
      getThemeTopYs:null,
      currentIndex:0,
      isShowBack:false,
      // show:false,
      // message:''
    };
  },
  created() {
    //1.保存获取到的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求数据
    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
      //3.获取商品信息
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      // console.log(this.goods);
      //4.获取店铺信息
      this.shop = new Shop(res.result.shopInfo);
      //5.获取商品详细信息
      this.detailInfo = res.result.detailInfo;
      //6.获取商品参数信息
      this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
      //7.获取商品评论信息
      if(res.result.rate.list){
        this.comment = res.result.rate.list[0];
      }

      //不能获取正确的offsetTop，因为图片高度没有加载完
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
      // })
    });
    //3.获取推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommend = res.data.list
    })
    //4.获取navbar主题的对应高度
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    },100)
  },
  mounted(){
    // this.getThemeTopYs = debounce(() => {
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   this.themeTopYs.push(Number.MAX_VALUE);
    //   console.log(this.themeTopYs);
    // },100)
  },
  updated(){
    // this.getThemeTopYs()
  },
  methods: {
    detailImageLoad(){
      // console.log('----------');
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopYs()

    },
    //点击navbar到指定的位置
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]);
    },

    contentScroll(position){
      // console.log(position)
      //滚动到指定位置，navbar对应主题的变化
      for(let i=0; i < this.themeTopYs.length-1; i++){
        if(this.currentIndex !== i && (-position.y) >= this.themeTopYs[i] && (-position.y) < this.themeTopYs[i+1]){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //回到顶部按钮显示
      this.isShowBack = position.y < -1000;
    },
    //点击回到顶部
    topClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    addToCart(){
      //1.获取要放入购物车中的商品数据
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      //2.添加到store中
      this.$store.dispatch('addCart',product).then(res => {
       // 普通方式封装toast
       // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },1500)

        // 插件方式封装toast
        this.$toast.show(res,2000)
      })
    }
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* position:absolute; */
  height: calc(100% - 44px - 49px);
  /* top:44px; */
}
</style>
