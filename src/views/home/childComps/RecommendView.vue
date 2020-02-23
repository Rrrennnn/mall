<template>
<div class="recommend">
  <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div class="title">{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
   export default{
    name : 'RecommendView',
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data () {
      return {

      };
    },
    methods : { }
  }
</script>

<style scoped>
.recommend{
  display: flex;
  width:100%;
  text-align: center;
  font-size:12px;
  padding:10px 0 10px;
  border-bottom:8px solid #eee;
}
.recommend-item{
  flex:1;
}
.recommend-item img{
  width:70px;
  height:70px;
  margin-bottom:5px;
}

</style>
