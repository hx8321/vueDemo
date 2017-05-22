<template>
    <div class="food" ref="foodWrapper" v-show="showFlag">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @click="hide">
                    <i class="iconfont icon-weibiaoti6-copy"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="ratings">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <!--按钮-->
                <div class="cartControl-wrapper">
                    <cartControl :food="food"></cartControl>
                </div>
                <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count ===0">
                    加入购物车
                </div>
            </div>
            <split></split>
            <div class="info" v-show="food.info">
              <h1 class="title">商品信息</h1>
              <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <!--商家评价-->
            <div class="rating">
                <h1 class="title">商品评价</h1>
                <!--<ratingselect @increment="incrementTotal" :ratings="food.ratings" :desc="desc"
                              :only-content="onlyContent"></ratingselect>-->
              <ratingselect @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :desc="desc"
                            :ratings="food.ratings"></ratingselect>
              <!--评价的内容部分-->
              <div class="rating-wrapper">
                <ul class="food.ratings && food.ratings.length">
                  <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                      <div class="user">
                        <span class="name">{{rating.username}}</span>
                        <img width="12" height="12" :src=rating.avatar alt="" class="avatar">
                      </div>
                    <div class="time">{{rating.rateTime | formatDate}}</div>
                    <p class="text">
                      <i class="iconfont" :class="{'icon-damuzhi':true}"></i>
                      {{rating.text}}
                    </p>
                  </li>
                </ul>
                <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评价</div>
              </div>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartControl from '../cartControl/cartControl.vue';
    import split from '../split/split.vue';
    import ratingselect from '../ratingselect/ratingselect.vue';
    import Vue from 'vue';
    import {formatDate} from '../../common/js/date';
    const ALLL = 2;
    export default {
        props:{
            food:{
                type:Object
            }
        },
        data() {
          return {
            showFlag:false,
            selectType:{
                ALL:2
            },
            onlyContent :{
              select:true
            },
            desc: {
              all : '全部',
              positive : '推荐',
              negative : '吐槽'
            }
          }
        },
        filters:{
          formatDate(time) {
            let data =new Date(time);
            return formatDate(data,'yyyy-MM-dd hh:mm');
          }
        },
        /*computed:{
          needShow(type,text) {
            if(this.onlyContent.select && !text) {
              return false;
            }
            if(this.selectType.ALL === 2) {
              return true
            }else {
              return type ===this.this.selectType.ALL;
            }
          },
        },*/
        methods:{
          addFirst() {
            if (!event._constructed) {
              return;
            }
            Vue.set(this.food,'count',1)
          },
          needShow(type,text) {
            if(this.onlyContent.select && !text) {
              return false;
            }
            if(this.selectType.ALL === ALLL) {
              return true
            }else {
              return this.this.selectType.ALL === type;
            }
          },
         /* incrementTotal(type,data) {
              this[type] = data;
            this.$nextTick( () => {
              this.scroll.refresh();
            })
          },*/
          incrementTotal() {
            console.log(35);
            this.$nextTick(() => {
              this.scroll.refresh();
            });
          },
          hide() {
            this.showFlag = false
          },
          show() {
            this.showFlag = true;
            this.selectType.ALL = ALLL;
            this.onlyContent.select = false;
            this.$nextTick( () => {
              if(!this.scroll){
                this.scroll = new BScroll(this.$refs.foodWrapper,{
                  click:true
                });
              }else {
                this.scroll.refresh();
              }
            })
          }
        },
        created() {

        },
        components:{
            cartControl,
            split,
            ratingselect
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "food.styl";
</style>
