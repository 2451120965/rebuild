import { singleType, fillType } from "@/utils/data/topicType.js";
/**
 * 返回传入题目数组的对应题目答案 题目切割后的文本类型
 *
 */
export default function topicFormat(homework, needPaintAnswer = true) {
	//needPaintAnswer 需要主观题答案不需传入 不需要主观题答案传入false
	try {
		// .replace(/paint /g, 'paint ')
		homework = homework.replace(/text \n/g, 'text '); // 后端处理加多了个\n 之后会改正
		let homeworkArray = [];
		let answer = [];
		let index = 0;
		homework = homework.replace(/longInput/g, "input");
		let str = replaceSpecialChar(homework)
		str = str.trim().split("\nline\n");
		for (const key in str) {
			const strSplitRN = str[key].trim().indexOf(" ");
			if (strSplitRN !== -1) {
				const RNArry = [];
				const strSplitRNArry = str[key].split("\n");//单道题目划分成不同类型的文本
				for (const i in strSplitRNArry) {
					const RNArr = SpaceSplit(strSplitRNArry[i].trim(), index, needPaintAnswer);
					if (RNArr.answer) {   //记录题目的答案
						answer.push(RNArr.answer)
						index = index + 1
					}
					RNArry.push(RNArr.obj);  //把这个类型文本处理后的记录对象{key:类型 value:value对象} RNArry保存着一道题目拥有着所有的文本类型obj记录
				}
				homeworkArray.push(RNArry);   //homeworkArray保存着所有题目的obj记录对象
			} else {
				let o = SpaceSplit(str[key]) //只有一道题目
				homeworkArray.push(o.obj, null, needPaintAnswer);
			}
		}
		// console.log(homeworkArray, "homeworkArray");
		// console.log(answer, "answer");
		return {
			topickArray: homeworkArray,
			answer: answer
		};
	} catch (e) {
		console.log(e);
		return null
	}
}

function SpaceSplit(str, index, needPaintAnswer) {
	const reg1 = /&nbsp;/g;
	const spaceIndex = str.trim().indexOf(" ");
	let o1;
	if (spaceIndex > -1) {
		o1 = str.trim().substring(0, spaceIndex).trim();
	} else {
		o1 = str.trim()
	}
	let o2;
	let answer;
	switch (o1) {
		case 'text':
			if (spaceIndex > -1) {
				o2 = str.substring(spaceIndex + 1).trim();
			}
			break;
		case 'input':
			if (spaceIndex > -1) {
				o2 = str.substring(spaceIndex + 1).trim().replace(reg1, " ");
			}
			o2 = {
				value: o2,
				index: index
			}
			answer = o2
			break;
		case 'longInput':
			if (spaceIndex > -1) {
				o2 = str.substring(spaceIndex + 1).trim().replace(reg1, " ");
			}
			o2 = {
				value: o2,
				index: index
			}
			answer = o2
			break;
		case 'image':
			if (spaceIndex > -1) {
				o2 = str.substring(spaceIndex + 1).trim();
			}
			break;
		case 'select':
			if (str.trim().lastIndexOf("annotation") > -1) {
				str = str.substring(0, str.trim().lastIndexOf("\"\"annotation")).trim();
			}
			let o
			if (spaceIndex > -1) {
				o = str.substring(spaceIndex + 1).trim();
			}
			if (o.trim().substring(o.length - 5) === "&&&&&") {
				o = o.trim().substring(0, o.length - 5).trim();
			}
			o2 = o.split("&&&&&");
			answer = {
				index: index,
				value: o2[0],
				select: o2
			}
			o2 = {
				index: index,
				value: o2
			}
			break;
		case 'judge':
			o2 = str.substring(spaceIndex + 1).trim();
			o2 = {
				value: o2,
				index: index
			}
			answer = o2
			break;
		case 'paint':
			o2 = str.substring(spaceIndex + 1).trim();
			if(o2 === "Paint") o2 = "";
			o2 = {
				value: o2,
				index: index
			}
			if (needPaintAnswer) { // 需要主观题题答案是添加进去  最好换一个数组paintanswer存储 参考小程序
				answer = o2
			}
			break;
		case 'optional':
			o2 = str.substring(spaceIndex + 1).trim().split(" ");
			const optionalArr = [];
			for (const key in o2) {
				optionalArr.push(moohaoSplit(o2[key]));
			}
			o2 = optionalArr;
			break;
		case 'annotation':
			str = str.trim().split("annotation ")[1].trim();
			if (str.trim().split("解：")[1] !== undefined) {
				o2 = str.trim().split("解：")[1].trim();
			} else if (str.trim().split("【分析】")[1] !== undefined) {
				o2 = str.trim().split("【分析】")[1].trim();
			} else if (str.trim().split("text ")[1] !== undefined) {
				o2 = str.trim().split("text ")[1].trim();
			} else if (str.trim().split("test ")[1] !== undefined) {
				o2 = str.trim().split("test ")[1].trim();
			}
			break;
		default:
			o2 = str.substring(spaceIndex + 1).trim();
	}
	const obj = {};
	obj[o1] = o2;
	return {
		obj: obj,
		answer: answer
	};
}
/*

 */
function moohaoSplit(str) {
	const obj = {};
	const spaceIndex = str.trim().indexOf(":");
	if (spaceIndex !== -1) {
		const o1 = str.substring(0, spaceIndex).trim();
		if (o1 === "image" || o1 === "text") {
			const o2 = str.substring(spaceIndex).trim();
			obj[o1] = o2;
		}
	}
	return obj;
}
const baseURL = "https://www.imbbx.com";
function replaceSpecialChar(str) {
	str = str.trim().replace("annotation\n", "annotation ").trim()
		.replace("annotation\r\ntext", "annotation").trim()
		.replace(/(?<=<input).*?(?=>)/g, "______").trim()
		.replace(/(?<=<longInput).*?(?=>)/g, "______").trim()
		.replace(/paint\n/g, "paint Paint\n").trim()
		.replace(/<br \/><img/g, "<br \/><img class='black-class'").trim()
		.replace(/<br><img/g, "<br \/><img class='black-class'").trim()
		.replace(/<br\/><img/g, "<br \/><img class='black-class'").trim()
		.replace(/<table /g, "<table style='display: inline-block; !important';").trim()
		.replace(/<\/table>/g, "</table><br/>").trim()
		.replace(/&&&&&pan/g, "&&&&&<span").trim()
		.replace(/&&&&&span/g, "&&&&&<span").trim()
		.replace(/text-decoration:underline\">/g, "text-decoration:underline\">.").trim()
		.replace(/data-mathml/, "").replace(/src=\"\/tikuimages/g, ` crossorigin='anonymous'  src=\"${baseURL}/tikuimages`).trim()
		.replace(/<bdo class=\"mathjye-underwave\">/g, "<bdo class='mathjye-underwave' style='text-decoration: red wavy underline;'>") // 加文本底部波浪线
		.replace(/<bdo class=\"mathjye-bold\">/g, "<bdo class='mathjye-bold' style='font-weight: bold'>").trim() // 文本加粗
		.replace(/src=\'\/tikuimages/g, ` crossorigin='anonymous' src=\'${baseURL}/tikuimages`).trim()
		.replace(/src=\"\/mathJye/g, ` crossorigin='anonymous' src=\"${baseURL}/mathJye`).trim()
		.replace(/src=\'\/mathJye/g, ` crossorigin='anonymous' src=\'${baseURL}/mathJye`).trim()
		.replace(/src=\"\/tikuimage/g, ` crossorigin='anonymous' src=\"${baseURL}/tikuimage`).trim()
		.replace(/src=\'\/tikuimage/g, ` crossorigin='anonymous' src=\'${baseURL}/tikuimage`).trim()
		.replace(/src=\"\/upimages/g, ` crossorigin='anonymous' src=\"${baseURL}/upimages`).trim()
		.replace(/src=\'\/upimages/g, ` crossorigin='anonymous' src=\'${baseURL}/upimages`).trim()
		.replace(/src=\"\/zximages/g, ` crossorigin='anonymous' src=\"${baseURL}/zximages`).trim()
		.replace(/src=\'\/zximages/g, ` crossorigin='anonymous' src=\'${baseURL}/zximages`)
		.replace(/&lt;/g, "<")
		.replace(/&amp;/g, "\&")
		.replace(/&quot;/g, "\"")
		.replace(/&apos;/g, "\'")
		.replace(/&cent;/g, "￠")
		.replace(/&yen;/g, "¥")
		.replace(/&times;/g, " × ")
		.replace(/&divide;/g, " ÷ ")
		.replace(/&gt;/g, ">")
		.replace(/&deg;/g, "°")
	return str
}

export function topicSplit(topic) {
	if (!Array.isArray(topic)) return
	let topicString = ""
	topic.forEach(item => {

	})
}

export class TopicSplit {
	constructor(topicKey, last, topic, sorces, tn) {
		this.topicKey = topicKey;
		this.last = last;
		this.topic = topic;
		this.sorces = sorces;
		this.tn = tn;
		this.topicStr = "";
		this.showAnswer = false;
		this.inputSing = "_";
		// this.inputSing = "&nbsp;";
		this.keyList = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
		this.topic2string()
		// console.log(this.topicStr);
	}
	topic2string() {
		this.topic.forEach((topic, key1) => {
			let strList = "";
			topic.forEach((item, key2) => {
				let topicPart = "";
				const objName = Object.keys(item)[0];
				let value = item[objName]
				if (value) {
					switch (objName) {
						case "text":
							topicPart = value;
							break;
						case "input":
							topicPart = this.splitInput(value);
							break;
						case "longInput":
							topicPart = this.splitInput(value);
							break;
						case ("select" || "optional"):
							topicPart = this.splitSelect(value);
							break;
						case "judge":
							topicPart = "(    )";
							break;
						case "paint":
							if (!this.last) {
								topicPart = `<div class="paint"></div>`;
							} else {
								topicPart = `<div></div>`;
							}
							break;
						case "image":
							topicPart = `<image ${value}/>`;
							break;
						case 'annotation':
							if (this.showAnswer) {
								topicPart = this.splitAnnotation(value);
							}
							break;
					}
				}
				if (key1 === 0 && key2 === 0) {
					if (this.tn) {
						if (singleType.indexOf(this.tn) > -1 || fillType.indexOf(this.tn) > -1) {
							topicPart = `<div class="topic-key">${this.topicKey + 1 + '. '}</div>${topicPart}`;
						} else {
							topicPart = `<div class="topic-key">${this.topicKey + 1 + '. '}</div>${"(" + this.sorces + "分)" + topicPart}`;
						}
					} else {
						topicPart = `<div class="topic-key">${this.topicKey + 1 + '. '}</div>${"(" + this.sorces + "分)" + topicPart}`;
					}
				}
				strList += topicPart;
			})
			this.topicStr += `<div class="topic-item">${strList}</div>`;
		})
	}
	splitInput(input) {
		if (!input || !input.value) return "_________"
		// if (!input || !input.value) return "          "
		let length = [...input.value].length
		if (this.checkHtml(input.value) || this.checkMathHtml(input.value)) {
			length = 3
		}
		if (length < 3) {
			length = 3
		}
		return this.inputSing.repeat(length * 2 + 8);
	}
	splitSelect(select) {
		let selectStr = "";
		select.value.forEach((item, key) => {
			if (key === 0) return
			selectStr += `<div class="select-item">
				<div class="select-item-key">${this.keyList[key]}、</div>
				<div class="select-item-value">${item}</div>
				</div>`
		});
		return `<div class="select">${selectStr}</div>`;
	}
	splitAnnotation(annotation) {
		return `<div class="annotation">${annotation}</div>`;
	}
	checkHtml(htmlStr) {
		const reg = /<[^>]+>/g;
		return reg.test(htmlStr);
	}
	checkMathHtml(htmlStr) {
		const reg = /$ | $$ | \\( | \\) | \\[ | \\] /g
		return reg.test(htmlStr);
	}
}
