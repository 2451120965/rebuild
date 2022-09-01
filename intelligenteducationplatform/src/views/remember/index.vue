<template>
  <div class="login-con">
    <div class="l-c">
      <el-row>
        <el-col :xs="24" :sm="24" :md="15" :lg="15" class="l-c-l">
          <div class="carousel">
            <div class="carousel-title">小黑学习智能教育平台</div>
            <img class="carousel-img" src="@/assets/login/lgicon.png" alt="" />
          </div>
        </el-col>
        <el-col class="l-c-r" :xs="24" :sm="24" :md="9" :lg="9">
          <div class="loginbox">
          <div class="login-form">
            <el-form
              ref="loginFormRef"
              :model="LoginForm"
              auto-complete="on"
              label-position="left"
              :rules="phoneRules"
            >
              <!-- 用户名 -->
              <el-form-item prop="phone" style="margin-top: 30px">
                <el-input
                  class="init-input"
                  ref="phone"
                  placeholder="请输入手机号码"
                  clearable
                  prefix-icon="el-icon-user-solid"
                  v-model="LoginForm.phone"
                  name="phone"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                  autofocus
                />
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password1" style="margin-top: 30px">
                <el-input
                  class="init-input"
                  ref="password1"
                  placeholder="请设置8-18位密码（含数字字母）"
                  prefix-icon="el-icon-lock"
                  v-model="LoginForm.password1"
                  type="password"
                  name="password1"
                  tabindex="2"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="password" style="margin-top: 30px">
                <el-input
                  class="init-input"
                  ref="password"
                  placeholder="请再次输入密码"
                  prefix-icon="el-icon-lock"
                  v-model="LoginForm.password"
                  type="password"
                  name="password1"
                  tabindex="2"
                  auto-complete="on"
                  @change="checkcode"
                />
              </el-form-item>
              <el-form-item prop="code" style="margin-top: 30px">
                <div class="checkcode">
                      <el-input
                        class="init-input codeinput"
                        ref="phoneCode"
                        placeholder="请输入验证码"
                        prefix-icon="el-icon-lock"
                        v-model="LoginForm.code"
                        type="text"
                        name="Code"
                        tabindex="2"
                        auto-complete="on"
                      >
                      </el-input>
                      <el-button
                        size="small"
                        type="primary"
                        class="button"
                        :disabled="!showSend"
                        @click="sendCms"
                        >{{
                          showSend ? "获取验证码" : `${count}s后重新获取`
                        }}</el-button
                      >
                    </div>
              </el-form-item>
            </el-form>
              <el-button
              :loading="loading"
              type="primary"
              class="loginbutton"
              @click="changeCode"
            >
              修改密码</el-button
            >
            <div class="hasaccount"  style="cursor:pointer" @click="returnlogin">
              想起了?<span style="color: #3d73dd; margin-left: 4px"
                >返回登录</span
              >
            </div>
          </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Sendmessage, forgetpassword } from "@/api/user.js";
import { _throttle } from "@/utils/auth"; //节流函数
import { phoneRules} from "./config/findcoderules.js";
export default {
  name: "login",
  data() {
    return {
      LoginForm: {
        phone: "",
        password1: "",
        password: "",
        code: "",
      },
      showSend:true,
      count:"",
      loading: false,
      phoneRules : phoneRules
    };
  },
  methods:{
  returnlogin:_throttle(function(){
     this.$router.push('/login')
  }),
  checkcode(){
     if(this.LoginForm.password1&&this.LoginForm.password){
      if(this.LoginForm.password1!==this.LoginForm.password){
        this.$message.warning("密码输入不一致");
        this.LoginForm.password=""
        this.$refs.password.focus()
      }
     }
  },
  changeCode: _throttle(function (){
    this.$refs.loginFormRef.validate((valid)=>{
      if(valid) {
      if(this.LoginForm.password) {
      forgetpassword({ phone: this.LoginForm.phone, password: this.LoginForm.password, sms: this.LoginForm.code}).then((res) => {
      if(res.code === 200) {
        this.$router.push("/login")
      }else {
        res.message ?this.$message.warning(res.message) : this.$message.warning("修改密码失败")
      }}).catch(() => {  })}}
      
    })
  },1000),
  sendCms: _throttle(function () {
      const myReg = /^1[1356789]\d{9}$/;
      if (this.LoginForm.phone === "") {
        // Toast({ message: "手机号不能为空" });
        this.$message.warning("手机号不能为空");
        return;
      }
      if (!myReg.test(this.LoginForm.phone)) {
        //  Toast("请输入正确格式帐号,手机号应该为？？");
        return;
      }
      if(!this.LoginForm.password){
            return;
      }
      let params = { phone: this.LoginForm.phone, areacode: 86 };
      Sendmessage(params)
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
  }
  
};
</script>

<style lang="scss" scoped>
.login-con {
  height: 100vh;
//   background-image: url("../../assets/login/bgimg.png");
//  background-repeat: no-repeat;
//  background-position: left top;
 background: url("../../assets/login/bgimg.png") left top no-repeat;
  background-color: #3d73dd;
 background-attachment: fixed;
  background-size: 360px;
  //padding-top: 150px;
  box-sizing: border-box;
  overflow-y: auto;
  .l-c {
    //margin-top: 150px;
    overflow: hidden;
    .el-row {
      //border-radius: 10px;
    //  overflow: hidden;
      //background-color: #c4d5f5;
      // border-bottom: 9999px solid transparent;
      // margin-bottom: -9999px;
       height: 100vh;
    }
     .l-c-l {
      padding-top: 230px;
   //   background-color: #3d73dd;
      position: relative;
      //  border-bottom: 9999px solid transparent;
      // margin-bottom: -9999px;
      //background-color: #3d73dd;
      .carousel {
        //background-color: #3d73dd;
        position: relative;
        min-height: 480px;
        border-radius: 10px;
      //  border-bottom: 9999px solid transparent;
      //  margin-bottom: -9999px;
        .carousel-title {
          font-size: 36px;
          color: #fff;
          text-align: center;
          font-weight: bold;
          padding-top: 24px;
        }
        .carousel-img {
         // width: 90%;
        // max-height: 80%;
          position: absolute;
          bottom: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(50%);
        }
      }
    }
    .l-c-r {
     // margin-top: 150px;
     height: 100vh;
     border-radius: 20px 0 0 20px;
    // background:url("../../assets/login/bgimg.png") 200% 110% no-repeat;
     //background-size: 300px;
     background-color: #fff;
      .loginbox{
       // border: 3px solid #095ddb;
       width: 70%;
       margin: 150px auto;
      .login-form {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        min-height: 480px;
        //padding: 0 32px;
        /deep/.el-form-item.is-success.is-required{
          margin-top: 0 !important;
        }
         /deep/.el-form-item.is-error.is-required{
          margin-top: 0 !important;
        }
        /deep/.is-required{
          margin-top: 0 !important;
        }
      }
      .hasaccount{
          line-height: 15px;
      width: 100%;
      font-size: 18px;
      // font-size: 2vw;
      text-align: center;
      color: #7985a8;
      margin: 18px 0 10px 0;
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
     .loginbutton {
      background-color: #3d73dd;
      color: #fff;
      width: 100%;
      font-size: 30px;
      height: 70px;
      border-radius: 30px;
      font-weight: 900;
      //margin: 0.5rem 0 0 0;
      margin: 0.2rem 0 0.3rem 0;
    }
    /deep/.init-input {
          .el-input__inner {
            padding-left: 60px;
            height: 68px;
            border-radius: 34px;
            font-size: 20px;
           // background-color: #d9dde3;
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