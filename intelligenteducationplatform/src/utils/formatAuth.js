export function SubjecttoNum(type, tasktype) {
	const index = ['语文','数学','英语','历史','地理','政治','生物','物理','化学','科学','道德与法治'].indexOf(type) + 1;
	if (tasktype === "普通")type = 100 + index;
	else if (tasktype === "试卷")type = 200 + index;
	else if (tasktype === "作文") type = 300 + index;
	return type;
}

export function formatSubject(type) {
	const subjectList = ["语", "数", "英", "历", "地", "政", "生", "物", "化", "科", "道"];
	if (type < 12) {
		return subjectList[type - 1];
	} else {
		return subjectList[type % 100 - 1];
	}
}

export function formatTaskRadio(type) {
	if (type === "C")return type = 1;
	if (type === "B")return type = 2;
	if (type === "A-")return type = 3;
	if (type === "A")return type = 4;
	if (type === "A+")return type = 5;
	return type;
}

export function formatTaskRadioRev(type) {
	if (type === 1)return type = "C";
	if (type === 2)return type = "B";
	if (type === 3)return type = "A-";
	if (type === 4)return type = "A";
	if (type === 5)return type = "A+";
	return type;
}