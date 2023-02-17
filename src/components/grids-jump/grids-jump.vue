<template>
  <div>
    <div
      v-if="showSwitch"
      :class="['change-modal', isLight ? 'light-wrap' : '']"
      @mouseover="dbShow"
      @mouseleave="mouseLeave"
    >
      <!-- <div class="down-arrow"></div> -->
      <div class="logo-con" @click="goBackLogin">
        <!-- <img v-show="!collapsed" class="logo-img" src="@/assets/images/logo.png" key="max-logo" /> -->
        <template v-if="isLight">
          <img
            v-show="!collapsed"
            class="light-logo"
            :src="maxLogo"
            key="max-logo"
          />
          <div v-show="!collapsed" class="light-arrow"></div>
        </template>
        <template v-else>
          <img
            v-show="!collapsed"
            class="logo-img"
            :src="maxLogo"
            key="max-logo"
          />
          <div></div>
          <div v-show="!collapsed" class="down-arrow"></div>
        </template>
        <img
          v-show="collapsed"
          class="logo-img min-pic"
          :src="minLogo"
          key="min-logo"
        />
      </div>

      <!-- 深色 浅色主题：light-modals -->
      <div
        :class="[
          'modals',
          'elementToFadeInAndOut',
          isLight ? 'light-modals' : '',
        ]"
        :style="sideBgColor ? 'backgroundColor:' + sideBgColor : ''"
        v-show="modalShow"
      >
        <div v-for="item of commonArea" :key="item.id" class="partItem">
          <h2 class="col-title over_hide" :title="item.name">
            {{ item.name }}
          </h2>
          <div class="card-list">
            <div
              class="per-card"
              v-for="{
                id,
                color_ico,
                name,
                opentype,
                open_url,
              } in item.modules"
              :key="id"
              @click="handleClick(id, opentype, open_url)"
            >
              <img class="module-icon" :src="color_ico" :alt="name" />
              <p class="module-name">{{ name }}</p>
            </div>
          </div>
        </div>
        <div v-for="item of leftArea" :key="item.id" class="partItem">
          <h2 class="col-title over_hide" :title="item.name">
            {{ item.name }}
          </h2>
          <div class="card-list">
            <div
              class="per-card"
              v-for="{
                id,
                color_ico,
                name,
                opentype,
                open_url,
              } in item.modules"
              :key="id"
              @click="handleClick(id, opentype, open_url)"
            >
              <img class="module-icon" :src="color_ico" :alt="name" />
              <p class="module-name">{{ name }}</p>
            </div>
          </div>
        </div>
        <div v-for="item of centerArea" :key="item.id" class="partItem">
          <h2 class="col-title over_hide" :title="item.name">
            {{ item.name }}
          </h2>
          <div class="card-list">
            <div
              class="per-card"
              v-for="{
                id,
                color_ico,
                name,
                opentype,
                open_url,
              } in item.modules"
              :key="id"
              @click="handleClick(id, opentype, open_url)"
            >
              <img class="module-icon" :src="color_ico" :alt="name" />
              <p class="module-name">{{ name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 不展示切换的时候 只展示图标 -->
    <div
      v-if="!showSwitch"
      :class="['change-modal', isLight ? 'light-wrap' : '']"
    >
      <div class="logo-con-init">
        <img
          v-show="!collapsed"
          class="img-logo"
          @click.self="goBackLogin"
          :src="maxLogo"
          key="max-logo"
        />
        <img
          v-show="collapsed"
          class="img-logo min-pic"
          @click.self="goBackLogin"
          :src="minLogo"
          key="min-logo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "./grids-jump.less";
import { getModules, getSyncGridUrl } from "@/api/grids";
import { debounce } from "lodash";

const Light_Logo =
  "https://img12.iqilu.com/1/sucaiku/202104/25/ee017c1fe86344d3a32ecc03bfd00f9a.png";
const Dark_Logo =
  "https://img12.iqilu.com/1/sucaiku/202102/03/db0b775182fb49f2af1557126470b0ce.png";

export default {
  name: "grids-jump",
  props: {
    // 折叠
    collapsed: {
      type: Boolean,
      default: false,
    },
    // 1.0.37开始 不再需要env
    theme: {
      type: String,
      default: "dark", // light dark
    },
    requestUrl: {
      type: String,
      default: "https://shandianyun.iqilu.com",
    },
    // 1.0.38开始
    themeConfig: {
      type: Object,
      default: () => ({
        module_is_show_shortcut: 0,
        color: {},
        logo: {},
      }),
    },
  },
  data() {
    return {
      baseUrlObj: {
        dev: "",
        test: "https://user.shandian8.com",
        prod: "https://shandianyun.iqilu.com",
      },
      baseUrl: "",
      gridsList: [],
      modalShow: false,
      gridsColorInfo: [
        "#6b77fa",
        "#bb75f2",
        "#0edabb",
        "#ff818f",
        "#6dd384",
        "#05a4f9",
        "#945eff",
      ],
      dbShow: {},
      leftArea: [],
      centerArea: [],
      commonArea: [],
      showSwitch: false,
      sideBgColor: "",
      maxLogo: "",
      minLogo: "",
    };
  },
  watch: {
    requestUrl: {
      handler() {
        this.baseUrl = this.requestUrl;
      },
      immediate: true,
    },
    themeConfig: {
      handler(val) {
        console.log("观察数据变化", val);
        val && this.setConfigParam(val);
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    // 是否浅色主题
    isLight() {
      return this.theme === "light";
    },
  },
  created() {},
  mounted() {
    this.dbShow = debounce(this.mouseOver, 300, {
      leading: false, // 指定在延迟开始前调用
      trailing: true, // 指定在延迟结束后调用
    });

    // requestUrl的备选方案
    if (!this.baseUrl) {
      let isProd = window.location.origin.includes("https://shandianyun");
      this.baseUrl = isProd ? this.baseUrlObj.prod : this.baseUrlObj.dev;
    }

    this.getAllList();
  },
  methods: {
    setConfigParam(config) {
      let _this = this;

      const { module_is_show_shortcut, logo, color = {} } = config;
      const {
        module_big_logo_url,
        module_small_logo_url,
        module_is_show_logo,
      } = logo;
      const { module_sidebar_background_color = "#001529" } = color;
      this.showSwitch = module_is_show_shortcut === 1;
      _this.maxLogo = module_big_logo_url;
      _this.minLogo = module_small_logo_url;
      _this.sideBgColor = module_sidebar_background_color;
    },

    simplifyArray(list) {
      const simple = (data) =>
        data.map(({ id, type, color_ico, name, opentype, open_url }) => ({
          id,
          type,
          color_ico,
          name,
          opentype,
          open_url,
        }));

      return simple(list);
    },
    getAllList() {
      this.leftArea = [];
      this.centerArea = [];
      this.commonArea = [];

      getModules(this.baseUrl).then((res) => {
        if (res.status === 200) {
          const moduleData = res.data.data.module;
          moduleData.forEach((item) => {
            item.modules = this.simplifyArray(item.modules);
            switch (item.type) {
              case 1:
                this.leftArea.push(item);
                break;
              case 2:
                this.centerArea.push(item);
                break;
              case 1000:
                this.commonArea.push(item);
                break;
            }
          });
        } else {
          this.$Message.error("九宫格列表获取失败");
        }
      });
    },
    handleArrowClick() {
      this.modalShow = !this.modalShow;
    },
    mouseOver() {
      if (this.collapsed) return;

      this.modalShow = true;
    },
    mouseLeave() {
      if (this.collapsed) return;

      this.modalShow = false;
    },
    goBackLogin() {
      this.$emit("on-back");
    },
    handleClick(id, opentype, open_url) {
      if (opentype === "1") {
        getSyncGridUrl(id, this.baseUrl)
          .then((resp) => {
            if (resp.status == 200) {
              window.location.href = resp.data.data;
            } else {
              this.$Message.info("发生错误");
            }
          })
          .catch((resp) => {
            console.log(resp);
          });
      } else if (opentype === "2") {
        // console.log('2跳转', open_url)
        window.location.href = open_url;
      } else if (opentype === "3") {
        // console.log('3跳转', '/selfshow')
        this.$router.push({
          path: "/selfshow",
        });
      } else if (opentype === "4") {
        getSyncGridUrl(id, this.baseUrl)
          .then((resp) => {
            // console.log('4跳转', resp)
            if (resp.status == 200) {
              // window.location.href = resp.data.data;
              window.open(resp.data.data, "_blank");
            } else {
              this.$Message.info("发生错误");
            }
          })
          .catch((resp) => {
            console.log(resp);
          });
      }
    },
  },
};
</script>
