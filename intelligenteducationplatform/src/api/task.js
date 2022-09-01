import api from "./api.js";
import { request } from "@/network/request.js"
export function AssignTask(parameter, paramss) {
	return request({
		url: api.Assigntask,
		method: "post",
		data: parameter,
		params: paramss
	});
}

export function Assigntaskaddmedia(parameter) {
	return request({
		url: api.Assigntaskaddmedia,
		method: "post",
		data: parameter
	});
}

export function MyHomework(parameter) {
	return request({
		url: api.MyHomework,
		method: "get",
		params: parameter
	});
}

export function GetByClassId(parameter) {
	return request({
		url: api.GetByClassId,
		method: "get",
		params: parameter
	});
}

export function MyAssignHomework(parameter) {
	return request({
		url: api.MyAssignHomework,
		method: "get",
		params: parameter
	});
}

export function ToassignhomeworkByClass(parameter) {
	return request({
		url: api.ToassignhomeworkByClass,
		method: "get",
		params: parameter
	});
}

export function Getmyhomeworkbystatus(parameter) {
	return request({
		url: api.Getmyhomeworkbystatus,
		method: "get",
		params: parameter
	});
}

export function Getnotcompletebyclassid(parameter) {
	return request({
		url: api.Getnotcompletebyclassid,
		method: "get",
		params: parameter
	});
}

export function Gethomeworkofclass(parameter, tip) {
	return request({
		url: api.Gethomeworkofclass,
		method: "get",
		params: parameter,
		tip
	});
}
// export function gettestofclass(parameter) {
// 	return request({
// 		url: "/test/gettestofclass",
// 		method: "get",
// 		params: parameter
// 	});
// }

export function Gettestocr(parameter) {
	return request({
		url: api.Gettestocr,
		method: "get",
		params: parameter
	});
}

export function Removetaskimage(parameter) {
	return request({
		url: api.Removetaskimage,
		method: "get",
		params: parameter
	});
}
export function GetMedia(parameter) {
	return request({
		url: api.GetMedia,
		method: "get",
		params: parameter
	});
}

export function GetMedia1(params) {
	return request({
		url: api.GetMedia1,
		method: "get",
		params
	});
}

export function Assigntaskdeletemedia(parameter) {
	return request({
		url: api.Assigntaskdeletemedia,
		method: "delete",
		params: parameter
	});
}

export function GetUrl(parameter) {
	return request({
		url: api.GetUrl,
		method: "get",
		params: parameter
	});
}

export function GetUrls(params) {
	return request({
		url: api.GetUrls,
		method: "get",
		params
	});
}


export function Gethomeworkconditionbyclass(parameter) {
	return request({
		url: api.Gethomeworkconditionbyclass,
		method: "get",
		params: parameter
	});
}

export function Gettaskisfinished(parameter) {
	return request({
		url: api.Assigntaskaddmedia,
		method: "post",
		data: parameter
	});
}

export function Getalltaskisfinished(parameter) {
	return request({
		url: api.Getalltaskisfinished,
		method: "post",
		data: parameter
	});
}

export function Getalltaskisfinished1(data) {
	return request({
		url: api.Getalltaskisfinished1,
		method: "post",
		data
	});
}

export function Getsingletaskisfinished(parameter) {
	return request({
		url: api.Getsingletaskisfinished,
		method: "post",
		data: parameter
	});
}

export function Gettaskbytaskid(parameter) {
	return request({
		url: api.Gettaskbytaskid,
		method: "post",
		data: parameter
	});
}

export function Submittask(parameter) {
	return request({
		url: api.Submittask,
		method: "post",
		data: parameter
	});
}

export function Marktaskhomework(parameter) {
	return request({
		url: api.Marktaskhomework,
		method: "post",
		data: parameter
	});
}

export function Getstudentocr(params) {
	return request({
		url: api.Getstudentocr,
		method: "get",
		params
	});
}

export function Getstudentocr1(params) {
	return request({
		url: api.Getstudentocr1,
		method: "get",
		params
	});
}

export function Updatetestorc(parameter) {
	return request({
		url: api.Updatetestorc,
		method: "post",
		data: parameter
	});
}

export function Updatetestorc1(data) {
	return request({
		url: api.Updatetestorc1,
		method: "post",
		data
	});
}

export function Updatestuocr(parameter) {
	return request({
		url: api.Updatestuocr,
		method: "post",
		data: parameter
	});
}

export function Updatestuocr1(parameter) {
	return request({
		url: "/testtask/updatestuocr",
		method: "post",
		data: parameter
	});
}

export function Submittaskimages(parameter) {
	return request({
		url: api.Submittaskimages,
		method: "post",
		data: parameter
	});
}

export function Pgtaskimages(parameter) {
	return request({
		url: api.Pgtaskimages,
		method: "get",
		params: parameter
	});
}

export function Pgtaskimages1(params) {
	return request({
		url: "/testtask/pgtaskimages",
		method: "get",
		params
	});
}

export function Addmediaofpicture(parameter) {
	return request({
		url: api.Addmediaofpicture,
		method: "post",
		data: parameter
	});
}
export function addmediaofpicture(parameter) {
	return request({
		url: "/test/addmediaofpicture",
		method: "post",
		data: parameter
	});
}
export function testAddmediaofsheet(parameter) {
	return request({
		url: "/test/addmediaofsheet",
		method: "post",
		data: parameter
	});
}

export function Addmediaofanswer(parameter) {
	return request({
		url: api.Addmediaofanswer,
		method: "post",
		data: parameter
	});
}

export function Secondpigai(parameter) {
	return request({
		url: api.Secondpigai,
		method: "get",
		params: parameter
	});
}

export function Secondpigai1(params) {
	return request({
		url: api.Secondpigai1,
		method: "get",
		params
	});
}

export function Gethomeworkstatus(parameter) {
	return request({
		url: api.Gethomeworkstatus,
		method: "get",
		params: parameter
	});
}

export function Deletehomework(parameter) {
	return request({
		url: api.Deletehomework,
		method: "delete",
		params: parameter
	});
}
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

// 学生提交试卷答案
export function EhcAddList(data, tip) {
	return request({
		url: api.EhcAddList,
		method: "post",
		data,
		headers: { 'Content-Type': 'application/json' },
		tip
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

// 获取学生提交的试卷答案
export function GetStatus(params, tip) {
	return request({
		url: "/ehc/getstatus",
		method: "get",
		params,
		tip
	});
}
// 获取学生提交的试卷答案
export function getstatus(params) {
	return request({
		url: "/etc/getstatus",
		method: "get",
		params,
	});
}

// 获取学生提交的试卷答案 考试
export function getteststatus(params) {
	return request({
		url: "/test/getteststatus",
		method: "get",
		params,
	});
}

// 给学生提交的试卷答案附加图片
export function Addmediaofsheet(data, tip) {
	return request({
		url: "/homework/addmediaofsheet",
		method: "post",
		data,
		processData: false,
		contentType: false,
		headers: { 'Content-Type': 'multipart/form-data' },
		tip
	});
}

//获取学生提交的试卷答案(包含解析和批改结果)(老师和学生)
export function Getallpaperbystuid(data) {
	return request({
		url: api.Getallpaperbystuid,
		method: "post",
		data,
	});
}

//获取某班级学生提交的所有试卷答案(包含解析和批改结果)
export function Getallpaperbyclass(data, tip) {
	return request({
		url: api.Getallpaperbyclass,
		method: "post",
		data,
		tip
	});
}

//根据学生完成试卷答案记录的id 修改答题情况
export function Updatelist(data) {
	return request({
		url: api.Updatelist,
		method: "post",
		data
	});
}
//学生对答案追加图片 试卷批改方式一
export function Addanswerimg(parameter) {
	return request({
		url: api.Addanswerimg,
		method: "post",
		data: parameter
	});
}

//老师对题目的评语评分 试卷批改方式一
export function Addremarkorscore(parameter) {
	return request({
		url: api.Addremarkorscore,
		method: "post",
		data: parameter
	});
}

//根据用户id获取创建的所有智能生成的试卷
export function GetAllexambyuserid(params) {
	return request({
		url: api.GetAllexambyuserid,
		method: "get",
		params,
	});
}

//根据作业id题目id返回一个班级的题目作题记录统计
export function GetTopicSurveyByTopicId(data) {
	return request({
		url: api.GetTopicSurveyByTopicId,
		method: "post",
		data,
	});
}

//获取试卷类型
export function Getexamtypebyid(params) {
	return request({
		url: api.Getexamtypebyid,
		method: "get",
		params,
	});
}