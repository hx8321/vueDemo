<template>
    <div class="goods">
        <!--左边-->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item border-1px"
                    :class="{'current':currentIndex == index}" @click="selectMenu(index,$event)">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <!--右边-->
        <div class="foods-wrapper" ref="foodWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
                            <div class="icon">
                                <img :src="food.icon" alt="" width="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}</span><span class="count">好评{{food.rating}}</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="carControl-wrapper">
                                    <cartControl :food="food"></cartControl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!--购物车-->
        <div>
            <shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
            :min-price="seller.minPrice" ref="shopCart"></shopCart>
            <!--商品详细介绍页-->
            <food :food="selectedFood" ref="food"></food>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import data from '../../common/json/data.json';
    import shopCart from '../shopcart/shopCart.vue';
    import cartControl from '../cartControl/cartControl.vue';
    import food from '../food/food.vue';
    export default {
        props: {
            seller : {
                type : Object
            }
        },
        data() {
            return {
                goods:[],
                scrolly:0,
                listHeight:[],
                selectedFood:{}
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.goods = data.goods;
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            })
        },
        computed:{
            currentIndex() {
                for (let i =0; i<this.listHeight.length;i++) {
                    let height = this.listHeight[i];
                    let height2 = this.listHeight[i+1];
                    if (!height2 || (this.scrolly >= height && this.scrolly<height2)) {
                        return i;
                    }
                };
                return 0;
            },
          selectFoods() {
            let foods =[];
            this.goods.forEach((good) => {
              good.foods.forEach((food) => {
                if (food.count) {
                  foods.push(food);
                }
              });
            });
            return foods;
          }
        },
        methods: {
            selectFood(food,event) {
              if(!event._constructed) {
                return;
              }
              this.selectedFood = food;
              this.$refs.food.show();
            },
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                    click:true
                });
                this.foodScroll = new BScroll(this.$refs.foodWrapper,{
                    probeType:3,
                    click:true
                });
                this.foodScroll.on('scroll',(pos) => {
                    this.scrolly = Math.abs(Math.round(pos.y))
                })
            },
            _calculateHeight() {
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i<foodList.length ;i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu(index,event) {
                if(!event._constructed) {
                    return;
                }
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodScroll.scrollToElement(el,300);

            }
        },
        components:{
            shopCart,
          cartControl,
          food
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./goods.styl";
</style>
