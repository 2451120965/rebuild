export function formatDate (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	const hour = time.getHours() + 8; // 返回日期中的小时数（0到23）
	const minute = time.getMinutes(); // 返回日期中的分钟数（0到59）
	const second = time.getSeconds(); // 返回日期中的秒数（0到59）
	return year + "年" + month + "月" + date + "日" + hour + "时" + minute + "分" + second + "秒";
}

export function trueformatDate (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	const hour = time.getHours(); // 返回日期中的小时数（0到23）
	const minute = time.getMinutes(); // 返回日期中的分钟数（0到59）
	const second = time.getSeconds(); // 返回日期中的秒数（0到59）
	return year + "年" + month + "月" + date + "日" + hour + "时" + minute + "分" + second + "秒";
}

export function formatDateYMDHM (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	const hour = time.getHours(); // 返回日期中的小时数（0到23）
	const minute = time.getMinutes(); // 返回日期中的分钟数（0到59）
	return year + "年" + (month >= 10 ? month : '0' + month) + "月" + (date >= 10 ? date : '0' + date) + "日" + (hour >= 10 ? hour : '0' + hour) + "时" + (minute >= 10 ? minute : '0' + minute) + "分";
}

export function formatDateYMDHM2 (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	let month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	let date = time.getDate(); // 返回日期月份中的天数（1到31）
	let hour = time.getHours(); // 返回日期中的小时数（0到23）
	let minute = time.getMinutes(); // 返回日期中的分钟数（0到59）
	if (month < 10) {
		month = "0" + month;
	}
	if (date < 10) {
		date = "0" + date;
	}
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minute < 10) {
		minute = "0" + minute;
	}
	return year + "-" + month + "-" + date + " " + hour + ":" + minute;
}

export function formatDateYMD (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	return year + "年" + month + "月" + date + "日";
}

export function formatDateymd (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	return year + "-" + month + "-" + date;
}

export function formatDateymd2 (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	return year + "." + month + "." + date;
}

export function formatDateDHM (time) {
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	const hour = time.getHours(); // 返回日期中的小时数（0到23）
	const minute = time.getMinutes(); // 返回日期中的分钟数（0到59）
	return date + "天" + hour + "时" + minute + "分";
}

export function formatDateCha (time) {
	const nowDate = new Date();
	const timeCha = time - nowDate.getTime();
	// 剩余天数
	const days = Math.floor(timeCha / (24 * 3600 * 1000)); // 天数
	// 剩余小时
	const leave1 = timeCha % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
	const hours = Math.floor(leave1 / (3600 * 1000));
	// 剩余分钟
	const leave2 = leave1 % (3600 * 1000);
	const minutes = Math.floor(leave2 / (60 * 1000));
	if (days < 1) {
		return hours + "时" + minutes + "分";
	}
	return days + "天" + hours + "时" + minutes + "分";
}

// 判断是否时同一天
export function IsSameDay (startTime, endTime) {
	const startTimeMs = new Date(startTime).setHours(0, 0, 0, 0);
	const endTimeMs = new Date(endTime).setHours(0, 0, 0, 0);
	return startTimeMs === endTimeMs;
}

export function formatDateYMDH (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	const hour = time.getHours(); // 返回日期中的小时数（0到23）
	const minute = time.getMinutes(); // 返回日期中的分钟数（0到59）
	if (minute >= 0 && minute <= 9) {
		return year + "年" + month + "月" + date + "日" + " " + hour + ":" + "0" + minute;
	}
	if (minute > 9) {
		return year + "年" + month + "月" + date + "日" + " " + hour + ":" + minute;
	}
}

export function formatDateYMDH2 (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	return year + "年" + month + "月" + date + "日" + " " + "23" + ":" + "59";
}
export function formatDateYMDHM3 (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	return year + "年" + "0" + month + "月" + date + "日 " + 23 + ":" + 59;
}
export function formatDateYMDHM4 (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	return year + "-" + month + "-" + date + ' ' + 23 + ":" + 59;
}
export function formatDateYMDHM5 (timea) {
	const time = new Date(timea);
	const year = time.getFullYear(); // 取得4位数的年份
	const month = time.getMonth() + 1; // 取得日期中的月份，其中0表示1月，11表示12月
	const date = time.getDate(); // 返回日期月份中的天数（1到31）
	const hour = time.getHours();//获取系统时间
	const minute = time.getMinutes(); //分
	const second = time.getSeconds();//秒
	return year + "-" + month + "-" + date + ' ' + hour + ":" + minute + ":" + second;
}
