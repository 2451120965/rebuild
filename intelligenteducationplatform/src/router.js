import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from 'element-ui'
import store from "@/store/index.js";

Vue.use(VueRouter);

const router = new VueRouter({
  //mode: 'history', //去除哈希路由
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login'], resolve),
      meta: {
        title: '登录页'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/views/register'], resolve),
      meta: {
        title: '注册页'
      }
    },
    {
      path: '/remember',
      name: 'remember',
      component: resolve => require(['@/views/remember'], resolve),
      meta: {
        title: '忘记密码页'
      }
    },
    {
      path: "/",
      name: "home",
      component: (resolve) => require(["@/views/home"], resolve),
      redirect: "/IndexHome",
      meta: {
        title: "首页",
      },
      children: [
        {
          path: "/",
          name: "IndexHome",
          redirect:'/workbench',
          component: (resolve) => require(["@/views/IndexHome"], resolve),
          children: [
            {
              path: "/workbench",
              name: "workbench",
              component: (resolve) => require(["@/views/workbench"], resolve),
            },
          ],
        },
        {
          path: "/guideDoc",
          name: "guide",
          component: (resolve) => require(["@/views/guide"], resolve),
          meta: {
            requireAuth: true,
            title: "帮助文档",
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(to);
  // 判断页面是否需要登录权限
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 判断是否登录
    if (store.state.user.token) {
      next()
    } else {
      Message.warning("访问该页面需要先进行登录")
      // 没登录则跳转到登录界面
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router;
