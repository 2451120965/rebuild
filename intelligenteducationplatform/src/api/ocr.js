import api from "./api.js";
import { request } from "@/network/request.js"
export function Addexam (parameter) {
    return request({
        url: api.Addexam,
        method: "post",
        data: parameter
    });
}
// export function Sendloginsms(parameter) {
//     return request({
//         url: api.Sendloginsms,
//         method: "get",
//         params: parameter
//     });
// }

export function CorrectComPosition (parameter) {
    return request({
        url: api.CorrectComPosition,
        method: "POST",
        data: parameter
    });
}
export function EnglishCorrect (parameter) {
    return request({
        url: api.EnglishCorrect,
        method: "POST",
        data: parameter
    });
}

export function Correcttaskcomposition(params) { // 批改作文
    return request({
      url: api.Correcttaskcomposition,
      method: "GET",
      params
    });
  }

  export function Getcorrect(params) { // 获取批改结果
    return request({
      url: api.Getcorrect,
      method: "GET",
      params
    });
  }