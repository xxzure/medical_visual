<template>
  <div>
    <head-top signin-up="msite">
      <router-link to="/" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">首页</span>
      </router-link>
    </head-top>

    <el-container class="home_grade_container">
      <el-main class="home_grade">
        <el-progress type="circle" :percentage="85" status="text" class="grade">85分</el-progress>
      </el-main>
    </el-container>

    <el-container class="home_cal_container">
      <el-main class="home_cal">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <h4>今日测量</h4>
              <p>2小时32分钟</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <h4>今日分析</h4>
              <p>暂无异常</p>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <el-container class="home_today_container" v-show="userInfo && this.userInfo.id">
      <el-main class="home_today" id="container"></el-main>
    </el-container>

    <foot-guide></foot-guide>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import headTop from "src/components/header/head";
import footGuide from "src/components/footer/footGuide";
import "src/plugins/swiper.min.js";
import "src/style/swiper.min.css";
import { app_ecg_history } from "../../service/getData";

var echarts = require("echarts");
Date.prototype.format = function(partten) {
  if (partten == null || partten == "") {
    partten = "y-m-d";
  }
  var y = this.getFullYear();
  var m = this.getMonth() + 1;
  var d = this.getDate();
  var r = partten.replace(/y+/gi, y);
  r = r.replace(/m+/gi, (m < 10 ? "0" : "") + m);
  r = r.replace(/d+/gi, (d < 10 ? "0" : "") + d);
  return r;
};
export default {
  data() {
    return {
      echart_show: false,
      duration: 0
    };
  },
  components: {
    headTop,
    footGuide
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      if (this.userInfo && this.userInfo.id) {
        let obj = await app_ecg_history();
        if (obj.success == true) {
          var now = new Date();
          var dom = document.getElementById("container");
          var myChart = echarts.init(dom);
          this.echart_show = true;
          myChart.setOption({
            title: {
              text: "心率记录"
            },
            tooltip: {
              trigger: "axis"
            },
            xAxis: {
              // data: obj.data.map(function(item){ return item.date}),
              //假数据
              data: [
                "2018-03-01",
                "2018-03-02",
                "2018-03-03",
                "2018-03-04",
                "2018-03-05",
                "2018-03-06",
                "2018-03-07",
                "2018-03-08",
                "2018-03-09",
                "2018-03-10",
                "2018-03-011",
                "2018-03-12",
                "2018-03-13",
                "2018-03-14",
                "2018-03-15",
                "2018-03-16",
                "2018-03-17",
                "2018-03-18",
                "2018-03-19",
                "2018-03-20"
              ]
            },
            yAxis: {
              splitLine: {
                show: false
              },
              min: 0,
              max: function(value) {
                return value.max;
              }
            },
            dataZoom: [
              {
                start: 60
              },
              {
                type: "inside"
              }
            ],
            visualMap: {
              show: false,
              pieces: [
                {
                  gt: 700,
                  lte: 800,
                  color: "#096"
                },
                {
                  gt: 800,
                  lte: 900,
                  color: "#ffde33"
                },
                {
                  gt: 900,
                  lte: 1200,
                  color: "#ff9933"
                }
              ],
              outOfRange: {
                // color: '#999'
                color: "#ff9933"
              }
            },
            series: {
              name: "测量次数",
              type: "line",
              // data: obj.data.map(function(item){ return item.count}),
              //假数据
              data: [2, 4, 6, 9, 3, 2, 6, 7, 2, 9, 5, 8, 4, 6, 3, 8, 4, 9, 6, 3]
            }
          });
        }
      } else {
        this.echart_show = false;
      }
    }
  },
  watch: {
    userInfo: function(value) {
      if (value && value.id && !this.echart_show) {
        this.initData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.link_search {
  left: 0.8rem;
  @include wh(0.9rem, 0.9rem);
  @include ct;
}
.msite_title {
  @include center;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -0.5rem;
  .title_text {
    @include sc(0.8rem, #fff);
    text-align: center;
    display: block;
  }
}
.msite_nav {
  padding-top: 2.1rem;
  background-color: #fff;
  border-bottom: 0.025rem solid $bc;
  height: 10.6rem;
  .swiper-container {
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
    .swiper-pagination {
      bottom: 0.2rem;
    }
  }
  .fl_back {
    @include wh(100%, 100%);
  }
}
.home_grade_container {
  padding-top: 2.1rem;
  border-bottom: 0.025rem solid $bc;
  // height: 10.6rem;
  .home_grade {
    background-color: #fff;
    .grade {
      @include fj(center);
    }
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
  }
  .fl_back {
    @include wh(100%, 100%);
  }
}

.home_cal_container {
  padding-top: 0.3rem;
  border-bottom: 0.025rem solid $bc;
  .home_cal {
    background-color: #fff;
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
    p {
      margin-left: 25%;
      line-height: 1.5rem;
      @include sc(0.75rem, #c5987e);
    }
  }
  .fl_back {
    @include wh(100%, 100%);
  }
  p,
  h4 {
    @include sc(0.75rem, #333);
    line-height: 1rem;
  }
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

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #288eeb;
}
.grid-content {
  border-radius: 4px;
  min-height: 3rem;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
