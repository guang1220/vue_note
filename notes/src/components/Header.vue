<template>
  <div class="header" >
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item>
        <i class="iconfont icon-biji"></i>
        <span class="Notes">Notes</span>
      </el-menu-item>
      <el-menu-item class="searchInput">
        <el-input v-model="searchWord" placeholder="请输入内容" size="medium" @change="search"></el-input>
        <el-button size="small" icon="el-icon-search" @click="search">搜索</el-button>
      </el-menu-item>
<!--      <el-menu-item class="menu-item" index="0">Notes</el-menu-item>-->
<!--      <el-menu-item class="menu-item" index="1">归档</el-menu-item>-->
<!--      <el-menu-item class="menu-item" index="2">个人中心</el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>

export default {
  name: "Header",

  data() {
    return {
      activeIndex: '0',
      searchWord:''
    }
  },
  methods:{
    handleSelect(key, keyPath) {
    },
    search(){
      this.$emit('search',this.searchWord)
    }
  }
}
</script>

<style lang="css" scoped>
@import "../assets/css/header.css";
</style>
