import api from "./api.js";
import { request } from "@/network/request.js"


export function testAddmediaofpicture(parameter) {
	return request({
		url: api.testAddmediaofpicture,
		method: "post",
		data: parameter
	});
}
export function testAddmediaofanswer(parameter) {
	return request({
		url: api.testAddmediaofanswer,
		method: "post",
		data: parameter
	});
}
//获取考试内容
export function getmyExam(parameter) {
	return request({
		url: api.getmyExam,
	    method: "get",
		params: parameter
	});
}

//删除考试内容 
export function deleteExam(parameter) {
	return request({
		url: api.deleteExam,
	    method: "delete",
	    params: parameter
	});
}
 
//发布外部试卷考试 
export function assignExternalpaper(parameter, paramss) {
    return request({
        url: api.assignExternalpaper,
        method: "post",
		data: parameter,
		params: paramss
      });
}

//发布内部试卷
export function assignInternalpaperexam(params, data) {
	return request({
		url: api.assignInternalpaperexam,
		method: "post",
		params,
		data,
		headers: { 'Content-Type': 'application/json' }
	});
}
export function setTest(params, data) {
	return request({
		url: api.setTest,
		method: "post",
		params,
		data,
		headers: { 'Content-Type': 'application/json' }
	});
}