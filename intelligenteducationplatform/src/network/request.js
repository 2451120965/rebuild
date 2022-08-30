import axios from "axios";
import router from "@/router";
import { Message } from 'element-ui';
import qs from "qs";
import store from "@/store/index";

const jsonlist = [
  "/homework/recordhomeworktopic",
  "/homework/submitandrecord",
  "/topic/addTopics"
]
const list = [
  "/test/addmediaofpicture",
  "/test/addmediaofsheet",
  "/test/addmediaofanswer",
  '/etc/settest',
  '/etc/setPaper',
  '/test/assigntask',
  "/homework/assigntask",
  "/homework/assigntaskaddmedia",
  "/task/submittaskimages",
  "/homework/addmediaofpicture",
  "/homework/addmediaofanswer",
  "/exam/createExam",
  "/algorithm/correctcomposition",
  "/algorithm/english_correct",
  "/homework/toassignhomeworkbyai",
  "/paper/screenshot",
  "/paper/screenshotsd",
  "/paper/splitcard",
  "/paper/splitstucard",
  "/homework/toassignhomework",
  "/homework/topichistoryaddimg",
  "/esc/addexamimg",
  "/esc/addcardimg",
  "/homework/addmediaofsheet",
  "/ehc/sethomework",
  "/ehc/addlist",
  "/ehc/addimg",
  "/ehc/addanswerimg",
  "/ehc/homework/submitandrecord",
  "/ehc/addremarkorscorewayb",
  "/ehc/getstuidbyanswerimg",
  "/ehc/onlyaddanswerimg",
  "/etc/sethomework",
  "/etc/addlist",
  "/etc/addimg",
  "/etc/addanswerimg",
  "/etc/homework/submitandrecord",
  "/etc/addremarkorscorewayb",
  "/etc/getstuidbyanswerimg",
  "/etc/onlyaddanswerimg",
  "/esc/addanswerimg",
  "/testtask/batchsubmittaskimages",
  "/topic/topicListQuality"
];
const list1 = [
  "/sendloginsms",
  "/sendmessage",
  "/smstologin",
  "/exam/addexam",
  "/algorithm/correctcomposition",
  "/algorithm/english_correct",
];

const specialURL = function (url) {
  return list.indexOf(url) > -1;
};
const specialSMS = function (url) {
  return list1.indexOf(url) > -1;
};
const jsonURL = function (url) {
  return jsonlist.indexOf(url) > -1;
};

const paramsSerializer = function (params) {
  return qs.stringify(params, {
    arrayFormat: "repeat"
  });
};

export function request(config) {
  const instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
  });
  instance.interceptors.request.use(// 2.1.请求拦截
    config => {
      let { method, url, data, params, tip } = config;
      if (tip && tip > 6000&&(!(tip>8200&&tip<8212))) {
        if (url === "/homework/gethomeworkofclass") {
          config.url = "/test/gettestofclass";
        } else {
          let s = config.url;
          let a = s.split("/");
          a[1] = "etc";
          config.url = a.join("/");
          url = a.join("/");
        }
      }
      if (method === "post" && !specialURL(url)) {
        if (!jsonURL(url)) {
          config.data = qs.stringify(data, { indices: false });
          config.paramsSerializer = function (params) {
            return qs.stringify(params, { arrayFormat: "repeat" });
          };
        }
      }
      if (method === "get") {// 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
        config.paramsSerializer = function (params) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        };
      }
      if (method === "post" && params) {
        config.url = url + '?' + paramsSerializer(params);
        config.params = "";
      }
      if (specialSMS(url)) {
        config.headers.machinecode = store.state.common.machinecode;
      }
      config.headers.TOKEN = store.state.user.token;
      // if(localStorage.getItem("equitval")*1 === 0) {
      //   config.headers.equipment = 0;
      // } else {
      //   store.state.common.isMobile ? (config.headers.equipment = 0) : (config.headers.equipment = 1)
      // }
      store.state.common.isMobile ? (config.headers.equipment = 0) : (config.headers.equipment = 1)
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(// 2.2.响应拦截
    res => {
      const { url, toast } = config;
      const { result, code, message } = res.data
      if (url === "/login" && result?.password) {
        localStorage.setItem("token", result.password);
      }
      let doms = document.getElementsByClassName('el-message')[0];//已有弹出401或420时 不再弹出message
      if (code === 401 && !doms?.innerHTML.includes("请重新登录")) {
        localStorage.removeItem("token")
        store.commit("user/REMOVE_TOKEN", "")
        Message.error("登录过期，请重新登录");
        if (router.history.current.meta.requireAuth) router.push("/login");
        return
      }
      if (code === 420 && !doms?.innerHTML.includes("请重新登录")) {
        localStorage.removeItem("token")
        store.commit("user/REMOVE_TOKEN", "")
        Message.error("已被其他设备占用，请重新登录");
        if (router.history.current.meta.requireAuth) router.push("/login");
        return
      }
      if (toast) {
        let toastType = (code === 200 ? "success" : "error");
        let toastStr = (code === 200 ? toast : toastError);
        if (message) {
          Message[toastType](message);
        } else {
          Message[toastType](toastStr);
        }
      }
      return res.data;
    },
    error => {
      let errMsg = "";
      if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
        errMsg = "访问超时";
      }
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errMsg = "请求错误";
            break;
          case 401:
            errMsg = "未授权，请登录";
            break;
          case 403:
            errMsg = "拒绝访问";
            break;

          case 404:
            errMsg = "服务器找不到请求的资源";
            break;

          case 408:
            errMsg = "请求超时";
            break;

          case 500:
            errMsg = "服务器内部错误,请稍后再试";
            break;

          case 501:
            errMsg = "服务未实现";
            break;

          case 502:
            errMsg = "服务正在更新中，请稍等！";
            break;

          case 503:
            errMsg = "服务不可用";
            break;

          case 504:
            errMsg = "网关超时";
            break;

          case 505:
            errMsg = "HTTP版本不受支持";
            break;

          default:
        }
      }
      Message.error(errMsg)
      return Promise.reject(error);
    }
  );
  return instance(config);
}