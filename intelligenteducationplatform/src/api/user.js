import api from "./api.js";
import { request } from "@/network/request.js"
export function Login (parameter) {
    return request({
        url: api.Login,
        method: "post",
        data: parameter
    });
}
export function Sendloginsms (params) {
    return request({
        url: api.Sendloginsms,
        method: "get",
        params
    });
}
export function Smstologin (parameter) {
    return request({
        url: api.Smstologin,
        method: "post",
        data: parameter
    });
}
export function forgetpassword(data) {
    return request({
      url: api.Forgetpassword,
      method: "post",
      data
    });
  }
  export function register(data) {
    return request({
      url: api.Register,
      method: "post",
      data
    });
  }
  export function Sendmessage(params) {
    return request({
      url: api.Sendmessage,
      method: "get",
      params
    });
  }

