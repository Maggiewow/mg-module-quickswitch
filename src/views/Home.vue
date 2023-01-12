<!--
 * @Author: your name
 * @Date: 2020-07-23 09:48:43
 * @LastEditTime: 2023-01-11 17:57:07
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \sucai-modal\src\views\Home.vue
-->
<template>
  <div class="comps">
    <div class="home comp-grids">
      <grids-jump
        :collapsed="collapsed"
        theme="dark"
        :themeConfig="darkThemeConfig"
        @on-back="backLogin"
        :requestUrl="baseRegion"
      ></grids-jump>
    </div>
    <div class="home comp-grids comp-grids-light">
      <grids-jump
        :collapsed="collapsed"
        theme="light"
        :themeConfig="lightThemeConfig"
        @on-back="backLogin"
        :requestUrl="baseRegion"
      ></grids-jump>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GridsJump from '@/components/grids-jump'

export default {
  name: 'Home',
  components: {
    GridsJump,
  },
  data() {
    return {
      collapsed: false,
      baseRegion: 'https://user.shandian8.com',
      darkThemeConfig: {
        module_is_show_theme: 'dark',
        module_is_show_shortcut: 1,
        color: {
          module_sidebar_background_color: '#4a5b71',
          module_sidebar_background_image: 'null',
          module_sidebar_active_color: '#404f63',
          module_sidebar_font_color: '#b795ec',
        },
        logo: {
          module_is_show_logo: 1,
          module_small_logo_url:
            'https://img12.shandian8.com/system_config/1/2023/01/11/d0f9e7f04381a5329fe48e2f0f0bb455.jpg',
          module_big_logo_url:
            'https://img12.shandian8.com/system_config/1/2023/01/11/24f85099210f50aea85159e705e00440.png',
        },
      },
      lightThemeConfig: {
        module_is_show_theme: 'light',
        module_is_show_shortcut: 1,
        color: {
          module_sidebar_background_color: '#fff',
          module_sidebar_background_image: 'null',
          module_sidebar_active_color: '#f0faff',
          module_sidebar_font_color: '#2d8cf0',
        },
        logo: {
          module_is_show_logo: 1,
          module_small_logo_url:
            'https://img12.shandian8.com/system_config/1/2023/01/11/d0f9e7f04381a5329fe48e2f0f0bb455.jpg',
          module_big_logo_url:
            'https://img12.iqilu.com/1/sucaiku/202104/25/ee017c1fe86344d3a32ecc03bfd00f9a.png',
        },
      },
    }
  },
  mounted() {},
  methods: {
    backLogin() {
      console.log('home页面--返回首页')
    },
  },
}
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
