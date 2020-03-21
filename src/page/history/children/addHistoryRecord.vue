 <template>
  <div class="history_detail_page">
    <head-top head-title="上传体检记录" go-back="true"></head-top>

    <form class="history_list_ul">
      <li class="history_list_li" v-for="(item, index) in inputKeys" :key="index">
        <section class="history_item_right">
          <header class="history_item_right_header">
            <section class="history_header">
              <label>
                <span class="ellipsis">{{index}}</span>
              </label>
            </section>
            <template v-if="item.type=='select'">
              <select
                class="history_status"
                style="direction:rtl"
                v-bind:name="item.name"
                v-bind:value="item.value"
                v-model="item.value"
              >
                <option v-for="option in item.options" :key="option">{{option}}</option>
              </select>
            </template>
            <input
              class="history_status"
              v-bind:value="item.value"
              v-bind:type="item.type"
              v-model="item.value"
              v-else
            >
          </header>
        </section>
      </li>
      <li class="history_list_li" >
        <el-button
          type="primary"
          name="submit"
          class="submit_button"
          style="color:white"
          @click="upload"
        ><span style="color:white">提交</span></el-button>
      </li>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import headTop from "src/components/header/head";
import { getImgPath } from "src/components/common/mixin";
import { addrecord } from "src/service/getData";
import loading from "src/components/common/loading";
import BScroll from "better-scroll";
import { imgBaseUrl } from "src/config/env";

export default {
  data() {
    return {
      inputKeys: {
        出生日期: {
          type: "text",
          value: "1991/01/01"
        },
        性别: {
          type: "select",
          value: "男",
          options: ["男", "女"]
        },
        "身高（cm）": {
          type: "text",
          value: "175"
        },
        "体重（Kg）": {
          type: "text",
          value: "60"
        },
        BMI: {
          type: "text",
          value: "19.6"
        },
        "血压(mmHg)": {
          type: "text",
          value: "133/93"
        },
        是否吸烟: {
          type: "select",
          value: "吸烟",
          options: ["吸烟", "不吸烟", "曾经吸烟"]
        },
        早发心血管病家族史: {
          type: "text",
          value: "无"
        },
        内科病史: {
          type: "text",
          value: "无"
        },
        胸廓: {
          type: "text",
          value: "未见异常"
        },
        呼吸音: {
          type: "text",
          value: "未见异常"
        },
        心率: {
          type: "text",
          value: "72"
        },
        甲状腺: {
          type: "text",
          value: "未见异常"
        },
        乳腺: {
          type: "text",
          value: "未见异常"
        },
        "眼底(右)": {
          type: "text",
          value: "未见异常"
        },
        "眼底(左)": {
          type: "text",
          value: "未见异常"
        },
        鼻: {
          type: "text",
          value: "未见异常"
        },
        中性粒细胞百分比: {
          type: "text",
          value: "64.8"
        },
        中性粒细胞计数: {
          type: "text",
          value: "4.5"
        },
        亚硝酸盐: {
          type: "text",
          value: "阴性"
        },
        低密度脂蛋白: {
          type: "text",
          value: "2.5"
        },
        单核细胞百分比: {
          type: "text",
          value: "4.8"
        },
        单核细胞计数: {
          type: "text",
          value: "0.4"
        },
        嗜碱性粒细胞百分比: {
          type: "text",
          value: "1.1"
        },
        嗜碱性粒细胞计数: {
          type: "text",
          value: "0.1"
        },
        嗜酸性粒细胞百分比: {
          type: "text",
          value: "2.9"
        },
        嗜酸性粒细胞计数: {
          type: "text",
          value: "0.2"
        },
        尿糖: {
          type: "text",
          value: "阴性"
        },
        尿素: {
          type: "text",
          value: "3.18"
        },
        尿胆原: {
          type: "text",
          value: "阴性"
        },
        尿酸: {
          type: "text",
          value: "294"
        },
        平均RBC血红蛋白含量: {
          type: "text",
          value: "32.2"
        },
        平均RBC血红蛋白浓度: {
          type: "text",
          value: "330"
        },
        平均红细胞体积: {
          type: "text",
          value: "97.6"
        },
        平均血小板体积: {
          type: "text",
          value: "8.9"
        },
        总胆固醇: {
          type: "text",
          value: "4.27"
        },
        比重: {
          type: "text",
          value: "1.023"
        },
        淋巴细胞百分比: {
          type: "text",
          value: "17.2"
        },
        淋巴细胞计数: {
          type: "text",
          value: "1.4"
        },
        甘油三酯: {
          type: "text",
          value: "2"
        },
        甲胎蛋白: {
          type: "text",
          value: "1.58"
        },
        癌胚抗原: {
          type: "text",
          value: "2.8"
        },
        白细胞: {
          type: "text",
          value: "阴性"
        },
        白细胞计数: {
          type: "text",
          value: "7.9"
        },
        "糖类抗原19-9": {
          type: "text",
          value: "<0.60"
        },
        红细胞体积分布宽度: {
          type: "text",
          value: "13"
        },
        红细胞计数: {
          type: "text",
          value: "4.91"
        },
        胆红素: {
          type: "text",
          value: "阴性"
        },
        葡萄糖: {
          type: "text",
          value: "4.71"
        },
        蛋白质: {
          type: "text",
          value: "阴性"
        },
        血小板体积分布宽度: {
          type: "text",
          value: "16.4"
        },
        血小板比容: {
          type: "text",
          value: "0.23"
        },
        血小板计数: {
          type: "text",
          value: "255"
        },
        血红蛋白浓度: {
          type: "text",
          value: "158"
        },
        血细胞比容: {
          type: "text",
          value: "48"
        },
        谷丙转氨酶: {
          type: "text",
          value: "10"
        },
        谷氨酰转肽酶: {
          type: "text",
          value: "13"
        },
        谷草转氨酶: {
          type: "text",
          value: "13"
        },
        透明度: {
          type: "text",
          value: "澄清"
        },
        酮体: {
          type: "text",
          value: "阴性"
        },
        酸碱度: {
          type: "text",
          value: "5.5"
        },
        隐血或红细胞: {
          type: "text",
          value: "阴性"
        },
        颜色: {
          type: "select",
          value: "黄色",
          options: ["黄色", "浅黄色", "微黄色"]
        },
        高密度脂蛋白: {
          type: "text",
          value: "1.1"
        }
      },
      recordDetail: null,
      showLoading: true, //显示加载动画
      imgBaseUrl,
      predictRes: null
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mixins: [getImgPath],
  components: {
    headTop,
    loading
  },
  methods: {
    open() {
      this.$message("这是一条消息提示");
    },
    async upload() {
      console.log(this.userInfo);
      if (this.userInfo && this.userInfo.id) {
        let t = {};
        for (let key in this.inputKeys) {
          if (this.inputKeys[key].value === "") {
            this.$message("有项目未填");
          }
          t[key] = this.inputKeys[key].value;
        }
        let res = await addrecord(t);
        if (res.success == true) {
          this.$message("提交成功");
          this.$router.go(-1);
        }
      }
    }
  }
};
</script>
  
<style lang="scss" scoped>
@import "src/style/mixin";

.input_form {
  input {
    float: left;
  }
}
.history_detail_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f1f1f1;
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
.history_list_ul {
  .history_list_li {
    background-color: #fff;
    display: flex;
    // margin-bottom: 0.5rem;
    padding: 0.6rem 0.6rem 0;
    .history_item_right {
      flex: 5;
      .history_item_right_header {
        border-bottom: 0.025rem solid #f5f5f5;
        padding-bottom: 0.3rem;
        @include fj;
        .history_header {
          label {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            @include sc(0.75rem, #333);
            line-height: 1.1rem;
            margin-left: 1rem;
          }
        }
        .history_status {
          background-color: #fff;
          // direction: rtl;
          width: 6em;
          margin-right: 1rem;
          text-align: right;
          line-height: 1.1rem;
          @include sc(0.75rem, #333);
        }
      }
    }
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
.submit_button {
  flex: 1;
  // border: 0.3rem solid $blue;
  margin-bottom: 0.5rem;
  // @include sc(0.65rem, #fff);
  // color: #fff;
  // border-radius: 0.125rem;
  // background-color: $blue;
  // font-weight: bold;
  // line-height: 1.1rem;
  // padding: 0 0.25rem;
}
</style>
