 <template>
  <div class="history_detail_page">
    <head-top head-title="chatting..." go-back="true"></head-top>

    <!-- <head-top :crossover="chatname">
			<section class="coversPart" slot="person">
				<router-link to='/singlechat/chatmessage' class="person_link">
					<svg fill="#fff" class="icon-search">
					    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#person"></use>
					</svg>	
				</router-link>
			</section>
    </head-top>-->
    <section class="coversation" ref="groupHeight" @touchmove="loadMore">
      <section class="coversationlist" @click="bottomHide">
        <div class="underscore" v-if="underscore">————&nbsp;现在我们可以聊天了&nbsp;————</div>
        <ul>
          <!-- 对方 -->
          <li v-for="item in groupconversine" :key="item.id">
            <div class="other" :class="{mysay : item.from_user_id == userInfo.id }">
              <div class="say-time">{{item.created_at}}</div>
              <img src="../../../images/touxiang.jpg" alt @click="enlargeImg(item.avatar)">
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      :xlink:href="item.user_id == userInfo.id ? '#trigon-right' : '#trigon-left'"
                    ></use>
                  </svg>
                </div>
                <div class="whatsay_text">{{item.content}}</div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </section>
    <footer :class=" {footshow : clickmore}">
      <section class="foot_top">
        <div>
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#voice"></use>
          </svg>
        </div>
        <div>
          <input
            type="text"
            v-model="inputmessage"
            maxlength="100"
            @input="whatInput"
            @click="inputBottomHide"
            :class="{lightborder : light}"
            @keyup.enter="enterThing"
          >
        </div>
        <div>
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#face"></use>
          </svg>
        </div>
        <div>
          <div class="send" v-if="light" @click="clickSend">
            <span>发送</span>
          </div>
          <svg v-else @click="bottomShow">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#addthing"></use>
          </svg>
        </div>
      </section>
      <section class="foot_bottom"></section>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import headTop from "src/components/header/head";
import { getImgPath } from "src/components/common/mixin";
import { app_getmessage, app_sendmessage } from "src/service/getData";
import BScroll from "better-scroll";
import { imgBaseUrl } from "src/config/env";
import "src/plugins/swiper.min.js";
import "src/style/swiper.min.css";

export default {
  data() {
    return {
      inputmessage: "", //输入的文本内容
      light: false, //输入框不为空时，input下边框变色
      clickmore: false, //点击加号底部显示、隐藏
      chatname: "", //聊天名字
      enlargeurl: "", //头像地址
      enlargehides: false,
      enlargeShow: false,
      enlarge: false,
      timer: null,
      groupconversine: [], //对话列表
      robotCont: "",
      newInfo: {},
      chatData: {},
      userInfoData: {},
      offset: 0,
      lastMessageTime: null,
      imgS: "",
      scroll: "",
      loadStatus: false, //加载
      underscore: false, //底线
      allgroups: [],
      pooling_var: null
    };
  },
  mounted() {
    // this.initData();
    // console.log(this.userInfo);
    // app_getmessage(this.userInfo.user_id).then((res) => {
    // 	this.chatData=res;
    // }).then(()=>{
    // 	//初始化swiper
    // 	new Swiper('.swiper-container', {
    //         pagination: '.swiper-pagination',
    //         loop: false,
    //     });
    // })
    // console.log(this.chatData);
    this.getUserInfo();
    this.pooling_var = setInterval(() => {
      setTimeout(this.pooling, 0);
    }, 500);
    this.messageList(this.offset);
    this.loadStatus = true;

    // this.chatname=this.infor.to_user.name;
  },
  destroyed() {
    clearInterval(this.pooling_var);
  },
  mixins: [getImgPath],
  components: {
    headTop
  },
  computed: {
    ...mapState(["infor", "userInfo", "allgroup"])
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    ...mapMutations(["GET_ALLGROUP"]),
    //初始化获取信息

    async messageList(offset) {
      let getData = await app_getmessage(this.infor.to_user_id, this.offset);
      var groupData = getData.data;
      if (groupData.length < 20) {
        //如果获取少于20条，说明获取完成，无更多消息
        this.underscore = true;
      }
      if (groupData.length > 0) {
        // 如果该次有新数据
        groupData.reverse(); // 按时间排序
        for (let i = 0; i < groupData.length; i++) {
          if (
            !this.lastMessageTime ||
            new Date(groupData[i].updated_at) > this.lastMessageTime
          )
            this.lastMessageTime = new Date(groupData[i].updated_at);
          if (!groupData[i].content) {
            //清空无效数据
            groupData.splice(i, 1);
            i = i - 1;
          }
        }
        this.groupconversine = [...groupData, ...this.groupconversine]; // 更新
        this.allgroups = [...this.groupconversine];

        Array.prototype.unique = function() {
          //数组去重
          var res = [this[0]];
          for (var l = 1; l < this.length; l++) {
            var repeat = false;
            for (var j = 0; j < res.length; j++) {
              if (this[l].user_id == res[j].user_id) {
                repeat = true;
                break;
              }
            }
            if (!repeat) {
              res.push(this[l]);
            }
          }
          return res;
        };
        var arr = this.allgroups;
        this.GET_ALLGROUP(arr.unique()); //保存所有人数据信息
      }
      this.$nextTick(() => {
        this.loadStatus = false;
        if (offset == 0) {
          this.underscore = false;
          window.scrollTo(
            0,
            this.$refs.groupHeight.offsetHeight - window.innerHeight
          );
        } else {
          const scrollPosition =
            this.$refs.groupHeight.offsetHeight - this.lastPageHeight;
          window.scrollTo(0, scrollPosition);
        }
        this.lastPageHeight = this.$refs.groupHeight.offsetHeight;
      });
    },
    async pooling() {
      // 暂时存在问题：一秒内发送多个消息只能显示最后一条；滚轮滚到底端
      let getData = await app_getmessage(this.infor.to_user_id, 0);
      let groupData = getData.data;
      let i = 0;
      for (i = 0; i < groupData.length; i++) {
        if (new Date(groupData[i].updated_at) <= this.lastMessageTime) break;
      }
      if (i > 0) {
        if (new Date(groupData[0].updated_at) > this.lastMessageTime)
          this.lastMessageTime = new Date(groupData[0].updated_at);
        let newData = groupData.slice(0, i);
        newData.reverse();
        this.groupconversine.push(...newData);

        this.$nextTick(() => {
          this.loadStatus = false;
          this.underscore = false;
          window.scrollTo(
            0,
            this.$refs.groupHeight.offsetHeight - window.innerHeight
          );
          this.lastPageHeight = this.$refs.groupHeight.offsetHeight;
        });
      }
    },
    //加载更多
    loadMore() {
      if (this.loadStatus || this.underscore) {
        return;
      }
      this.scroll = document.body.scrollTop;
      if (this.scroll == 0) {
        this.loadStatus = true;
        this.offset += 20;
        this.messageList(this.offset);
      } else {
        this.underscore = false;
        this.loadStatus = false;
      }
    },

    whatInput() {
      if (this.inputmessage.replace(/\s+/g, "") == "") {
        this.light = false;
      } else {
        this.light = true;
      }
    },
    enterThing() {
      if (this.light) {
        this.clickSend();
      }
    },
    bottomShow() {
      this.clickmore = true;
    },
    bottomHide() {
      this.clickmore = false;
    },
    inputBottomHide() {
      this.clickmore = false;
    },
    async clickSend() {
      let res = await app_sendmessage(this.infor.to_user_id, this.inputmessage);
      this.inputmessage = "";
      this.light = false;
      this.$nextTick(() => {
        window.scrollTo(
          0,
          this.$refs.groupHeight.offsetHeight - window.innerHeight
        );
      });
    },
    enlargeImg(enlargeImg) {
      this.enlargeurl = enlargeImg;
      this.enlarge = true;
      this.enlargeShow = true;
      this.enlargehides = false;
    },
    enlargeHide() {
      clearTimeout(this.timer);
      this.enlargehides = true;
      this.enlargeShow = false;
      this.timer = setTimeout(() => {
        this.enlarge = false;
      }, 400);
    }
  }
};
</script>
  
<style lang="scss" scoped>
@import "src/style/mixin";

.history_detail_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ebebeb;
  z-index: 202;
  padding-top: 1.95rem;
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.scroll_container {
  // position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 1.95rem;
}
.scroll_insert {
  padding-bottom: 3rem;
}
.history_titel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.7rem;
  background-color: #fff;
  margin-bottom: 0.5rem;
  img {
    border: 0.05rem solid $blue;
    border-radius: 50%;
    @include wh(3rem, 3rem);
  }
  p:nth-of-type(1) {
    @include sc(0.9rem, #333);
    font-weight: bold;
    margin-top: 0.4rem;
  }
  p:nth-of-type(2) {
    @include sc(0.55rem, #999);
    width: 10rem;
    margin-top: 0.3rem;
    text-align: center;
  }
  .order_again {
    @include sc(0.6rem, $blue);
    margin-top: 0.5rem;
    border: 0.025rem solid $blue;
    padding: 0.15rem 0.4rem;
    border-radius: 0.1rem;
  }
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.7s;
}
.loading-enter,
.loading-leave-active {
  opacity: 0;
}
.home_today_container {
  padding-top: 0.3rem;
  border-bottom: 0.025rem solid $bc;
  height: 10.6rem;
  .home_today {
    background-color: #fff;
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
  }
  .fl_back {
    @include wh(100%, 100%);
  }
}

.router-show-enter-active,
.router-show-leave-active {
  transition: all 0.4s;
}
.router-show-enter,
.router-show-leave-active {
  transform: translateX(100%);
}

.coversPart {
  @include ct;
  right: 0.5973333333rem;
  @include wh(0.8533333333rem, 0.8533333333rem);
  .person_link {
    display: block;
    @include wh(0.8533333333rem, 0.8533333333rem);
    svg {
      @include wh(100%, 100%);
    }
  }
}
.coversation {
  background-color: #ebebeb;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  padding-top: 0.5rem;
  .coversationlist {
    position: relative;
    padding: 0 0.32rem;
    padding-bottom: 2.6rem;
    overflow: auto;
    margin: 0 auto;
    ul {
      padding-top: 0.4rem;
      width: 15.4rem;
      overflow-x: hidden;
      overflow-scrolling: touch;
      -webkit-overflow-scrolling: touch;
      top: 0;
      li {
        .other {
          width: 100%;
          @include fj(flex-start);
          margin-bottom: 1.3rem;
          align-items: top;
          position: relative;
          .say-time {
            @include sc(0.48rem, #999);
            width: 8rem;
            position: absolute;
            top: -0.4rem;
            left: 2.5rem;
          }
          img {
            display: block;
            @include wh(1.7493333333rem, 1.7493333333rem);
          }
          .whatsay {
            position: relative;
            margin-top: 0.4rem;

            .whatsay_svg {
              @include wh(0.4266666667rem, 0.64rem);
              position: absolute;
              top: 0.5546667rem;
              left: 0.36rem;
              z-index: 2;
              svg {
                display: block;
                @include wh(0.4266666667rem, 0.64rem);
              }
            }
            .whatsay_text {
              margin-left: 0.6399997rem;
              max-width: 10.3253333333rem;
              background: #fff;
              padding: 0.42rem 0.384rem;
              border: 1px solid #d9d9d9;
              border-radius: 8px;
              @include sc(0.64rem, #333);
              line-height: 0.8533333333rem;
              word-break: break-all;
            }
          }
        }
        .mysay {
          display: flex;
          flex-direction: row-reverse;
          .say-time {
            left: 8.8rem;
          }
          .whatsay {
            .whatsay_svg {
              right: 0.36rem;
              left: auto;
            }
            .whatsay_text {
              margin-right: 0.6399997rem;
              margin-left: 0;
              background: #9fe658;
            }
          }
        }
      }
    }
    .underscore {
      padding-top: 0.2rem;
      text-align: center;
      @include sc(0.5546666667rem, #999);
    }
  }
}
footer {
  position: fixed;
  z-index: 10;
  border-top: 1px solid #e0e0e0;
  background: #f5f5f5;
  bottom: -11.712rem;
  width: 100%;
  .foot_top {
    padding: 0 0.512rem;
    height: 2.0053333333rem;
    background: #f3f3f3;
    @include fj(flex-start);
    align-items: center;
    div:nth-of-type(1),
    div:nth-of-type(3),
    div:nth-of-type(4) {
      @include wh(1.3653333333rem, 1.3653333333rem);
      margin-right: 0.3413333333rem;
      svg {
        @include wh(100%, 100%);
      }
    }
    div:nth-of-type(2) {
      margin-right: 0.3413333333rem;
      width: 9.8rem;
      height: 1.152rem;
      border-bottom: 1px solid #e0e0e0;
      input {
        display: block;
        width: 9.8rem;
        padding: 0 0.4133333333rem;
        line-height: 1.152rem;
        height: 1.152rem;
        border: 0;
        background: none;
        @include sc(0.64rem, #000);
        border-bottom: 1px solid #e0e0e0;
      }
      .lightborder {
        border-color: #19ad17;
      }
    }
    div:nth-of-type(4) {
      margin-right: 0;
      .send {
        width: 1.8133333333rem;
        background: #16af17;
        height: 1.3653333333rem;
        padding: 0.682666rem 0;
        border-radius: 5px;
        @include fj(center);
        align-items: center;
        span {
          display: block;
          @include sc(0.5973333333rem, #fff);
        }
      }
      .send:active {
        background: #33c034;
      }
    }
  }
  .foot_bottom {
    height: 11.712rem;
    border-top: 1px solid #e0e0e0;
    .swiper-container {
      width: 100%;
      height: 11.712rem;
      overflow: hidden;
      .swiper-slide {
        width: 100%;
        ul {
          padding: 1.408rem 1.1946666667rem 0;
          box-sizing: border-box;
          li {
            float: left;
            width: 2.5466666667rem;
            margin-right: 1rem;
            margin-bottom: 1.1946666667rem;
            .swiper_svg {
              @include wh(2.5466666667rem, 2.5466666667rem);
              background: #fcfcfc;
              border: 1px solid #d3d3d3;
              border-radius: 10px;
              @include fj(center);
              align-items: center;
              svg {
                @include wh(1.28rem, 0.9386666667rem);
                display: block;
              }
            }
            .swiper_text {
              width: 100%;
              margin-top: 0.256rem;
              text-align: center;
              @include sc(0.4693333333rem, #7a8187);
            }
          }
          li:nth-of-type(4n + 4) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
.footshow {
  bottom: 0;
  transition: all 0.2s;
}
.enlarge {
  position: fixed;
  @include wh(100%, 100%);
  background: #000000;
  top: 0;
  z-index: 100;
  img {
    display: block;
    width: auto;
    height: 15.0186666667rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -7.5093333333rem;
  }
}
.enlarge_part {
  display: none;
}
body .movein-animate {
  transition: all 1s;
  animation: fadeIn 0.6s;
}
body .moveout-animate-leave {
  transition: all 1s;
  animation: zoomOut 0.6s;
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  100% {
    opacity: 0;
  }
}
@keyframes zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  100% {
    opacity: 0;
  }
}
</style>
