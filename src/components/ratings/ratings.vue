<template>
    <div class="ratings" ref="ratingsWrapper">
        <!--better-scroll插件必须要两个根元素包裹的才能拖着滚动的-->
        <div>
            <div class="ratings-content">
                <div class="overview">
                    <!--评价左边-->
                    <div class="overview-left">
                        <h1 class="score">{{seller.score}}</h1>
                        <div class="title">综合评分</div>
                        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                    </div>
                    <!--评价右边-->
                    <div class="overview-right">
                        <div class="score-wrapper">
                            <span class="title">服务态度</span>
                            <star :size="36" :score="seller.serviceScore"></star>
                            <span class="score">{{seller.serviceScore}}</span>
                        </div>
                        <div class="score-wrapper">
                            <span class="title">商品评分</span>
                            <star :size="36" :score="seller.foodScore"></star>
                            <span class="score">{{seller.foodScore}}</span>
                        </div>
                        <div class="delivery-wrapper">
                            <span class="title">送达时间</span>
                            <span class="delivery">{{seller.deliveryTime}}分钟</span>
                        </div>
                    </div>
                </div>
            </div>
            <split></split>
            <!--评价按钮组件-->
            <ratingselect  @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
            <!--评价的内容-->
            <div class="rating-wrapper border-1px">
                <ul>
                    <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
                        <div class="avatar">
                            <img :src="rating.avatar" alt="" width="28" height="28">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                            <span class="delivery" v-show="rating.deliveryTime">
                                {{rating.deliveryTime}}
                             </span>
                            </div>
                            <!--文字那一块-->
                            <p class="text">{{rating.text}}</p>
                            <!--字体图标后面的那一块-->
                            <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
                                <i class="iconfont icon-damuzhi"></i>
                                <span  class="item" v-for="item in rating.recommend" >{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import data from '../../common/json/data.json';
    import star from '../star/star.vue';
    import split from '../split/split.vue';
    import ratingselect from '../ratingselect/ratingselect.vue';
    import {formatDate} from '../../common/js/date';
    const ALLL = 2;
    export default {
        props:{
            seller:{
                type:Object
            }
        },
        data() {
            return {
                ratings:[],
                showFlag:false,
                selectType:{
                    ALL:2
                },
                onlyContent :{
                    select:true
                }
            }
        },
        created() {
            this.ratings = data.ratings;
            this.$nextTick( () => {
                this.scroll = new BScroll(this.$refs.ratingsWrapper,{
                    click:true
                });
            })
        },
        methods:{
            incrementTotal() {
                this.$nextTick( () => {
                    this.scroll.refresh();
                })
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
            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        components:{
            star,
            split,
            ratingselect
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./ratings.styl";
</style>