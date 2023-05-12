<template>
  <div class="mark">
    <el-input :key="i" v-for="(e, i) in text" style="margin-bottom: 8px;" v-model="text[i]"></el-input>
    <div class="mark-p" v-warnWord="text" warnWordConfig="warnWordConfig">
      <span :key="i" v-for="(e, i) in text">{{ e }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: [`振兴大道警方派出所将行政处罚报告上报翠屏公安分局法制科审核后，认为周氏父子在冲突中还手也应构成结伙殴打他人，建议重新对周氏父子进行处罚，
        振兴大道派出所遂作出了对两人分别行政拘留10天、罚款500元的处罚决定。`,`振兴大道警方派出所将行政处罚报告上报翠屏公安分局法制科审核后，认为周氏父子在冲突中还手也应构成结伙殴打他人，建议重新对周氏父子进行处罚，
        振兴大道派出所遂作出了对两人分别行政拘留10天、罚款500元的处罚决定。`],
      warnWordConfig: {
        words: [
          {
            type: 'forbid',
            word: '行政',
            desc: '行政也敢写？'
          },
          {
            type: 'warning',
            word: '警方',
            desc: '警方少写！'
          },
          {
            type: 'warning',
            word: '公安',
            desc: '公安同上！'
          }
        ]
      },
    }
  }
}
</script>
<style scoped lang="scss">
.mark {
  background: white;
  margin:8px 0;
  border-radius: 5px;
  height: calc(100% - 16px);
  padding: 16px;
  &-p {
    text-indent: 30px;
    line-height: 24px;
  }
}
</style>
