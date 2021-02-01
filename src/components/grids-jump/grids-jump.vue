<template>
  <div class="change-modal" @mouseover="dbShow" @mouseleave="mouseLeave">
    <!-- <div class="down-arrow"></div> -->

    <div class="logo-con" @click="backLogin">
      <img v-show="!collapsed" class="logo-img" src="../../assets/images/logo.jpg" key="max-logo" />
      <div v-show="!collapsed" class="down-arrow"></div>
      <img
        v-show="collapsed"
        class="logo-img"
        src="../../assets/images/logo-min.jpg"
        key="min-logo"
      />
    </div>

    <div class="modals elementToFadeInAndOut" v-show="modalShow">
      <div
        class="per-card"
        v-for="({ id, icon, name, opentype, open_url }, index) in gridsList"
        :key="id"
        @click="handleClick(id, opentype, open_url)"
      >
        <div class="imgs" :style="{ backgroundColor: gridsColorInfo[index % 7] }">
          <img :src="icon" :alt="name" />
        </div>
        <p class="module-name">{{ name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import './grids-jump.less';
import { getGridsList, getSyncGridUrl } from '@/api/grids';
import { debounce } from 'lodash';

export default {
  name: 'grids-jump',
  props: {
    // 折叠
    collapsed: {
      type: Boolean,
      default: true,
    },
    env: {
      type: String,
      default: 'dev', // dev | test | prod
    },
  },
  data() {
    return {
      baseUrlObj: {
        dev: '',
        test: 'http://user.shandian.design',
        prod: 'https://shandianyun.iqilu.com',
      },
      baseUrl: '',
      gridsList: [],
      modalShow: false,
      gridsColorInfo: ['#6b77fa', '#bb75f2', '#0edabb', '#ff818f', '#6dd384', '#05a4f9', '#945eff'],
      dbShow: {},
    };
  },
  watch: {
    env: {
      handler(val) {
        this.baseUrl = this.baseUrlObj[val];
      },
      immediate: true,
    },
  },
  mounted() {
    this.dbShow = debounce(this.mouseOver, 300, false);
    this.baseUrl = this.baseUrlObj[this.env] || '';
    console.log('当前接口请求地址', this.baseUrl);
    this.getAllList();
  },
  methods: {
    getAllList() {
      getGridsList(this.baseUrl).then((res) => {
        console.log('九宫格列表', res.data.data);
        if (res.status === 200) {
          let list = res.data.data || [];
          this.gridsList = list
            .filter(({ is_pc_nav }) => is_pc_nav === '1')
            .sort((a, b) => a.pc_weight - b.pc_weight)
            .map(({ id, icon, name, opentype, open_url }) => ({
              id,
              icon,
              name,
              opentype,
              open_url,
            }));
        } else {
          this.$Message.error('九宫格列表获取失败');
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

      setTimeout(() => {
        this.modalShow = false;
      }, 400);
    },
    backLogin() {
      console.log('返回首页');
      this.$emit('back-login');
    },
    handleClick(id, opentype, open_url) {
      console.log('handleClick', id, opentype);

      if (opentype === '1') {
        getSyncGridUrl(id, this.baseUrl)
          .then((resp) => {
            console.log('1跳转', resp);
            if (resp.status == 200) {
              console.log('resp.data.data', resp.data.data);
              window.location.href = resp.data.data;
            } else {
              this.$Message.info('发生错误');
            }
          })
          .catch((resp) => {
            console.log(resp);
          });
      } else if (opentype === '2') {
        console.log('2跳转', open_url);
        window.location.href = open_url;
      } else if (opentype === '3') {
        console.log('3跳转', '/selfshow');
        this.$router.push({
          path: '/selfshow',
        });
      } else if (opentype === '4') {
        getSyncGridUrl(id, this.baseUrl)
          .then((resp) => {
            console.log('4跳转', resp);
            if (resp.status == 200) {
              console.log('resp.data.data', resp.data.data);
              // window.location.href = resp.data.data;
              window.open(resp.data.data, '_blank');
            } else {
              this.$Message.info('发生错误');
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
