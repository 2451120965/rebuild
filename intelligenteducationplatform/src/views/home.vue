<template>
  <div class="index-main-content">
    <div class="main-header">
      <div class="main-header-left">
        <div class="header-logo">
          <div class="logo-img">
            <img src="@/assets/img/logo.png" width="40px" height="40px" />
          </div>
          <span class="logo-text">小黑学习智能平台</span>
        </div>
        <nav class="header-router">
        </nav>
      </div>
      <div class="main-header-right">
        <div class="router-title">
          <router-link to="/guideDoc">帮助文档</router-link>
        </div>
        <div class="header-login">
          <el-popover placement="top-start" title="用户信息" width="200" trigger="hover">
            <!-- <div>账号：{{ $store.state.user.userInfo.phone }}</div> -->
            <div class="logut" style="
                width: 100%;
                display: flex;
                justify-content: space-between;
              ">
              <div></div>
              <el-button type="text" @click="logout">退出登录</el-button>
            </div>
            <div style="display: flex; align-items: center" slot="reference">
              <img :src="avatar" style="
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                  border: 1px solid #ebedf0;
                " />
              <!-- <span style="padding-left: 10px; font-size: 16px;color:#fff;">
                {{ $store.state.user.userInfo.name || "勤奋的小黑" }}
              </span> -->
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <!-- 占位盒子 -->
    <div style="height: 50px;"></div>
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    };
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

.index-main-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  .main-header {
    box-sizing: border-box;
    width: 100%;
    height: 64px;
    padding: 0 24px;
    display: flex;
    box-shadow: none;
    border-bottom: 1px solid rgba(34, 34, 34, 0.16);
    position: relative;
    background: #3d73dd;
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    border-radius: 0 0 30px 0;

    .main-header-left {
      display: flex;
      width: 1500px;

      .header-logo {
        display: flex;

        .logo-img {
          display: flex;
          align-items: center;
        }

        .logo-text {
          color: #fff;
          font-weight: 700;
          font-size: 20px;
          margin-left: 15px;
          margin-right: 20px;
          line-height: 64px;
        }
      }

      .header-router {
        display: flex;
        cursor: pointer;
        margin-left: 85px;



        .noactive-header-router-title {
          &:after {
            content: "";
            width: 0;
            height: 1px;
            position: absolute;
            background: #2979ff;
            top: 100%;
            right: 50%;
            transition: all .5s;
          }

          &:hover {
            &::after {
              width: 100%;
              right: 0;
            }
          }
        }

        .active-header-router-title {
          color: #000;

          &::after {
            content: "";
            width: 50%;
            height: 2px;
            position: absolute;
            background: #009dff;
            top: 80%;
            left: 0;
            transform: translateX(50%);
            transition: all 0;
          }
        }
      }
    }

    .main-header-right {
      display: flex;
      margin-right: auto;

      .router-title {
        padding: 0 15px;
        display: block;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #fff;
        line-height: 64px;
        position: relative;
      }

      .header-login {
        display: flex;
        align-items: center;
        cursor: pointer;

        .login-text {
          text-align: center;
          font-size: 14px;
          cursor: pointer;

          &:hover {
            color: #2979ff;
          }
        }
      }
    }
  }
}

</style>
