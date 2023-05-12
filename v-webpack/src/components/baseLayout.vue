<!-- 菜单首页 -->
<template>
  <div style="overflow: hidden;">
    <div class="top">
      <v-head></v-head>
    </div>
    <!-- 左侧菜单 -->
    <div class="left">
      <side-bar></side-bar>
    </div>
    <!-- 右侧内容 -->
    <div class="box">
      <!-- 开关操作区 -->
      <div class="operate">
        <div class="operate-content">
          <div @click="handleIconClick" class="operate-content-icon">
            <el-icon :class="[{'el-icon-arrow-left': status, 'el-icon-arrow-right': !status}, 'operate-content-icon-arrow']"></el-icon>
          </div>
        </div>
      </div>
      <!-- 路由展示主内容区 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import sideBar from '@/components/sidebar/index';
import vHead from '@/components/head/index';

export default {
  name: 'BASE_LAYOUT',
  components: { sideBar, vHead },
  data() {
    return {
      status: true,
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 展示/隐藏菜单栏
     */
    handleIconClick() {
      let box = document.querySelector('.box');
      let left = document.querySelector('.left');
      if(this.status) {
        box.style.paddingLeft = '0';
        left.style.left = '-250px';
      } else {
        box.style.paddingLeft = '252px';
        left.style.left = '0';
      }
      this.status = !this.status;
    },
  }
}
</script>
<style lang='scss' scoped>
.top {
  height: 50px;
}
.left {
  overflow: hidden;
  height: calc(100vh - 50px);
  width: 250px;
  position: absolute;
  left: 0;
  top: 50px;
  background-color: #f3f3f3;
  transition: all 0.5s;
}
.content {
  overflow: hidden;
  background-color: #f3f3f3;
  margin-left: 20px;
  height: calc(100vh - 50px);;
}
.box::after {
  clear: both;
  content: '';
}
.operate {
  background: #f3f3f3;
  float: left;
  width: 18px;
}
.operate-content {
  border-radius: 10px;
  background-color: white;
  height: calc(98vh - 50px);
  width: 12px;
  margin-top: 1vh;
  margin-left: 3px;
}
.operate-content:hover {
  cursor: pointer;
}
.operate-content-icon {
  top: 50%;
  position: relative;
  transform: translateY(-50%);
  text-align: center;
  background: #5e8de3;
  border-radius: 5px;
  height: 30px;
  width: 8px;
  left: 2px;
  line-height: 30px;
  font-size: 12px;
  &-arrow {
    margin-left: -2px;
    font-size: 4px;
    color: white;
  }
}
.box {
  padding-left: 252px;
  height: calc(100vh - 50px);;
  background: #f3f3f3;
  transition: all 0.5s;
}
</style>
