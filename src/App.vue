<template>
    <div>
        <v-header v-bind:seller="seller"></v-header>
        <div class="tab ">
            <div class="tab-item border-1px">
              <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
              <router-link to="/ratings">评价</router-link>
            </div>
            <div class="tab-item">
              <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <div class="content">
           <router-view :seller="seller"></router-view>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import header from './components/header/header.vue';
    import data from './common/json/data.json';
    import {urlParse} from './common/js/util';
    const ERR_OK = 0;
    export default {
        data() {
            return {
                seller:{
                    id:( () => {
                        let queryParam = urlParse();
                        return queryParam.id;
                    })()
                }
            }
        },
        components:{
            'v-header': header
        },
        created(){
           // this.seller = data.seller;
           // 使用Object.assign这个方法防止id这个自动添加的属性被删除
            this.seller = Object.assign({},this.seller,data.seller);
        }
    }
</script>
<style>
  @import "./common/stylus/font.styl";
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/index.styl";
  .tab
    width:100%
    height:40px
    display:flex
    line-height:40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      text-align:center
      &>a
        display:-moz-handler-blocked
        font-size:14px
        color:rgb(77,85,93)
        &.active
          color:rgb(240,20,20)
</style>
