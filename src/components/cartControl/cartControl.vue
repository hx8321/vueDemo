<template>
    <div class="cartControl">
        <transition name="fade">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
                <transition name="inner">
                    <span class="inner iconfont icon-jian"  v-show="food.count>0"></span>
                </transition>
            </div>
        </transition>
        <span class="cart-count" v-show="food.count>0">{{food.count}}</span>
        <span class="iconfont icon-jia cart-add" @click.stop.prevent="addCart($event)"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props:{
          food:{
              type:Object
          }
        },
        created() {
           /* console.log(8888);
            console.log(this.food);*/
        },
        methods: {
            addCart(event) {
                if (!event._constructed) {return;};
                if (!this.food.count) {
                    Vue.set(this.food,'count',1);
                }else{
                    this.food.count++;
                }
            },
            decreaseCart(event) {
                if (!event._constructed) {return;};
                this.food.count--;
                console.log(this.food);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "cartControl.styl";
</style>