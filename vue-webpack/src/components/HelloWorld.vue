<template>
  <div class="hello">
    <el-button @click="handleClick">改变状态</el-button>
    <slot-temp-vue ref="slot">
      <div slot="tt">
        <el-table :data="data">
          <el-table-column label="tst1" v-show="show">
            <template slot-scope="{ row }">
              {{ row.name + '现在' + row.age + '岁。' }}
              <span>{{ 'xxxxxx' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #tst>
        <div v-show="show">
          <el-table-column slot="tst" v-show="show" label="tst1">
            <template slot-scope="{ row }">
              {{ row.name + '现在' + row.age + '岁。' }}
              <span>{{ 'xxxxxx' }}</span>
            </template>
          </el-table-column>
        </div>
      </template>
    </slot-temp-vue>
  </div>
</template>

<script>
import slotTempVue from './slotTemp.vue';
export default {
  name: 'HelloWorld',
  components: { slotTempVue },
  data () {
    return {
      message: 'qqq',
      show: true,
      data: [{ name: 'tst', age: '2' }]
    }
  },
  methods: {
    handleClick() {
      console.log(this)
      this.show = !this.show;
      this.$nextTick(() => {
        this.$refs.slot.refreshTable();
      });
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
