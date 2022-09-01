import api from "./api.js";
import { request } from "@/network/request.js"

export function GetTopic (parameter) {
  return request({
    url: api.GetTopic,
    method: "get",
    params: parameter
  });
}

export function GettopicbyidarrTopicTest (parameter) {
  return request({
    url: api.GettopicbyidarrTopicTest,
    method: "post",
    data: parameter
  });
}
export function Gettopicbyidarr (parameter) {
  return request({
    url: api.Gettopicbyidarr,
    method: "post",
    data: parameter
  });
}

export function Getknowledge (parameter) {
  return request({
    url: api.Getknowledge,
    method: "post",
    data: parameter
  });
}
export function Getall(parameter) {
  return request({
    url: api.Getall,
    method: "post",
    data: parameter
  });
}
export function Getknowledge2 (parameter) {
  return request({
    url: api.Getknowledge2,
    method: "get",
    params: parameter
  });
}

export function ExamGetTopic (parameter) {
  return request({
    url: api.ExamGetTopic,
    method: "post",
    data: parameter
  });
}

export function CreateExam (parameter, params) {
  return request({
    url: api.CreateExam,
    method: "post",
    data: parameter,
    params: params
  });
}

export function Getversion (parameter) {
  return request({
    url: api.Getversion,
    method: "get",
    params: parameter
  });
}

export function Existedition (parameter) {
  return request({
    url: api.Existedition,
    method: "get",
    params: parameter
  });
}

export function Existgrade (parameter) {
  return request({
    url: api.Existgrade,
    method: "get",
    params: parameter
  });
}

//动态获取真题试卷中的年级
export function Getgradename (parameter) {
  return request({
    url: api.Getgradename,
    method: "get",
    params: parameter
  });
}

//获取真题试卷中的试卷所属地区
export function Getarea (parameter) {
  return request({
    url: api.Getarea,
    method: "get",
    params: parameter
  });
}

//获取真题试卷中的试卷年份
export function Getyear (parameter) {
  return request({
    url: api.Getyear,
    method: "get",
    params: parameter
  });
}

//获取真题试卷中的试卷类型
export function Getpapertype (parameter) {
  return request({
    url: api.Getpapertype,
    method: "get",
    params: parameter
  });
}

// 试卷真题获取
export function GetPaperForSAuto (parameter) {
  return request({
    url: api.GetPaperForSAuto,
    method: "post",
    data: parameter
  });
}

//衍生试卷
export function CreatePaperbyZt (parameter) {
  return request({
    url: api.CreatePaperbyZt,
    method: "get",
    params: parameter
  });
}

// id-->topic(Array)
export function Getpaperbyid (parameter) {
  return request({
    url: api.Getpaperbyid,
    method: "get",
    params: parameter
  });
}
// id-->topic(Array)
export function Getid (parameter) {
  return request({
    url: api.Getid,
    method: "get",
    params: parameter
  });
}

//智能选题
export function Getrecordtopichistory (parameter, paramss) {
  return request({
    url: api.Getrecordtopichistory,
    method: "post",
    data: parameter,
    params: paramss
  });
}

export function Gettopicbyselect (parameter) {
  return request({
    url: api.Gettopicbyselect,
    method: "post",
    data: parameter
  });
}
// id-->topic(Array)
export function Examsave (parameter) {
  return request({
    url: api.Examsave,
    method: "post",
    data: parameter
  });
}
// id-->topic(Array)
export function EscSave (parameter) {
  return request({
    url: api.EscSave,
    method: "get",
    params: parameter
  });
}

export function GeneratePaper (parameter) {
  return request({
    url: api.GeneratePaper,
    method: "post",
    data: parameter
  });
}

export function GeneratePaperSd (parameter) {
  return request({
    url: api.GeneratePaperSd,
    method: "post",
    data: parameter
  });
}

export function GeneratePaperCard (parameter) {
  return request({
    url: api.GeneratePaperCard,
    method: "post",
    data: parameter
  });
}

export function GeneratePaperStuCard (parameter) {
  return request({
    url: api.GeneratePaperStuCard,
    method: "post",
    data: parameter
  });
}

export function Toassignhomework (parameter) {
  return request({
    url: api.Toassignhomework,
    method: "post",
    data: parameter
  });
}

export function Submithomework (parameter) {
  return request({
    url: api.Submithomework,
    method: "post",
    data: parameter
  });
}

export function Recordhomeworktopic (parameter) {
  return request({
    url: api.Recordhomeworktopic,
    method: "post",
    data: parameter
  });
}

export function Checkhomewotkissubmit (parameter) {
  return request({
    url: api.Checkhomewotkissubmit,
    method: "post",
    data: parameter
  });
}

export function Gettopichistorybyhomeworkidandstuid (parameter) {
  return request({
    url: api.Gettopichistorybyhomeworkidandstuid,
    method: "post",
    data: parameter
  });
}

export function Addcheck (parameter) {
  return request({
    url: api.Addcheck,
    method: "post",
    data: parameter
  });
}

export function Gethccheck (parameter) {
  return request({
    url: api.Gethccheck,
    method: "get",
    params: parameter
  });
}

export function Updatecheck (parameter) {
  return request({
    url: api.Updatecheck,
    method: "post",
    data: parameter
  });
}

export function Homeworkconditionofscore (parameter) {
  return request({
    url: api.Homeworkconditionofscore,
    method: "put",
    params: parameter
  });
}

export function GetTopicsCondition(parameter) {
	return request({
		url: api.GetTopicsCondition,
		method: "get",
		params: parameter
	});
}

export function Topichistoryaddimg (parameter) {
  return request({
    url: api.Topichistoryaddimg,
    method: "post",
    data: parameter
  });
}

export function Submitandrecord (data, params) {
  return request({
    url: api.Submitandrecord,
    method: "post",
    data,
    params,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function Gettopicrecordbytopicid(data) {
	return request({
		url: api.Gettopicrecordbytopicid,
		method: "post",
    data,
	});
}

export function TopicListQuality(data) {
	return request({
		url: "/topic/topicListQuality",
		method: "post",
    data,
	});
}


export function GetChapterOrKnowledge(params) {
	return request({
		url: api.GetChapterOrKnowledge,
		method: "get",
    params
	});
}


export function AddTopics(data,parameter) {
	return request({
		url: api.AddTopics,
		method: "post",
    data,
    params:parameter
	});
}

export function getMyTopic(parameter) {
	return request({
		url: api.GetMyTopic,
		method: "get",
    parameter
	});
}

export function getMyAllTopic(params) {
  return request({
    url: api.GetMyAllTopic,
    method: "get",
    params
  })
}

export function setTopics(params) {
  return request({
    url: api.setTopics,
    method: "post",
    params
  })
}

export function removeTopics(data) {
  return request({
    url: api.RemoveTopic,
    method: "post",
    data
  })
}