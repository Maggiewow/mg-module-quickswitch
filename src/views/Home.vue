<!--
 * @Author: your name
 * @Date: 2020-07-23 09:48:43
 * @LastEditTime: 2021-01-11 09:56:35
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \sucai-modal\src\views\Home.vue
-->
<template>
  <div class="home comp-grids">
    <grids-jump evn="dev"></grids-jump>
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
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
@import url('../assets/css/common.css');

.comp-grids {
  background-color: #001529;
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
}
</style>
