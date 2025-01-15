<template>
  <div class="content">
    <div class="vueTestCardWrap">
      <div :key="e" v-for="e in cardList" class="cardItem">
        <div class="children">
          <div>我来组成头部</div>
          <div>我来组成身体</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cardList: Array(30).fill().map((_, i) => i + 1)
    }
  }
}
</script>
<style lang="scss">
  @media screen and (min-width: 2160px) {
    .vueTestCardWrap {
      grid-template-columns: repeat(auto-fit, 228px);
    }
  }
  @media screen and (max-width: 2159px) and (min-width: 1920px) {
    .vueTestCardWrap {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
  }
  @media screen and (max-width: 1919px) and (min-width: 1680px) {
    .vueTestCardWrap {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
  }
  @media screen and (max-width: 1679px) and (min-width: 1440px) {
    .vueTestCardWrap {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
  @media screen and (max-width: 1439px) and (min-width: 1139px) {
    .vueTestCardWrap {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  @media screen and (max-width: 1138px) and (min-width: 841px) {
    .vueTestCardWrap {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media screen and (max-width: 840px) {
    .vueTestCardWrap {
      grid-template-columns: repeat(auto-fit, 228px);
    }
  }
</style>
<style scoped lang="scss">
.content {
  overflow: auto;
  height: 100vh;
  background: #f5f5f5;
}
.vueTestCardWrap {
  padding: 12px;
  display: grid;
  row-gap: 12px;
  column-gap: 12px;
  .cardItem {
    &:hover {
      // h 水平阴影 v 垂直阴影 blur 模糊距离 spread 阴影扩展尺寸 color 颜色
      box-shadow: 0 3px 10px #0000001a;
      transform: perspective(10px) scale(1.01);
      .iconContent {
        display: flex;
        cursor: pointer;
      }
    }
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 10px;
    background: #fff;
    .children {
      padding: 12px;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 90%;
      height: 92%;
    }
  }
  .cardItem::after {
    content: "";
    display: block;
    padding-top: 125%; /* 这是用来保持宽高比例为1.25：1 */
  }
}
</style>