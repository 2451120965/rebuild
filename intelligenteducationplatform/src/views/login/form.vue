<template>
  <el-form ref="loginForm" :model="loginForm" auto-complete="on" label-position="left">
    <el-form-item prop="username" style="margin-top: 40px;">
      <el-input
        class="init-input"
        ref="username"
        placeholder="请输入帐号"
        prefix-icon="el-icon-user-solid"
        v-model="loginForm.username"
        name="username"
        type="text"
        tabindex="1"
        auto-complete="on"
      />
    </el-form-item>
    <el-form-item prop="password" style="margin-top: 30px;">
      <el-input
      	class="init-input"
      	ref="password"
      	placeholder="请输入密码"
      	prefix-icon="el-icon-lock"
      	v-model="loginForm.password"
      	type="password"
      	name="password"
      	tabindex="2"
      	auto-complete="on"
      />
    </el-form-item>
    <div class="" style="color: #3D73DD;line-height: 36px;text-align:end;font-size: 14px;">
      忘记密码？
    </div>
    <!-- @click.native.prevent="handleLogin" -->
    <el-button :loading="loading" type="primary" style="background-color: #3D73DD;color: #fff;width: 100%;font-size: 24px;height: 60px;border-radius: 30px;">登录</el-button>
    <div class="" style="line-height: 48px;width: 100%;font-size: 16px;text-align: center;">
      还没有帐号？点击<span style="color: #3D73DD;margin-left: 4px;">立即注册</span>
    </div>
  </el-form>
</template>

<script>
export default {

}
</script>

<style>

</style>