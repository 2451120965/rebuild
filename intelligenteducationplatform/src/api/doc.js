import api from "./api.js";
import { request } from "@/network/request.js"

export function GetDocText (parameter) {
  return request({
    url: api.GetDocText,
    method: "post",
    params: parameter
  });
}