/*
 * @Author: your name
 * @Date: 2020-08-13 10:13:33
 * @LastEditTime: 2020-11-23 16:24:38
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \ym-sucai-modal\src\components\index.js
 */
import GridsJump from './grids-jump';
GridsJump.install = function(Vue) {
  Vue.component(GridsJump.name, GridsJump);
};
export default GridsJump;
