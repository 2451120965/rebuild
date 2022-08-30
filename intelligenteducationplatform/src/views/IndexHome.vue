<template>
  <div>
    <el-col :span="4">
    <el-menu     class="el-menu-vertical-demo" mode="vertical" @select="handleSelect"  background-color="#ffffff">
      <el-menu-item index="1">
        <router-link to="/workbench">工作台</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">sss</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>