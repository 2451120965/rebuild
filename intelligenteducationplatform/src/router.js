import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
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

export default router;
