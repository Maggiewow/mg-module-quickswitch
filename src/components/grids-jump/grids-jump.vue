<template>
  <div
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
          src="https://img12.iqilu.com/1/sucaiku/202104/25/ee017c1fe86344d3a32ecc03bfd00f9a.png"
          key="max-logo"
        />
        <div v-show="!collapsed" class="light-arrow"></div>
      </template>
      <template v-else>
        <img
          v-show="!collapsed"
          class="logo-img"
          src="https://img12.iqilu.com/1/sucaiku/202102/03/db0b775182fb49f2af1557126470b0ce.png"
          key="max-logo"
        />
        <div v-show="!collapsed" class="down-arrow"></div>
      </template>
      <img
        v-show="collapsed"
        class="logo-img min-pic"
        src="@/assets/images/logo-min.jpg"
        key="min-logo"
      />
    </div>

    <!-- 浅色主题：light-modals -->
    <div
      :class="['modals', 'elementToFadeInAndOut', isLight ? 'light-modals' : '']"
      v-show="modalShow"
    >
      <!-- <div
        class="per-card"
        v-for="({ id, icon, name, opentype, open_url }, index) in gridsList"
        :key="id"
        @click="handleClick(id, opentype, open_url)"
      >
        <div class="imgs" :style="{ backgroundColor: gridsColorInfo[index % 7] }">
          <img :src="icon" :alt="name" />
        </div>
        <p class="module-name">{{ name }}</p>
      </div> -->

      <div v-for="item of commonArea" :key="item.id" class="partItem">
        <h2 class="col-title over_hide" :title="item.name">{{ item.name }}</h2>
        <div class="card-list">
          <div
            class="per-card"
            v-for="{ id, color_ico, name, opentype, open_url } in item.modules"
            :key="id"
            @click="handleClick(id, opentype, open_url)"
          >
            <img class="module-icon" :src="color_ico" :alt="name" />
            <p class="module-name">{{ name }}</p>
          </div>
        </div>
      </div>
      <div v-for="item of leftArea" :key="item.id" class="partItem">
        <h2 class="col-title over_hide" :title="item.name">{{ item.name }}</h2>
        <div class="card-list">
          <div
            class="per-card"
            v-for="{ id, color_ico, name, opentype, open_url } in item.modules"
            :key="id"
            @click="handleClick(id, opentype, open_url)"
          >
            <img class="module-icon" :src="color_ico" :alt="name" />
            <p class="module-name">{{ name }}</p>
          </div>
        </div>
      </div>
      <div v-for="item of centerArea" :key="item.id" class="partItem">
        <h2 class="col-title over_hide" :title="item.name">{{ item.name }}</h2>
        <div class="card-list">
          <div
            class="per-card"
            v-for="{ id, color_ico, name, opentype, open_url } in item.modules"
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
</template>

<script>
import './grids-jump.less'
import { getModules, getSyncGridUrl } from '@/api/grids'
import { debounce } from 'lodash'

export default {
  name: 'grids-jump',
  props: {
    // 折叠
    collapsed: {
      type: Boolean,
      default: false,
    },
    // 1.0.37开始 不再需要传参
    env: {
      type: String,
      default: 'test', // dev | test | prod
    },
    theme: {
      type: String,
      default: 'dark', // light dark
    },
    requestUrl: {
      type: String,
      default: 'https://shandianyun.iqilu.com',
    },
  },
  data() {
    return {
      baseUrlObj: {
        dev: '',
        test: 'https://user.shandian8.com',
        prod: 'https://shandianyun.iqilu.com',
      },
      baseUrl: '',
      gridsList: [],
      modalShow: false,
      gridsColorInfo: ['#6b77fa', '#bb75f2', '#0edabb', '#ff818f', '#6dd384', '#05a4f9', '#945eff'],
      dbShow: {},
      logoSrc: '',
      leftArea: [],
      centerArea: [],
      commonArea: [],
      isLight: false,
    }
  },
  watch: {
    // env: {
    //   handler(val) {
    //     this.baseUrl = this.baseUrlObj[val];
    //   },
    //   immediate: true,
    // },
    theme: {
      handler(str = 'dark') {
        if (str === 'light') {
          this.logoSrc =
            'https://img12.iqilu.com/1/sucaiku/202104/25/ee017c1fe86344d3a32ecc03bfd00f9a.png'
        } else if (str === 'dark') {
          this.logoSrc =
            'https://img12.iqilu.com/1/sucaiku/202102/03/db0b775182fb49f2af1557126470b0ce.png'
        }

        this.isLight = str === 'light'
      },
      immediate: true,
    },
    requestUrl: {
      handler() {
        this.baseUrl = this.requestUrl
      },
      immediate: true,
    },
  },
  created() {
    // 改进：不根据传入的环境env来判断（容易传错参数） 自己获取 window.location.origin
    // 2022/12/26 接口域名不根据env判断 改为props传入
    // let isProd = window.location.origin.includes('https://shandianyun');
    // this.baseUrl = isProd ? this.baseUrlObj.prod : this.baseUrlObj.dev;
    // console.log('当前接口请求地址', this.baseUrl);
  },
  mounted() {
    this.dbShow = debounce(this.mouseOver, 300, {
      leading: false, // 指定在延迟开始前调用
      trailing: true, // 指定在延迟结束后调用
    })
    // this.baseUrl = this.baseUrlObj[this.env] || '';
    // requestUrl的备选方案
    if (!this.baseUrl) {
      let isProd = window.location.origin.includes('https://shandianyun')
      this.baseUrl = isProd ? this.baseUrlObj.prod : this.baseUrlObj.dev
    }

    this.getAllList()
  },
  methods: {
    // getAllList1() {
    //   getGridsList(this.baseUrl).then((res) => {
    //     console.log('九宫格列表', res.data.data);
    //     if (res.status === 200) {
    //       let list = res.data.data || [];
    //       this.gridsList = list
    //         .filter(({ is_pc_nav }) => is_pc_nav === '1')
    //         .sort((a, b) => a.pc_weight - b.pc_weight)
    //         .map(({ id, icon, name, opentype, open_url }) => ({
    //           id,
    //           icon,
    //           name,
    //           opentype,
    //           open_url,
    //         }));
    //     } else {
    //       this.$Message.error('九宫格列表获取失败');
    //     }
    //   });
    // },
    simplifyArray(list) {
      const simple = (data) =>
        data.map(({ id, type, color_ico, name, opentype, open_url }) => ({
          id,
          type,
          color_ico,
          name,
          opentype,
          open_url,
        }))

      return simple(list)
    },
    getAllList() {
      this.leftArea = []
      this.centerArea = []
      this.commonArea = []

      getModules(this.baseUrl).then((res) => {
        if (res.status === 200) {
          const moduleData = res.data.data.module
          console.log('九宫格列表', moduleData)
          moduleData.forEach((item) => {
            item.modules = this.simplifyArray(item.modules)
            switch (item.type) {
              case 1:
                this.leftArea.push(item)
                break
              case 2:
                this.centerArea.push(item)
                break
              case 1000:
                this.commonArea.push(item)
                break
            }
          })
          console.log('moduleData', this.leftArea, this.centerArea, this.commonArea)
        } else {
          this.$Message.error('九宫格列表获取失败')
        }
      })
    },
    handleArrowClick() {
      this.modalShow = !this.modalShow
    },
    mouseOver() {
      if (this.collapsed) return

      this.modalShow = true
    },
    mouseLeave() {
      if (this.collapsed) return

      this.modalShow = false
    },
    goBackLogin() {
      this.$emit('on-back')
    },
    handleClick(id, opentype, open_url) {
      console.log('handleClick', id, opentype)
      if (opentype === '1') {
        getSyncGridUrl(id, this.baseUrl)
          .then((resp) => {
            console.log('1跳转', resp)
            if (resp.status == 200) {
              window.location.href = resp.data.data
            } else {
              this.$Message.info('发生错误')
            }
          })
          .catch((resp) => {
            console.log(resp)
          })
      } else if (opentype === '2') {
        console.log('2跳转', open_url)
        window.location.href = open_url
      } else if (opentype === '3') {
        console.log('3跳转', '/selfshow')
        this.$router.push({
          path: '/selfshow',
        })
      } else if (opentype === '4') {
        getSyncGridUrl(id, this.baseUrl)
          .then((resp) => {
            console.log('4跳转', resp)
            if (resp.status == 200) {
              console.log('resp.data.data', resp.data.data)
              // window.location.href = resp.data.data;
              window.open(resp.data.data, '_blank')
            } else {
              this.$Message.info('发生错误')
            }
          })
          .catch((resp) => {
            console.log(resp)
          })
      }
    },
  },
}
</script>
