<!--
 * @Author: your name
 * @Date: 2020-07-23 09:48:43
 * @LastEditTime: 2021-05-10 14:37:29
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \sucai-modal\src\views\Home.vue
-->
<template>
  <div class="comps">
    <div class="home comp-grids">
      <grids-jump :collapsed="collapsed" theme="dark" @on-back="backLogin" evn="dev"></grids-jump>
    </div>
    <div class="home comp-grids comp-grids-light">
      <grids-jump :collapsed="collapsed" theme="light" @on-back="backLogin" evn="dev"></grids-jump>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GridsJump from '@/components/grids-jump';

export default {
  name: 'Home',
  components: {
    GridsJump,
  },
  data() {
    return { collapsed: false };
  },
  mounted() {},
  methods: {
    backLogin() {
      console.log('home页面--返回首页');
    },
  },
};
</script>

<style scoped>
@import url('../assets/css/common.css');

.comps {
  display: flex;
  /* justify-content: space-around; */
}
.comp-grids {
  background-color: #001529;
  /* background-color: #fff; */
  width: 257px;
  min-height: 64px;
  display: flex;
  justify-content: center;
}
.comp-grids-light {
  background-color: #fff;
}
</style>
