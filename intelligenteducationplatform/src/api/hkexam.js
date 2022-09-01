// 作业类型的考试所放置的请求

import api from "./api.js";
import { request } from "@/network/request.js"

export function taskHomeworkImages(data) {
    return request({
		url: "/task/taskHomeworkImages",
		method: "post",
		data
	});
}