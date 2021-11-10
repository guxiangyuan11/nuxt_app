<template>
  <div class="doo-dropdown">
    <div
      class="doo-dropdown-selfdefine"
      :style="{ height: height }"
      @click="openDropdownMenu"
    >
      <img :src="isSolid ? solidIcon : defaultIcon" />
    </div>
    <div v-show="isShow" class="doo-dropdown-menu">
      <div class="doo-dropdown-menu_item-arrw"></div>
      <div
        v-for="(item, index) in dropdownMenu"
        :key="index"
        class="doo-dropdown-menu_item"
        @click="optMenu(item)"
      >
        <img :src="item.icon" class="doo-dropdown-menu_item-icon" />
        {{ item.name }}
      </div>
      <div v-if="isShare" class="doo-dropdown-menu_item" @click="shareClick">
        <img
          src="https://img10.dgg.cn/ptwap/dropdown-icone-share.png"
          class="doo-dropdown-menu_item-icon"
        />
        分享
      </div>
    </div>
    <!-- 遮照层 -->
    <div
      class="doo-mask"
      :style="{ top: height, display: isShow ? 'block' : 'none' }"
      @click.stop="close"
    ></div>
    <!-- 分享 -->
    <div
      v-show="isShare && isShowShare"
      class="doo-share"
      @click.stop="closeShare"
    >
      <div class="doo-share-warp" @click.stop>
        <div class="doo-share-warp-content">
          <div class="doo-share-item" @click="share('wx')">
            <img
              class="doo-share-item__img"
              src="https://img10.dgg.cn/ptwap/share-icon-wx.png"
            />
            <div class="doo-share-item__text">微信好友</div>
          </div>
          <div class="doo-share-item" @click="share('wx-pel')">
            <img
              class="doo-share-item__img"
              src="https://img10.dgg.cn/ptwap/share-icon-wx-pel.png"
            />
            <div class="doo-share-item__text">微信朋友圈</div>
          </div>
          <div class="doo-share-item" @click="share('qq')">
            <img
              class="doo-share-item__img"
              src="https://img10.dgg.cn/ptwap/share-icon-qq.png"
            />
            <div class="doo-share-item__text">QQ好友</div>
          </div>
          <div class="doo-share-item" @click="share('sina')">
            <img
              class="doo-share-item__img"
              src="https://img10.dgg.cn/ptwap/share-icon-weibo.png"
            />
            <div class="doo-share-item__text">微博</div>
          </div>
          <div class="doo-share-item" @click="copyClick">
            <img
              class="doo-share-item__img"
              src="https://img10.dgg.cn/ptwap/share-icon-copy.png"
            />
            <div class="doo-share-item__text">复制链接</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mand-mobile'
export default {
  name: 'Dropdown',
  props: {
    isSolid: {
      type: Boolean,
      default: false,
    },
    isShare: {
      type: Boolean,
      default: true,
    },
    dropdownMenu: {
      type: Array,
      default: () => {
        return []
      },
    },
    height: {
      type: String,
      default: '0.88rem',
    },
  },
  data() {
    return {
      isShow: false,
      defaultIcon: 'https://img10.dgg.cn/ptwap/dropdown-icone-more.png',
      solidIcon: 'https://img10.dgg.cn/ptwap/dropdown-icone-more-solid.png',
      isShowShare: false,
      url: '',
      title: '',
      summary: '',
      pics: '',
    }
  },
  mounted() {
    this.title = document.title
    this.url = window.getUtmUrl()
    // 获取描述
    if (document.querySelector('meta[name="description"]')) {
      this.summary = document
        .querySelector('meta[name="description"]')
        .getAttribute('content')
    }
    // 获取分享图片
    if (document.querySelector('meta[property="og:image"]')) {
      this.pics = document
        .querySelector('meta[property="og:image"]')
        .getAttribute('content')
        ? document
            .querySelector('meta[property="og:image"]')
            .getAttribute('content')
        : ''
    }
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const _this = this
      setTimeout(() => {
        _this.isShow = false
      }, 0)
    },
    openDropdownMenu() {
      this.isShow = !this.isShow
    },
    optMenu(item) {
      this.isShow = !this.isShow
      this.$emit('command', item)
    },
    close() {
      this.isShow = !this.isShow
    },
    shareClick() {
      // 显示选择分享功能
      this.isShow = !this.isShow
      this.isShowShare = true
    },
    closeShare() {
      this.isShowShare = false
    },
    share(type) {
      // 微信好友分享
      if (type === 'wx') {
        Toast.info('请用浏览器自带分享功能分享！')
      }
      // 微信朋友圈分享
      if (type === 'wx-pel') {
        Toast.info('请用浏览器自带分享功能分享！')
      }
      // 新浪微博接口的传参
      if (type === 'sina') {
        window.open(
          'http://service.weibo.com/share/share.php?url=' +
            encodeURIComponent(this.url) +
            '?sharesource=weibo&title=' +
            this.title +
            '&pic=' +
            this.pics
        )
      }
      // qq好友接口的传参
      if (type === 'qq') {
        window.open(
          'http://connect.qq.com/widget/shareqq/index.html?url=' +
            encodeURIComponent(this.url) +
            '?sharesource=qzone&title=' +
            this.title +
            '&summary=' +
            this.summary +
            '&pics=' +
            this.pics
        )
      }
      this.isShowShare = false
    },
    copyClick() {
      // 复制链接
      const clipBoardContent = this.url
      this.copy(clipBoardContent)
      this.isShowShare = false
      Toast.info('复制成功！')
    },
    copy(data) {
      // 添加复制内容
      const url = data
      const oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.remove()
    },
  },
}
</script>

<style lang="stylus" scoped>
.doo-dropdown-selfdefine{
  height : 88px;
  display : flex;
  align-items : center;
  img{
    height : 56px;
    width : 56px;
    text-align :center;
    border : none;
  }
}
.doo-mask{
  display : none;
  position: fixed;
  top: 88px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background:rgba(18,18,18,0.2);
}
.doo-dropdown-menu{
  position : fixed;
  top: 114px;
  right  : 24px;
  z-index : 100;
  min-width : 198px;
  background-color: #fff;
  box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  padding : 0 24px;
  box-sizing : border-box;
  border-radius : 8px;

  &_item{
    height : 88px;
    display : flex;
    align-items : center;
    font-size: 28px;
    color : #333333;
    border-bottom : 1px solid #EEEEEE;
    -webkit-tap-highlight-color: transparent;
    &:last-child{
      border-bottom: none;
    }
    &-icon{
      height 28px;
      width : 28px;
      margin-right : 16px;
      background-size : 28px 28px;
    }
    &-arrw{
      &:after{
        position: absolute;
        display: block;
        border-color: transparent;
        border-style: solid;
        content: " ";
        border-width: 14px;
        top: -14px;
        right : 20px;
        margin-left: -14px;
        border-top-width: 0;
        border-bottom-color: #ffffff;
      }
    }
  }
}

/** 分享 */
.doo-share{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background:rgba(18,18,18,0.2);
  .doo-share-warp{
    position : fixed;
    bottom : 0;
    left : 0 ;
    border-radius:24px 24px 0px 0px;
    width : 100%;
    height:234px;
    background-color : #ffffff;
    padding: 36px 24px 0;
    box-sizing : border-box;
    overflow: hidden;
    &-content{
      overflow-x : auto;
      overflow-y: hidden;
      width : 100%;
      white-space: nowrap;
      &::-webkit-scrollbar{
        display : none;
      }
    }
  }
  &-item{
    width 120px;
    display : inline-block ;
    margin-right : 32px;
    -webkit-tap-highlight-color: transparent;
    &:last-child{
      margin-right : 0;
    }
    &__img {
      width : 114px;
      height : 122px;
      margin : 0 auto;
      display : block;
    }
    &__text{
      font-size: 24px;
      color: #333333;
      line-height: 1em;
      text-align: center;
      margin-top : 10px;
    }
  }
}
</style>
