 <template>
    <div class="history_page">
        <head-top head-title="记录管理" go-back='true' menu-plus='true'></head-top>
        
        <div class="history_type">
            <el-radio-group v-model="datatype">
                <el-radio-button label="ecg">心电记录</el-radio-button>
                <el-radio-button label="record">体检记录</el-radio-button>
            </el-radio-group>
        </div>
        <ul class="history_list_ul" v-if="datatype=='ecg'">
            <li class="history_list_li" v-for="item in historyList" :key="item.id">
                <!-- <img :src="imgBaseUrl + item.restaurant_image_url" class="restaurant_image"> -->
                <section class="history_item_right">
                    <section @click="showDetail(item.tag)">
                        <header class="history_item_right_header">
                            <section class="history_header">
                                <h4 >
                                    <span class="ellipsis">心电图历史 </span>
                                    <svg fill="#333" class="arrow_right">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                    </svg>
                                </h4>
                                <p class="history_time">时间：{{item.time}}</p>
                            </section>
                            <!-- <p class="history_status">
                                评分：85
                            </p> -->
                        </header>
                        <section class="history_basket">
                            <p class="history_name ellipsis"></p>
                            <p class="history_amount"></p>
                        </section>
                    </section>
                    <div class="history_again">
                        <router-link :to="{path: '/msite'}" tag="span" class="buy_again">删除</router-link>
                    </div>
                </section>
            </li>
        </ul>
        <ul class="history_list_ul" v-else>
            <li class="history_list_li" v-for="item in bodyrecordList" :key="item.id">
                <!-- <img :src="imgBaseUrl + item.restaurant_image_url" class="restaurant_image"> -->
                <section class="history_item_right">
                    <section @click="showrecordDetail(item.id)">
                        <header class="history_item_right_header">
                            <section class="history_header">
                                <h4 >
                                    <span class="ellipsis">体检历史</span>
                                    <svg fill="#333" class="arrow_right">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                    </svg>
                                </h4>
                                <p class="history_time">时间：2019-03-01</p>
                            </section>
                            <!-- <p class="history_status">
                                评分：85
                            </p> -->
                        </header>
                        <section class="history_basket">
                            <p class="history_name ellipsis">潜在风险：胆固醇偏高</p>
                            <p class="history_amount"></p>
                        </section>
                    </section>
                    <div class="history_again">
                        <router-link :to="{path: '/msite'}" tag="span" class="buy_again">删除</router-link>
                    </div>
                </section>
            </li>
        </ul>
        <foot-guide></foot-guide>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import headTop from 'src/components/header/head'
    import loading from 'src/components/common/loading'
    import {getImgPath} from 'src/components/common/mixin'
    import footGuide from 'src/components/footer/footGuide'
    import {gettimeseries,getechart,getrecordtag,getbodyrecord,app_pepredict} from 'src/service/getData'
    import {loadMore} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'


    export default {
      data(){
            return{
                historyList: null, //ecg记录列表
                bodyrecordList: null,//体检记录列表
                pepredict: null,
                showLoading: true, //显示加载动画
                datatype: 'ecg',
                imgBaseUrl,
            }
        },
        mounted(){
            this.initData();
        },
        mixins: [loadMore],
        components: {
            headTop,
            footGuide,
            loading,
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapMutations([
               'SAVE_HISTORY','SAVE_RECORDHISTORY'
            ]),
            //初始化获取信息
            async initData(){
                if (this.userInfo && this.userInfo.id) {
                    let res = await gettimeseries();
                    var timeseries_data = res.data;
                    this.historyList = [...timeseries_data];

                    let record_res = await getrecordtag();
                    var record_data = record_res.data;
                    var x,y;
                    // for(x in record_data){
                    //     var tag = record_data[x].id;
                    //     let pepredict = await app_pepredict(tag);
                    //     if(pepredict.success){
                    //         // console.log(typeof(pepredict.data));
                    //         // for(y in pepredict.data){
                    //         //     console.log(pepredict.data[y]);
                    //         // }
                            
                    //     }
                    //     // console.log(pepredict);
                    // }
                    // console.log(record_data);
                    this.bodyrecordList = [...record_data];

                    this.hideLoading();
                }else{
                    this.hideLoading();
                }
            },
            //显示详情页
            showDetail(item){
                this.SAVE_HISTORY(item);
                this.$router.push('/history/historyDetail');
            },
            showrecordDetail(item){
                this.SAVE_RECORDHISTORY(item);
                this.$router.push('/history/historyRecordDetail');
            },
            //生产环境与发布环境隐藏loading方式不同
            hideLoading(){
                this.showLoading = false;
            },
        },
        watch: {
            userInfo: function (value) {
                if (value && value.user_id && !this.historyList) {
                    this.initData();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .history_page{
        background-color: #f1f1f1;
        margin-bottom: 1.95rem;
        p, span, h4{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .history_type{
        padding-top: 2.3rem;
        margin-left: 25%;
    }
    .history_list_ul{
        padding-top: 0.3rem;
        .history_list_li{
            background-color: #fff;
            display: flex;
            margin-bottom: 0.5rem;
            padding: .6rem .6rem 0;
            .history_item_right{
                flex: 5;
                .history_item_right_header{
                    border-bottom: 0.025rem solid #f5f5f5;
                    padding-bottom: .3rem;
                    @include fj;
                    .history_header{
                        h4{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            @include sc(.75rem, #333);
                            line-height: 1rem;
                            width: 9rem;

                            .arrow_right{
                                @include wh(.4rem, .4rem);
                                fill: #ccc;
                                margin-right: .2rem;
                            }
                        }
                        .history_time{
                            @include sc(.55rem, #999);
                            line-height: .8rem;
                        }
                    }
                    .history_status{
                        @include sc(.6rem, #333);
                    }
                }
                .history_basket{
                    @include fj;
                    line-height: 2rem;
                    border-bottom: 0.025rem solid #f5f5f5;
                    .history_name{
                        @include sc(.6rem, #666);
                        width: 10rem;
                    }
                    .history_amount{
                        @include sc(.6rem, #f60);
                        font-weight: bold;
                    }
                }
                .history_again{
                    text-align: right;
                    line-height: 1.6rem;
                    .buy_again{
                        @include sc(.55rem, #3190e8);
                        border: 0.025rem solid #3190e8;
                        padding: .1rem .2rem;
                        border-radius: .15rem;
                    }
                }
            }
        }
    }
    .loading-enter-active, .loading-leave-active {
        transition: opacity .7s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
