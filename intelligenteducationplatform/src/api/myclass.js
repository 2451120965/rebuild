// 班级模块
import { request } from "@/network/request.js"

export function GetMyclass(params) { // 获取当前用户所有班级
    return request({
        url: "/myclass/getmyclass",
        method: "get",
        params
    });
}

export function getIsRoleClass(params) { // 获取当前用户对应身份班级
    return request({
        url: "/myclass/getIsRoleClass",
        method: "get",
        params
    });
}

export function GetMemberinfo(params) {
    return request({
        url: "/myclass/memberinfo",
        method: "get",
        params
    });
}

export function GetMemberInfoByRole(params) {
    return request({
        url: "/myclass/memberInfoByRole",
        method: "get",
        params
    });
}
