<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'tst'
    }
  },
  mounted() {
    debugger
    console.log(this._data.message);
    const test = '1.2.3.5'.split('.');

    const tt = test[2]
  }
  // <img src="./assets/logo.png">
  //   <router-view/>
}
</script>

<style>

</style>
