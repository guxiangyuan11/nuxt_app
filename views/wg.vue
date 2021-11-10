<template>
  <div class="page">
    <div class="doo-header">
      测试
      <Dropdown
        :dropdown-menu="dropdownMenu"
        :is-solid="false"
        :is-share="true"
        class="doo-fr"
        @command="command"
      />
    </div>
    <div class="doo-main" style="height: 130vh;"></div>
  </div>
</template>
<script>
import Dropdown from '@/components/Dropdown'
export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      dropdownMenu: [
        {
          name: '首页',
          url: '',
          icon: 'https://img10.dgg.cn/ptwap/dropdown-icon-sy.png',
        },
        {
          name: '分类',
          url: '',
          icon: 'https://img10.dgg.cn/ptwap/dropdown-icone-fl.png',
        },
        {
          name: '搜索',
          url: '',
          icon: 'https://img10.dgg.cn/ptwap/dropdown-icone-ss.png',
        },
        {
          name: '购物车',
          url: '',
          icon: 'https://img10.dgg.cn/ptwap/dropdown-icone-gwc.png',
        },
        {
          name: '我的',
          url: '',
          icon: 'https://img10.dgg.cn/ptwap/dropdown-icone-wd.png',
        },
      ],
    }
  },
  methods: {
    command(item) {
      console.log(item)
    },
  },
  head() {
    return {
      meta: [
        {
          property: 'og:image',
          content:
            'https://wx3.sinaimg.cn/mw690/ad1685d9ly1gh0wqr6dm2j21o01o01ky.jpg',
        },
      ],
    }
  },
}
</script>
<style lang="stylus" scoped>
.doo-header{
  height : 88px;
  line-height : 88px;
  background: #fff;
  font-size : 28px;
  padding : 0 24px;
  background-color : red;
  position : fixed;
  top : 0;
  left : 0;
  right : 0;
}
.doo-fr{
  float : right ;
}
</style>
