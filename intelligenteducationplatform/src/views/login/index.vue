<template>
  <div class="login-con">
    <div class="l-c">
      <el-row>
        <el-col :xs="24" :sm="24" :md="10" :lg="10" class="l-c-l">
          <div class="carousel">
            <div class="carousel-title">小黑学习智能教育平台</div>
            <img class="carousel-img" src="@/assets/login/lgicon.png" alt="" />
          </div>
        </el-col>
        <el-col class="l-c-r" :xs="24" :sm="24" :md="14" :lg="14">
          <div class="login-form">
            <el-tabs :stretch="true" @tab-click="handleClick">
              <el-tab-pane label="密码登录" class="accountlogin">
                <!-- 账号密码登录表单 -->
                <el-form
                  ref="pwdLoginFormRef"
                  :model="pwdLoginForm"
                  auto-complete="on"
                  label-position="left"
                  :rules="accountRules"
                >
                  <!-- 用户名 -->
                  <el-form-item prop="username">
                    <el-input
                      class="init-input"
                      ref="username"
                      placeholder="请输入手机号码"
                      clearable
                      prefix-icon="el-icon-user-solid"
                      v-model="pwdLoginForm.username"
                      name="username"
                      type="text"
                      tabindex="1"
                      auto-complete="on"
                      @keyup.enter.native="keyupaccount"
                      autofocus
                      @keydown.native="keydownbelow"
                    />
                  </el-form-item>
                  <!-- 密码 -->
                  <el-form-item prop="password" style="margin-top: 30px">
                    <el-input
                      class="init-input"
                      ref="password"
                      placeholder="请输入密码"
                      prefix-icon="el-icon-lock"
                      v-model="pwdLoginForm.password"
                      type="password"
                      name="password"
                      tabindex="2"
                      auto-complete="on"
                      @keyup.enter.native="login"
                    />
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="验证码登录">
                <!-- 手机验证码登录表单 -->
                <el-form
                  ref="codeLoginFormRef"
                  status-icon
                  :model="codeLoginForm"
                  :rules="codeLoginFormRules"

                >
                  <!-- 手机号码 -->
                  <el-form-item prop="phone">
                    <el-input
                      class="init-input"
                      ref="phone"
                      placeholder="请输入手机号码"
                      clearable
                      prefix-icon="el-icon-user-solid"
                      v-model.number="codeLoginForm.phone"
                      name="phone"
                      type="text"
                      tabindex="1"
                      auto-complete="on"
                      @keyup.enter.native="keyupPhone"
                    ></el-input>
                  </el-form-item>
                  <!-- 手机验证码 -->
                  <el-form-item prop="phoneCode">
                    <div class="checkcode">
                      <el-input
                        class="init-input codeinput"
                        ref="phoneCode"
                        placeholder="请输入验证码"
                        prefix-icon="el-icon-lock"
                        v-model="codeLoginForm.phoneCode"
                        type="text"
                        name="phoneCode"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter.native="login"
                      >
                      </el-input>
                      <el-button
                        size="small"
                        type="primary"
                        class="button"
                        :disabled="!showSend"
                        @click="sendCode"
                        >{{
                          showSend ? "获取验证码" : `${count}s后重新获取`
                        }}</el-button
                      >
                    </div>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <!-- <el-tab-pane
                label="微信登录"
                style="font-size: 24px"
                class="wexinlogin"
              >
                图片
              </el-tab-pane> -->
            </el-tabs>
            <div class="code" v-if="loginWay === 'pw'">
              <a class="forgotcode" style="cursor:pointer" @click="remember">忘记密码?</a>
            </div>
            <!-- @click.native.prevent="handleLogin" -->
            <el-button
              :loading="loading"
              type="primary"
              class="loginbutton"
              @click="login"
            >
              登&nbsp;&nbsp;&nbsp;录</el-button
            >

            <div class="hasaccount" v-if="loginWay === 'pw'" style="cursor:pointer" @click="register">
              还没有帐号 ？ 点击<span style="color: #3d73dd; margin-left: 4px"
                >立即注册</span
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Login, Sendloginsms, Smstologin } from "@/api/user.js";
import { _throttle } from "@/utils/auth.js"; //节流函数
import { phoneRules, accountRules } from "./config/loginrules.js";
import {
  showFullScreenLoading,
  hideFullScreenLoading,
} from "@/utils/loading.js";

export default {
  name: "login",
  data() {
    return {
      pwdLoginForm: {
        distinction: "p",
        rememberme: true,
        username: "",
        password: "",
        sms: "",
      },
      codeLoginForm: {
        phone: "",
        phoneCode: "",
      },

      showSend: true,
      loading: false,
      loginWay: "pw",
      codeLoginFormRules: phoneRules,
      accountRules: accountRules,
      count: "",
    };
  },
  methods: {
    keyupaccount(){
      this.$refs.password.focus();
    },
    keyupPhone(){
      this.$refs.phoneCode.focus();
    },
    keydownbelow(el){
     if(el && el.keyCode == 40){
      if(this.loginWay == "pw") this.$refs.password.focus();
      else if(this.loginWay=="phone") this.$refs.phoneCode.focus();
     }
    },
    handleClick(tab) {
      if (tab.label === "密码登录") this.loginWay = "pw";
      else if (tab.label === "验证码登录") {
      this.loginWay = "phone";
      this.$refs.phone.focus();
      }else {
        this.loginWay = "weixin";
      }
    },
    register(){
      //this.$router.push("/register");
      this.$router.push({ name:'register'})
    },
    remember(){
      this.$router.push('/remember')
    },
    //登录方法
    login: _throttle(function () {
      if (this.loginWay === "pw") {
        this.$refs.pwdLoginFormRef.validate((valid) => {
          if (valid) {
            // form=this.pwdLoginForm;
            let form = {
              username: this.pwdLoginForm.username,
              password: this.pwdLoginForm.password,
              distinction: "p",
              rememberme: true,
            };
            //发送网络请求
            showFullScreenLoading("#app", "登录中");
            //login函数作用把验证过的登录信息发送给后端 后端返回该用户信息
            Login(form)
              .then((res) => {
                hideFullScreenLoading();
                if (res.code === 200) {
                  this.src = res.result.avatar;
                  this.$store.commit("user/SET_TOKEN", res.result.password);
                  let userInfo = {
                    id: res.result.id,
                    avatar: res.result.avatar,
                    phone: res.result.phone,
                    name: res.result.name,
                    token: res.result.password,
                  };
                  this.$store.commit("user/set_userInfo", userInfo);
                  //把返回的用户信息逐一按照key保存在localstorage
                  Object.keys(res.result).forEach((k) => {
                    localStorage.setItem(k, res.result[k]);
                  });
                  this.$message({ type: "success", message: res.message });
                  // this.$store.commit("session/frombuzhi", true);
                  this.$router.push("/"); //回到这个路径
                } else {
                  this.$message.error(res.message); //报错
                }
              })
              .catch(() => {
                hideFullScreenLoading(); //也得隐藏loading
              });
          }

        });
      } else if (this.loginWay === "phone") {
        this.$refs.codeLoginFormRef.validate((valid) => {
          if(valid){
          // form = this.codeLoginForm;
          let form = {
            phone: this.codeLoginForm.phone,
            sms: this.codeLoginForm.phoneCode,
            rememberme: true,
          };
          showFullScreenLoading("#app", "登录中");
          Smstologin(form)
            .then((res) => {
              hideFullScreenLoading();
              if (res.code === 200) {
                this.src = res.result.avatar;
                this.$store.commit("user/SET_TOKEN", res.result.password);
                let userInfo = {
                  id: res.result.id,
                  avatar: res.result.avatar,
                  phone: res.result.phone,
                  name: res.result.name,
                  token: res.result.password,
                };
                this.$store.commit("user/set_userInfo", userInfo);
                Object.keys(res.result).forEach((k) => {
                  localStorage.setItem(k, res.result[k]);
                });
                this.$message({ type: "success", message: res.message });
                // this.$store.commit("session/frombuzhi", true);
                this.$router.push("/");
              } else {
                this.$message.warning(res.message);
              }
            })
            .catch(() => {
              hideFullScreenLoading();
            });
        }
      }

      );
      }
    }, 1000),
    sendCode: _throttle(function () {
      const myReg = /^1[1356789]\d{9}$/;
      if (this.codeLoginForm.phone === "") {
        // Toast({ message: "手机号不能为空" });
        this.$message.warning("手机号不能为空");
        return;
      }
      if (!myReg.test(this.codeLoginForm.phone)) {
        //  Toast("请输入正确格式帐号,手机号应该为？？");
        return;
      }
      let params = { phone: this.codeLoginForm.phone, areacode: 86 };
      Sendloginsms(params)
        .then((res) => {
          this.showSend = false;
          this.showSend1 = false;
          if (res.code === 200) {
            const TIME_COUNT = 60;
            if (!this.timer) {
              //timer用于记录一次向后端取到验证码
              this.count = TIME_COUNT;
              this.showSend = false; //该标志为false意味着文本变成某秒后重新发送
              this.timer = setInterval(() => {
                //倒计时的处理
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.showSend = true;
                  clearInterval(this.timer3);
                  this.timer = null;
                }
              }, 1000);
              this.$message({
                type: "success",
                message: res.message,
              });
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.showSend1 = false;
        });
    }, 1000),
  },
};
</script>

<style lang="scss" scoped>
// $bg:#2d3a4b;
// $dark_gray:#889aa4;
// $light_gray:#eee;
/deep/div.el-tabs_nav-wrap.is-scrollable.is-top::after {
  position: static !important;
}
.login-con {
  height: 100vh;
  background-color: #3d73dd;
  background-image: url("../../assets/login/bgimg.png");
  background-repeat: no-repeat;
  background-position: left top;
  background-attachment: fixed;
  background-size: 360px;
  padding-top: 150px;
  box-sizing: border-box;
  overflow-y: auto;
  .bg-img {
    width: 360px;
    position: absolute;
    z-index: 0;
    img {
      width: 100%;
    }
  }
  .bg-img1 {
    left: 0;
    top: 0;
  }
  .bg-img2 {
    right: 0;
    bottom: 0;
  }
  .l-c {
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 60%;
    padding: 25px;
    height: auto;
    z-index: 10;
   /* .code {
      display: flex;
      justify-content: flex-end;
      font-size: 18px;
      font-weight: 350;
      color: #3d73dd;
      margin: -18px 0 0 0;
      align-items: center;
    }
*/
     .code {
      position: absolute;
      right: 0;
      bottom: 30%;
      transform: translateX(-50%) ;
      font-size: 18px;
      font-weight: 350;
      color: #3d73dd;
    }
    .checkcode {
      position: relative;
    }
    .checkcode .button {
      position: absolute;
      right: 30px;
      bottom: 19px;
      height: 32px;
      border-radius: 16px;
      background-color: #3d73dd;
    }
    .hasaccount {
      line-height: 15px;
      width: 100%;
      font-size: 18px;
      // font-size: 2vw;
      text-align: center;
      color: #7985a8;
      margin: 18px 0 10px 0;
    }

    /deep/.el-tabs__nav-wrap.is-top::after {
      position: static;
    }
    /deep/.el-tabs__active-bar.is-top {
      display: none;
    }
    //标题栏的间距
    /deep/.el-tabs__header.is-top {
      margin: 42px 0 30px 0;
      //   display: flex;
      //   padding: 0px 4vw 0px;
      overflow: visible;
    }
    /deep/.el-tabs__nav-wrap.is-scrollable.is-top {
      overflow: visible;
    }
    /deep/.el-tabs__item {
      font-size: 1.5vw;
      color: #6e799c;
      font-weight: 600;
      padding: 0 0.05rem;
      height: 1.5rem;
      line-height: 1.5rem;
    }
    /deep/.el-tabs__item.accountlogin {
      flex-grow: 1;
    }
    /deep/.el-tabs__item.wexinlogin {
      flex-grow: 1;
    }
    /deep/.el-tabs__item.is-top.is-active {
      position: relative;
      color: #c4d5f5;
    }
    /deep/.el-tabs__item.is-top.is-active::before {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      content: "";
      width: 0.6rem;
      height: 4px;
      background-color: #3d73dd;
    }
    /deep/.el-tabs__nav-next {
      bottom: -10%;
      right: 0;
      transform: translateY(-50%);
    }
    /deep/.el-tabs__nav-prev {
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    /deep/.el-tabs__nav-scroll {
      overflow: visible;
    }
    /deep/.el-tabs__content {
      display: inline-block;
      width: 100%;
    }
    /deep/.el-icon-arrow-left::before {
      content: "";
    }
    /deep/.el-icon-arrow-right::before {
      content: "";
    }
    .loginbutton {
      background-color: #3d73dd;
      color: #fff;
      width: 100%;
      font-size: 30px;
      height: 70px;
      border-radius: 30px;
      font-weight: 900;
      margin: 0.5rem 0 0 0;
    }
    @media screen and (min-width: 992px) and (max-width: 1199px) {
      /deep/.el-tabs__item {
        font-size: 1.5vw;
      }
    }
    /*768<=pad<992 中屏，字体黄色，背景红色*/
    @media screen and (min-width: 768px) and (max-width: 991px) {
      /deep/.el-tabs__item {
        font-size: 3vw;
      }
      .checkcode .button {
        position: absolute;
        /*  right: 25px;
      bottom: 19px;
      height: 32px;
      */
        right: 0;
        bottom: 0;
        transform: translateX(-35%) translateY(-50%);
        border-radius: 16px;
        background-color: #3d73dd;
      }
    }
    /*phone<768  小屏，字体黑色，背景蓝色*/
    @media screen and (max-width: 767px) and (min-width: 480px) {
      /deep/.el-tabs__item {
        font-size: 3vw;
      }
      .loginbutton {
        font-size: 20px;
        height: 50px;
      }
    }
    /* 超小屏，字体黑色，背景蓝色*/
    @media screen and (max-width: 480px) {
      /deep/.el-tabs__item {
        font-size: 0.5vw;
      }
      .checkcode .button {
        position: absolute;
        right: -30px;
        bottom: 10px;
        height: 25px;
        line-height: 5px;
        border-radius: 13px;
        background-color: #3d73dd;
      }
      .loginbutton {
        font-size: 20px;
        height: 50px;
      }
    }

    //报错框
    /deep/.el-form-item.is-error .el-input__inner,
    .el-form-item.is-error .el-input__inner:focus,
    .el-form-item.is-error .el-textarea__inner,
    .el-form-item.is-error .el-textarea__inner:focus,
    .el-message-box__input input.invalid,
    .el-message-box__input input.invalid:focus {
      border-color: none;
    }
    /deep/.el-form-item.is-error .el-input__inner,
    .el-form-item.is-error .el-input__inner:focus,
    .el-form-item.is-error .el-textarea__inner,
    .el-form-item.is-error .el-textarea__inner:focus,
    .el-message-box__input input.invalid,
    .el-message-box__input input.invalid:focus {
      border-color: none;
    }
   /* /deep/.el-input__icon.el-input__validatelcon.el-icon-circle-close::before{
      content: "";
    }*/
    /deep/.el-icon-circle-close::before{
      content: " ";
    }
    /deep/.el-tabs__item.is-top.is-active {
      color: #3d73dd;
      background-color: #bac9ee;
      cursor: pointer;
    }
    .el-row {
      border-radius: 10px;
      overflow: hidden;
      background-color: #c4d5f5;
    }
    .l-c-l {
      position: relative;
      .carousel {
        background-color: #3d73dd;
        position: relative;
        min-height: 480px;
        border-radius: 10px;
        .carousel-title {
          font-size: 36px;
          color: #fff;
          text-align: center;
          font-weight: bold;
          padding-top: 24px;
        }
        .carousel-img {
          width: 90%;
          max-height: 80%;
          position: absolute;
          bottom: 16%;
          left: 5%;
        }
      }
    }
    .l-c-r {
      .login-form {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        min-height: 480px;
        padding: 0 32px;
        /deep/.el-form-item.is-success.is-required{
          margin-top: 0 !important;
        }
         /deep/.el-form-item.is-error.is-required{
          margin-top: 0 !important;
        }
        /deep/.is-required{
          margin-top: 0 !important;
        }
        .login-way {
          display: flex;
          text-align: center;
          align-items: center;
          padding-top: 60px;
          height: 60px;
          justify-content: center;
          .login-way-item {
            // margin: 0 16px;
            flex: 1;
            font-size: 24px;
            font-weight: 600;
            color: #6e799c;
            line-height: 60px;
            padding-left: 16px;
            padding-right: 16px;
          }
          .active-way-item {
            color: #3d73dd;
            background-color: #bac9ee;
            position: relative;
            cursor: pointer;
            &::after {
              display: block;
              content: "";
              height: 3px;
              width: 40%;
              position: absolute;
              left: 50%;
              bottom: 2px;
              transform: translateX(-50%);
              background-color: #3d73dd;
            }
          }
        }
        // .codeinput {
        //   padding: 7px 0 0 0;
        // }
        /deep/.init-input {
          .el-input__inner {
            padding-left: 60px;
            height: 68px;
            border-radius: 34px;
            font-size: 20px;
            background-color: #d9dde3;
            width: 100%;
          }
          @media screen and (max-width: 767px) and (min-width: 480px) {
            .el-input__inner {
              height: 45px;
            }
          }
          /* 超小屏，字体黑色，背景蓝色*/
          @media screen and (max-width: 480px) {
            .el-input__inner {
              height: 45px;
            }
          }
          .el-input__prefix {
            border-radius: 34px;
            padding-left: 8px;
            .el-input__icon {
              color: #bbbbbb;
              font-size: 30px;
              font-weight: 600;
              line-height: 68px;
              margin: 0 20px 0 0;
              .el-icon-lock {
                height: 74.52px;
              }
            }
            @media screen and (max-width: 767px) and (min-width: 480px) {
             .el-input__icon{
              font-size: 20px;
              line-height: 49px;
             }
            }
            /* 超小屏，字体黑色，背景蓝色*/
            @media screen and (max-width: 480px) {
              .el-input__icon{
              font-size: 20px;
              line-height: 49px;
             }
            }
          }
        }
      }
    }
  }
}
</style>
