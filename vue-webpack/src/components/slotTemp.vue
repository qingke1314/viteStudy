<template>
  <div>
    <slot :msg="msg">default</slot>
    <slot :msg="msg" name="tt"></slot>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload">
       <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-table :key="tableKey" :data="data">
      <template v-for="(column, index) in columns">
        <slot :name="column.slot" v-if="column.slot"></slot>
        <el-table-column
          align="left"
          header-align="left"
          :label="column.title"
          :prop="column.prop"
          :width="column.width"
          v-else
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      tableKey: 'init',
      msg: 'Welcome to Your Vue.js App',
      columns: [
        { title: '名字', prop: 'name', width: '150' },
        { title: '年龄', prop: 'age', width: '150' },
        { slot: 'tst' },
        { title: '性别', prop: 'sex', width: '150' },
      ],
      data: [
        { name: 'ming', age: 8, sex: 'man' },
        { name: 'hong', age: 5, sex: 'women' },
        { name: 'gang', age: 3, sex: 'man' },
        { name: 'peng', age: 7, sex: 'man' },
      ],
    }
  },
  mounted() {
    this.tableKey = this.generateUUId();
  },
  methods: {
    beforeAvatarUpload(file) {
      console.log(file);
    },
    refreshTable() {
      this.$nextTick(() => {
        this.tableKey = this.generateUUId();
      });
    },
    generateUUId() {
      let s = [];
      let hexDigits = '0123456789abcdef';
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-';
      let uuid = s.join('');
      return uuid.replace(/-/g, '');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
