import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);

//自动引入modules包内的仓库
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");// set './app.js' => 'app'
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  plugins: [
    persistedState({ // localStorage持久化处理
        reducer(cache) {
          // console.log(cache, "cache");
          return {
            common: cache.common,
            homework: cache.homework,
            user: cache.user,
          }
        }
    }),
    persistedState({ // sessionStorage持久化处理
      storage: window.sessionStorage,
      reducer(cache) {
        return {
          paper: cache.paper,
          session: cache.session
        }
      }
    })
  ],
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules
});
