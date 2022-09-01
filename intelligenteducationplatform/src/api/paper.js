import api from "./api.js";
import { request } from "@/network/request.js";

// 布置试卷型作业
export function Sethomework(params, data) {
  return request({
    url: api.Sethomework,
    method: "post",
    params,
    data,
    headers: { 'Content-Type': 'application/json' }
  });
}
// 给保存试卷的数据追加试卷图片
export function Addexamimg(data) {
  return request({
    url: api.Addexamimg,
    method: "post",
    data,
    processData: false,
    contentType: false,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}
// 给保存试卷的数据追加答题卡图片
export function Addcardimg(data) {
  return request({
    url: api.Addcardimg,
    method: "post",
    data,
    processData: false,
    contentType: false,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}
// 给保存试卷的数据追加答题卡图片  传入的data是 formData类型
export function addanswerimg(data) {
  return request({
    url: "/esc/addanswerimg",
    method: "post",
    data,
    processData: false,
    contentType: false,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}
// 给学生提交的试卷答案附加图片
export function EhcAddimg(params, data, tip) {
  return request({
    url: api.EhcAddimg,
    method: "post",
    params,
    data,
    processData: false,
    contentType: false,
    headers: { 'Content-Type': 'multipart/form-data' },
    tip
  });
}
// 给学生提交的试卷答案附加图片 内部
export function onlyaddanswerimg(params, data, tip) {
  return request({
    url: "/ehc/onlyaddanswerimg",
    method: "post",
    params,
    data,
    processData: false,
    contentType: false,
    headers: { 'Content-Type': 'multipart/form-data' },
    tip
  });
}

// 给学生提交的试卷答案附加图片 外部
export function batchsubmittaskimages(params, data, tip) {
  return request({
    url: "/testtask/batchsubmittaskimages",
    method: "post",
    params,
    data,
    processData: false,
    contentType: false,
    headers: { 'Content-Type': 'multipart/form-data' },
    // tip
  });
}

// 获取学生提交的试卷答案
export function Getpaperlist(data, tip) {
  return request({
    url: api.Getpaperlist,
    method: "post",
    data,
    tip
  });
}
// 获取学生提交的试卷答案
export function CutAnswerCard(data, tip) {
  return request({
    url: "/ehc/cutAnswerCard",
    method: "post",
    data,
    tip
    // toast: true,
    // toastNode: "#app",
    // toastMsg: "正在提交答题卡..."
  });
}

// 获取学生提交的试卷答案(包含解析和批改结果)
// export function getallpaperbystuid(data) {
//   return request({
//     url: "/ehc/getallpaperbystuid",
//     method: "post",
//     data
//   });
// }
// 获取学生提交的试卷答案(包含解析和批改结果)
export function getallpaperbyclass(data, tip) {
  return request({
    url: "/ehc/getallpaperbyclass",
    method: "post",
    data,
    tip
  });
}
// 获取学生提交的试卷答案(包含解析和批改结果)
export function etcGetallpaperbyclass(data) {
  return request({
    url: "/etc/getallpaperbyclass",
    method: "post",
    data
  });
}
// 获取学生提交的试卷答案(包含解析和批改结果)
export function submitandrecord(data) {
  return request({
    url: "/ehc/homework/submitandrecord",
    method: "post",
    data
  });
}
// 获取试卷类型
export function getexamtypebyid(params) {
  return request({
    url: "/esc/getexamtypebyid",
    method: "get",
    params
  });
}
// 获取试卷
export function exam(params) {
  return request({
    url: "/esc/exam",
    method: "get",
    params
  });
}
// 获取试卷 作业
export function addremarkorscorewayb(params, data, tip) {
  return request({
    url: "/ehc/addremarkorscorewayb",
    method: "post",
    params,
    data,
    tip
  });
}
// 获取试卷 考试
export function addremarkorscorewayb1(params, data, tip) {
  return request({
    url: "/etc/addremarkorscorewayb",
    method: "post",
    params,
    data,
    tip
  });
}
// 删除试卷
export function delanswerimg(data, tip) {
  return request({
    url: "/ehc/delanswerimg",
    method: "post",
    data,
    toast: "删除成功！",
    toastError: "删除失败！",
    tip
  });
}

// 删除试卷 外部
export function removetaskimage1(params, tip) {
  return request({
    url: "/testtask/removetaskimage",
    method: "get",
    params,
    toast: "删除成功！",
    toastError: "删除失败！",
    tip
  });
}

// // 获取单个学生试卷批改结果
export function getallpaperbystuid(params, tip) {
  return request({
    url: "/ehc/getallpaperbystuid",
    method: "post",
    params,
    tip
  });
}
// // 获取单个学生试卷批改结果
export function etcGetallpaperbystuid(params) {
  return request({
    url: "/etc/getallpaperbystuid",
    method: "post",
    params
  });
}
// 批量上传图片
export function getstuidbyanswerimg(params, data, tip) {
  return request({
    url: "/ehc/getstuidbyanswerimg",
    method: "post",
    params,
    data,
    processData: false,
    contentType: false,
    headers: { 'Content-Type': 'multipart/form-data' },
    tip
  });
}

// 批量批改 作业
export function batchcorrecting(params, tip) {
  return request({
    url: "/ehc/batchcorrecting",
    method: "post",
    params,
    tip
  });
}

// 批量批改 试卷
export function batchcorrecting1(params, tip) {
  return request({
    url: "/etc/batchcorrecting",
    method: "post",
    params,
    tip
  });
}

export function batchpgtaskimages(data, tip) {
  return request({
    url: "/testtask/batchpgtaskimages",
    method: "post",
    data,
    tip
  });
}

// 是否公布成绩
export function ispublish(params) {
  return request({
    url: "/test/ispublish",
    method: "get",
    params
  });
}

// 公布成绩
export function publish(params) {
  return request({
    url: "/test/publish",
    method: "delete",
    params
  });
}

// 模糊搜索学生 考试作业
export function getStudentByIncompleteName(data, tip) {
  return request({
    url: "/testtask/getStudentByIncompleteName",
    method: "post",
    data,
    tip
  });
}

// 获取单个人的外部试卷考试试卷图片 外部
export function getsingletaskisfinished1(data, tip) {
  return request({
    url: "/testtask/getsingletaskisfinished",
    method: "post",
    data,
    tip
  });
}

export function giveAeConditionToStud(data, params, tip) {
  return request({
    url: "/testtask/giveAeConditionToStud",
    method: "post",
    data,
    params,
    tip
  });
}

export function getsingletaskisfinishedbytest(data, tip) {
  return request({
    url: "/testtask/getsingletaskisfinishedbytest",
    method: "post",
    data,
    tip
  });
}

export function assigntestdeletemedia(params, tip) {
  return request({
    url: "/test/assigntestdeletemedia",
    method: "delete",
    params,
    tip
  });
}

export function getAeMediaAnalysisByHomeworkId(params) {
  return request({
    url: "/homework/getAeMediaAnalysisByHomeworkId",
    method: "get",
    params
  });
}

export function getAeMediaAnalysisByHomeworkId1(params) {
  return request({
    url: "test/getAeMediaAnalysisByHomeworkId",
    method: "get",
    params
  });
}
