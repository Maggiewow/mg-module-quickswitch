<!--
 * @Author: your name
 * @Date: 2020-07-23 09:48:43
 * @LastEditTime: 2020-11-23 14:37:41
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \sucai-modal\src\views\Home.vue
-->
<template>
  <div class="home comp-grids">
    <grids-jump :gridsInfo="gridsList"></grids-jump>
  </div>
</template>

<script>
// @ is an alias to /src
import GridsJump from '@/components/grids-jump';
import { mockGridsInfo } from '@/libs/constant';

export default {
  name: 'Home',
  components: {
    GridsJump,
  },
  data() {
    return {
      gridsList: [],
    };
  },
  mounted() {
    let grids = mockGridsInfo;
    this.gridsList = grids
      .filter(({ is_pc_nav }) => is_pc_nav === '1')
      .sort((a, b) => a.pc_weight - b.pc_weight)
      .map(({ id, icon, name, opentype, open_url }) => ({
        id,
        icon,
        name,
        opentype,
        open_url,
      }));
    console.log('this.gridsList', this.gridsList);
  },
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
