<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" @click="select(2,$event)" :class="{'active':selectType.ALL === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" @click="select(0,$event)" :class="{'active':selectType.ALL === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="block negative" @click="select(1,$event)" :class="{'active':selectType.ALL === 1}">{{desc.negative}}<span class="count">{{nagatives.length}}</span></span>
        </div>
        <div class="switch" @click="toggleContent($event)" :class="{'on':onlyContent.select}">
            <i class="iconfont icon-gou"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    /*const ALL = 0;*/
    export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            onlyContent: {
                type: Object,
                default() {
                  return {
                    select:false
                  }
                }

            },
            selectType: {
              type:Object,
              default() {
                  return {
                    ALL : 0
                  }
              }
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '吐槽'
                    };
                }
            }
        },
        methods:{
          select(type,event) {
            if(!event._constructed){return;}
            this.selectType.ALL = type;
            this.$emit('increment');
          },
           /* toggleContent (event) {
                if(!event._constructed){return;}
                this.onlyContent = !this.onlyContent;
                this.$emit('increment','onlyContent',this.onlyContent);
            }*/
            toggleContent (event) {
                if (!event._constructed) {
                    return;
                }
                this.onlyContent.select = !this.onlyContent.select;
                this.$emit('increment');

            }

        },
        computed: {
          positives() {
            // 使用js过滤器将符合rating.rateType ===POSITIVE这个return出来
            return this.ratings.filter( (rating) => {
                return rating.rateType ===POSITIVE;
            })
          },
          nagatives() {
            return this.ratings.filter((rating) => {
              return rating.rateType === NEGATIVE;
            });
          }
        },
        create() {
            console.log(78787);
            console.log(this.ratings);
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "ratingselect.styl";
</style>