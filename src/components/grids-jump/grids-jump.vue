<template>
  <div class="change-modal">
    <p :class="['down-arrow', modalShow ? 'modal-show' : '']" @click="handleArrowClick"></p>
    <div class="modals" v-show="modalShow">
      <div
        class="per-card"
        v-for="({ id, icon, name, opentype, open_url }, index) in gridsInfo"
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
import axios from '@/libs/api.request';
import './grids-jump.less';
// import { getSyncGridUrl } from '@/api/grids';

export default {
  name: 'grids-jump',
  props: {
    gridsInfo: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      modalShow: false,
      gridsColorInfo: ['#6b77fa', '#bb75f2', '#0edabb', '#ff818f', '#6dd384', '#05a4f9', '#945eff'],
    };
  },

  //利用计算属性 监听store
  // computed: {
  //   showCover() {
  //     return this.$store.state.showCover;
  //   }
  // },
  // //监听执行
  // watch: {
  //   showCover(val) {
  //     this.modalShow = val;
  //   }
  // },
  methods: {
    handleArrowClick() {
      this.modalShow = !this.modalShow;
    },
    handleClick(id, opentype, open_url) {
      // console.log("handleClick", id, opentype);

      if (opentype === '1') {
        // getSyncGridUrl(id)
        //   .then((resp) => {
        //     if (resp.status == 200) {
        //       window.location.href = resp.data.data;
        //     } else {
        //       this.$Message.info('发生错误');
        //     }
        //   })
        //   .catch((resp) => {
        //     console.log(resp);
        //   });
      } else if (opentype === '2') {
        window.location.href = open_url;
      } else if (opentype === '3') {
        this.$router.push({
          path: '/selfshow',
        });
      }
    },
  },
};
</script>
