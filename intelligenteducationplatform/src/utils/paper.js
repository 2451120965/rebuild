import _ from "lodash"

export const reg1 = /pagesInfo\_(.+?)\_question\_(.+?)/;
export const reg2 = /pagesInfo\_(.+?)\_questionId\_(.+?)/;
export const reg3 = /pagesInfo\_(.+?)\_questionType\_(.+?)/;
export const reg4 = /pagesInfo\_(.+?)\_answer\_(.+?)/;

export function handleCorrect(item, pinfo = [], newPath, isGetAllArray) {
  let pagesInfo = new Object();
  for (const key in item) {
    if (key.indexOf("pagesInfo") > -1) {
      if (key.split("_").length === 2) {
      } else {
        const { pape, index } = handleObjectKey(key);
        let pageInt = parseInt(pape)
        if (pageInt > 1) {
          pageInt = Math.ceil(pageInt / 2);
        }
        if (!pagesInfo[pape]) {
          pagesInfo[pape] = new Object();
        }
        if (!pagesInfo[pape][index]) {
          pagesInfo[pape][index] = new Object();
          pagesInfo[pape][index]["left"] = pape
          pagesInfo[pape][index]["right"] = index
        }
        // 当前题目
        if (reg1.test(key)) {
          pagesInfo[pape][index]["question"] = item[key];
        }
        // 当前题目id
        if (reg2.test(key)) {
          pagesInfo[pape][index]["questionId"] = item[key];
        }
        // 当前题目类型
        if (reg3.test(key)) {
          pagesInfo[pape][index]["questionType"] = item[key];
        }
        // 当前答案
        if (reg4.test(key)) {
          item[key].forEach(item => {
            item.pageIndex = pageInt
            item.left = pape
            item.right = index
          })
          pagesInfo[pape][index]["answer"] = item[key];
          pagesInfo[pape][index]["remark"] = "";
          pagesInfo[pape][index]["myScore"] = 0;
          pagesInfo[pape][index]["corrector"] = null;
          pagesInfo[pape][index]["img"] = "";
          pagesInfo[pape][index]["show"] = false;
        }
      }
    }
  }
  let pagesInfoArr = []

  for (const key in pagesInfo) {
    if (isGetAllArray) {
      for (const key2 in pagesInfo[key]) {
        if (pagesInfo[key][key2].answer) {
          pagesInfo[key][key2].answer.forEach((item, answerKey) => {
            item.answerKey = answerKey
          })
          pagesInfoArr = [...pagesInfoArr, ...(pagesInfo[key][key2].answer)]
        }
      }
    }

    let pKey = parseInt(key);
    if (pKey === 1 || !isDivisible(pKey, 2)) {
      let newObj = _.pick(pagesInfo, [key, pKey + 1 + ""]);
      pinfo.push({ img: "", pagesInfo: newObj });
    }
  }

  newPath.forEach((item, key) => {
    pinfo[key].img = item;
  });
  if (isGetAllArray) {
    return pagesInfoArr
  }
};

const isDivisible = (dividend, divisor) => dividend % divisor === 0;

/**
* 提取批改返回结果的object key中的试卷的第几页以及对应的当前页中的题目索引
* @param {Number} pape 试卷页数
* @param {Number} index 题目索引
*/
const handleObjectKey = (key) => {
  const indexKey = key.split("_");
  return { pape: indexKey[1], index: indexKey[3] };
}
// 加载图片
export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  }).catch(function (err) {
    return err;
  });
}

export const imgToBase64 = (img) => {
  let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d')
  canvas.height = img.height;
  canvas.width = img.width;
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png');
}

export const img2Src = async (content) => {
  let scopy = content
  let imgReg = /<img.*?(?:>|\/>)/gi //匹配图片中的img标签
  let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
  let arr = content.match(imgReg)  //筛选出所有的img
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      let src = arr[i].match(srcReg)
      if (src){
        // 获取图片地址
        const url = src[1]
        const img = await loadImage(url)
        const base64 = imgToBase64(img)
        scopy = content.replace(url, base64)
      }
    }
  }
  return scopy
}

// 计算答案大小 answer: 答案信息  imgWH: 原始图片width height
// width height 百分比 leftTopX, leftTopY 左上角位置
export const computeAnswerWH = (answer, imgWH) => {
  const { leftTopX, leftTopY, rightBottomX, rightBottomY } = answer;
  let width = (imgWH.width * (rightBottomX - leftTopX)).toFixed(2) * 1;
  let height = (imgWH.height * (rightBottomY - leftTopY)).toFixed(2) * 1;
  return {
    width,
    height,
    leftTopX: (imgWH.width * leftTopX).toFixed(2) * 1,
    leftTopY: (imgWH.height * leftTopY).toFixed(2) * 1,
    rightBottomX: (imgWH.width * rightBottomX).toFixed(2) * 1,
    rightBottomY: (imgWH.height * rightBottomY).toFixed(2) * 1,
  };
}

// 截取每一道题
export const splitPaper = (canvas, img, point) => {
  const { width, height, leftTopX, leftTopY } = point;
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(
    img,
    leftTopX,
    leftTopY,
    width,
    height,
    0,
    0,
    width,
    height
  );
  let base64 = canvas.toDataURL("image/jpeg");
  return base64;
}

const keyList = {
  0: "一",
  1: "二",
  2: "三",
  3: "四",
  4: "五",
  5: "六",
  6: "七",
  7: "八",
  8: "九",
  9: "十",
}

import { danxuanType as singleType, shuanxuanType as checkboxType, fillType } from "utils/data/topicType.js";

const getKey = (key) => fotmatSelectKey2(key);

const getTopicType = (t) => {
  t.forEach((t_i) => {
    if (singleType.indexOf(t_i.typename) > -1) {
      t_i.def_type = 0
    } else if (checkboxType.indexOf(t_i.typename) > -1) {
      t_i.def_type = 1
    } else if (fillType.indexOf(t_i.typename) > -1) {
      t_i.def_type = 2
    } else {
      t_i.def_type = 3
    }
  })
}

const computedSelectHeight = (topic) => {
  let length = topic?.length
  let l = 0;
  if (!length) length = 1
  else {
    topic.forEach((ti, tk) => {
      l += ti?.topicStr?.match(/class="select"/igm)?.length || 0
    })
  }
  if(l > length) length = l;
  const count = Math.ceil(length / 4)
  const height = count * 31 + (count - 1) * 4 + 24 + 2
  return height
}

const computedFillHeight = (topic) => {
  let length = topic?.length
  if (!length) length = 1
  const count = Math.ceil(length / 5)
  const height = count * 38 + 22
  return height
}

const computedCount = (height) => {
  return Math.ceil(height / 1060)
}

const computedCountHeight = (height) => {
  if (height / 1060 === 0) return (computedCount(height) + 1) * 1060
  return computedCount(height) * 1060
}

let h_h = 44

const c_c_t_h = (cc_h, c_h, h_a_k, h_a) => {
  h_a[h_a_k] = c_h
  let p_h = computedCountHeight(cc_h)
  if (cc_h < p_h && (cc_h + c_h) > p_h) {
    h_a[h_a_k - 1] = (h_a[h_a_k - 1] + (p_h - cc_h))
    return p_h - cc_h
  }
  // console.log(h_a[h_a_k])
  return 0
}

const g_h_list = (t_a) => {
  let height = 148, c_h = 0, ti_a_l = 0, h_a_k = 0, h_a = {}
  t_a.forEach((ti, tk) => {
    const { def_type: it, topicArray: ti_a } = ti
    // console.log(it,ti_a)
    if (it === 0 || it === 1) {
      height += c_c_t_h(height, h_h, h_a_k, h_a)
      height += h_h
      h_a_k += 1
      c_h = computedSelectHeight(ti_a)
      // console.log(c_h);
      height += c_c_t_h(height, c_h, h_a_k, h_a)
      height += c_h
      h_a_k += 1
    } else if (it === 2) {
      height += c_c_t_h(height, h_h, h_a_k, h_a)
      height += h_h
      h_a_k += 1
      ti_a_l = ti_a.length
      ti_a.forEach((item) => {
        c_h = computedFillHeight(item.address?.answer)
        height += c_c_t_h(height, c_h, h_a_k, h_a)
        height += c_h
        h_a_k += 1
      })
    } else {
      height += c_c_t_h(height, h_h, h_a_k, h_a)
      height += h_h
      h_a_k += 1
      ti_a_l = ti_a.length
      ti_a.forEach(() => {
        c_h = 160
        height += c_c_t_h(height, c_h, h_a_k, h_a)
        height += c_h
        h_a_k += 1
      })
    }
  })
  // console.log(h_a)
  return h_a
}
const g_h_list2 = (t_a) => {
  let height = 148, c_h = 0, ti_a_l = 0, h_a_k = 0, h_a = {}
  t_a.forEach((ti, tk) => {
    if (ti.singleArray || ti.checkboxArray) {
      height += c_c_t_h(height, h_h, h_a_k, h_a)
      height += h_h
      h_a_k += 1
      c_h = computedSelectHeight(ti.singleArray || ti.checkboxArray)
      height += c_c_t_h(height, c_h, h_a_k, h_a)
      height += c_h
      h_a_k += 1
    } else if (ti.fill) {
      height += c_c_t_h(height, h_h, h_a_k, h_a)
      height += h_h
      h_a_k += 1
      ti_a_l = ti.fill.length
      ti.fill.forEach((item) => {
        c_h = computedFillHeight(item.answer)
        height += c_c_t_h(height, c_h, h_a_k, h_a)
        height += c_h
        h_a_k += 1
      })
    } else {
      height += c_c_t_h(height, h_h, h_a_k, h_a)
      height += h_h
      h_a_k += 1
      ti_a_l = ti.subject.length
      ti.subject.forEach(() => {
        c_h = 160
        height += c_c_t_h(height, c_h, h_a_k, h_a)
        height += c_h
        h_a_k += 1
      })
    }
  })
  return h_a
}

function repeatStringNumTimes(string, times) {
  // Step 1. Create an empty string that will host the repeated string
  var repeatedString = "";
  // Step 2. Set the While loop with (times > 0) as the condition to check
  //  && repeatedString.length < 64
  while (times > 0 && repeatedString.length < 70) { // As long as times is greater than 0, the statement is executed
    // The statement
    repeatedString += string; // Same as repeatedString = repeatedString + string;
    times--; // Same as times = times - 1;
  }
  /* While loop logic
                      Condition       T/F       repeatedString += string      repeatedString        times
    First iteration    (3 > 0)        true            "" + "abc"                  "abc"               2
    Second iteration   (2 > 0)        true           "abc" + "abc"               "abcabc"             1
    Third iteration    (1 > 0)        true          "abcabc" + "abc"            "abcabcabc"           0
    Fourth iteration   (0 > 0)        false
    }
  */

  // Step 3. Return the repeated string
  return repeatedString; // "abcabcabc"
}

export const autoPaperAnswerCard = (t_a) => {
  // console.log("autoPaperAnswerCard",t_a)
  let longString = "", height = 148, t_l = t_a.length, c_h = 0, ti_a_l = 0, h_a_k = 0, h_a = {}
  getTopicType(t_a)
  h_a = g_h_list(t_a)
  t_a.forEach((ti, tk) => {
    const { def_type: it, topicArray: ti_a, typename: tn } = ti
    let parse = "<div class='answer-sheet-contain'>";
    // console.log(it, "it");
    if (it === 0 || it === 1) {
      parse += `
        <div class='sheet--select'>
        <h2 class="sheet--select--header" style="height: ${h_a[h_a_k]}Px;line-height: ${h_a[h_a_k]}Px;">${keyList[tk] + '、' + tn}
      `
      if (ti_a.length > 0 && ti_a[0].sorces) {
        parse += `（每题${ti_a[0].sorces}分）`;
      }
      h_a_k += 1
      parse += `</h2><div class='contain' style="height: ${h_a[h_a_k]}px;">`
      h_a_k += 1
      ti_a.forEach((item, key) => {
        if(item?.address?.answer?.length > 1) { //选择题中有多个子题
          parse += "<div class='contain-item' style='padding-right: 50px;'>";
        } else {
          parse += "<div class='contain-item'>";
        }
        if (item?.address?.answer) {
          parse += "<div class='item-select'>";
          parse += `<div class="item-select-key">${tk + 1 + '.' + (key + 1)}</div>`;
          item.address.answer.forEach((answerItem) => {
            parse += "<div class='item-select-value'><div class='select-item'><div class='select-item-contain'><div class='select-four'>";
            answerItem.select.forEach((item, key) => {
              if (key !== 0) {
                parse += `<span><span style="padding-right:5px">[${getKey(key)}]</span></span>`;
              }
            })
            parse += "</div></div></div></div>";
          })
          parse += "</div>";
        }
        parse += "</div>";
      })
      parse += "</div></div>"
    } else if (it === 2) {
      parse += "<div class='sheet--fill'>";
      parse += `<h2 style="height: ${h_a[h_a_k]}Px;line-height: ${h_a[h_a_k]}Px;">${keyList[tk] + '、' + tn}`;
      if (ti_a.length > 0 && ti_a[0].sorces) {
        parse += `（每题${ti_a[0].sorces}分）`;
      }
      h_a_k += 1
      parse += "</h2>";
      parse += `<div class='sheet--fill--contain'>`;
      ti_a.forEach((item, key) => {
        if (key === 0) {
          // parse += `<div class='sheet--subjec-input abc' style="height: ${h_a[h_a_k]}Px;">`;
          parse += `<div class='sheet--subjec-input abc' style="padding-top: 10px;padding-bottom: 10px;">`; // 自适应题目框高
        } else {
          // parse += `<div class='sheet--subjec-input abc abcNOBorder' style="height: ${h_a[h_a_k]}Px;">`;
          parse += `<div class='sheet--subjec-input abc abcNOBorder' style="padding-top: 10px;padding-bottom: 10px;">`; // 自适应题目框高
        }
        h_a_k += 1
        if (item?.address?.answer) {
          parse += "<div class='rightTop'></div>"
          parse += "<div style='display: flex;'>";
          parse += `<span>${tk + 1 + '.' + (key + 1)}</span>`;
          item.address.topickArray.forEach((answerList) => {
            // parse += "<span>";
            parse += "<span style='flex: 1;padding-right: 30px;display: flex;flex-wrap: wrap;'>";
            let answercount = 1; // 填空 标记序号
            answerList.forEach((answer) => {
              parse += "<span>";
              if (answer.input || answer.paint) {
                // parse += `<span class='sheet--fill-input'>${(key + 1) + '.' + answercount}&nbsp;&nbsp;${repeatStringNumTimes("_", answer.input ? (answer.input.value.length * 2 + 4 >= 12 ? answer.input.value.length * 2 + 4 : 12) : (answer.paint.value.length * 2 + 4 >= 12 ? answer.paint.length * 2 + 4 : 12))}</span>`;
                // parse += `<span class='sheet--fill-input'>${tk + 1 + '.' + (key + 1) + '.' + answercount}&nbsp;&nbsp;${repeatStringNumTimes("_", answer.input ? (answer.input.value.length * 2 + 4 >= 12 ? answer.input.value.length * 2 + 4 : 12) : (answer.paint.value.length * 2 + 4 >= 12 ? answer.paint.length * 2 + 4 : 12))}</span>`;
                parse += `<span class='sheet--fill-input'>${repeatStringNumTimes("_", answer.input ? (answer.input.value.length * 2 + 4 >= 12 ? answer.input.value.length * 2 + 4 : 12) : (answer.paint.value.length * 2 + 4 >= 12 ? answer.paint.length * 2 + 4 : 12))}</span>`;
                // parse += `<span class='sheet--fill-input'></span>`;
                answercount++;
              }
              parse += "</span>";
            })
            parse += "</span>";
          })
          parse += "</div>";
        }
        parse += "</div>";
      })
      parse += "</div>";
      parse += "</div>";
    } else {
      parse += `<div class='sheet--subjec'>
        <h2 style="height: ${h_a[h_a_k]}Px;line-height: ${h_a[h_a_k]}Px;">${keyList[tk] + '、' + tn}</h2>
        <div class='sheet--subjec--contain'>
      `
      h_a_k += 1
      ti_a_l = ti_a.length
      ti_a.forEach((item, key) => {
        c_h = 160
        parse += `<div class="sheet--subjec-input" style="height: ${h_a[h_a_k]}px">${tk + 1 + '.' + (key + 1)}`
        h_a_k += 1
        if (item.sorces) parse += `（${item.sorces}分）`;
        parse += "<div class='rightTop'></div></div>"
      })
      parse += "</div></div>";
    }
    parse += "</div>";
    longString += parse;
  })
  // console.log(longString, 'longString')
  return longString
}

export const unAutoPaperAnswerCard = (topicParams) => {
  // console.log("unAutoPaperAnswerCard")
  let longString = "", indexKey = 0, height = 124, c_h = 0, ti_a_l = 0, h_a_k = 0, h_a = {}
  let topic = topicParams.filter(item => {
    return item[Object.keys(item)[0]].length > 0
  })
  h_a = g_h_list2(topic)
  topic.forEach((topicArryItem, topicArryKey) => {
    let parse = "<div class='answer-sheet-contain'>";
    let longTopicIndex = keyList[indexKey];
    if ((topicArryItem.singleArray?.length > 0) || (topicArryItem.checkboxArray?.length > 0)) {
      parse += "<div class='sheet--select'>";
      if (topicArryItem.singleArray?.length > 0) {
        parse += `<h2 class="sheet--select--header" style="height: ${h_a[h_a_k]}Px;line-height: ${h_a[h_a_k]}Px;">${longTopicIndex}`;
        h_a_k += 1
        parse += "、单选题";
        if (topicArryItem.singleArray[0].sorces) {
          parse += `（每题${topicArryItem.singleArray[0].sorces}分）`;
        }
        parse += "</h2>";
      }
      if (topicArryItem.checkboxArray?.length > 0) {
        parse += `<h2 class="sheet--select--header" style="height: ${h_a[h_a_k]}Px;line-height: ${h_a[h_a_k]}Px;">${longTopicIndex}`;
        h_a_k += 1
        parse += "、多选题";
        if (topicArryItem.checkboxArray[0].sorces) {
          parse += `（每题${topicArryItem.checkboxArray[0].sorces}分）`;
        }
        parse += "</h2>";
      }
      parse += `<div class='contain' style="height: ${h_a[h_a_k]}px">`;
      h_a_k += 1
      parse += selectArray(topicArryItem.singleArray, topicArryKey);
      parse += selectArray(topicArryItem.checkboxArray, topicArryKey);
      parse += "</div>";
      parse += "</div>";
      indexKey += 1;
    }
    if (topicArryItem.fill?.length > 0) {
      parse += "<div class='sheet--fill'>";
      parse += `<h2 style="height: ${h_a[h_a_k]}Px;line-height: ${h_a[h_a_k]}Px;">${longTopicIndex + '、' + '填空题'}`;
      if (topicArryItem.length > 0 && topicArryItem[0].sorces) {
        parse += `（每题${topicArryItem[0].sorces}分）`;
      }
      h_a_k += 1
      parse += "</h2>";
      parse += "<div class='sheet--fill--contain'>";
      topicArryItem.fill.forEach((item, key) => {
        if (key === 0) {
          // parse += `<div class='sheet--subjec-input abc' style="height: ${h_a[h_a_k]}Px;">`;
          parse += `<div class='sheet--subjec-input abc' style="padding-top: 10px;padding-bottom: 10px;">`; // 后加
        } else {
          // parse += `<div class='sheet--subjec-input abc abcNOBorder' style="height: ${h_a[h_a_k]}Px;">`;
          parse += `<div class='sheet--subjec-input abc abcNOBorder' style="padding-top: 10px;padding-bottom: 10px;">`; // 后加
          // parse += `<div class='sheet--subjec-input abc abcNOBorder'>`;
        }
        h_a_k += 1
        if (item?.answer.length > 0) {
          parse += "<div class='rightTop'></div>"
          parse += "<div style='display: flex;'>"; // 后加
          parse += `<span>${topicArryKey + 1 + '.' + (key + 1)}</span>`;
          parse += "<span style='flex: 1;padding-right: 30px;display: flex;flex-wrap: wrap;'>"; // 后加
          let answercount = 1; // 填空 标记序号 // 后加
          item.answer.forEach((answer) => {
            // console.log(answer,"answer", (key + 1) + '.' + answercount, answer.value.length * 2 + 4);
            // parse += "<span class='sheet--fill-input'></span>";
            parse += "<span>"; // 后加
            parse += `<span class='sheet--fill-input'>
            ${repeatStringNumTimes("_", answer.value.length * 2 + 4 >= 12 ? answer.value.length * 2 + 4 : 12)}
            </span>`; // 后加
            // ${ topicArryKey + 1 + '.' + (key + 1) + '.' + answercount}&nbsp;&nbsp;
            parse += "<span>"; // 后加
            answercount++; // 后加
          })
          parse += "</span>"; // 后加
          parse += "</div>"; // 后加
        }
        parse += "</div>";
      })
      parse += "</div>";
      parse += "</div>";
      indexKey += 1;
    }
    if (topicArryItem.subject?.length > 0) {
      parse += "<div class='sheet--subjec'>";
      parse += `<h2 style="height: ${h_a[h_a_k]}Px;line-height: ${h_a[h_a_k]}Px;">${longTopicIndex + '、' + '主观题'}</h2>`;
      h_a_k += 1
      parse += "<div class='sheet--subjec--contain'>";
      topicArryItem.subject.forEach((item, key) => {
        parse += `<div class="sheet--subjec-input" style="height: ${h_a[h_a_k]}px">${topicArryKey + 1 + '.' + (key + 1)}`
        h_a_k += 1
        if (item.sorces) {
          parse += `（${item.sorces}分）`;
        }
        parse += "<div class='rightTop'></div>"
        parse += "</div>";
      })
      parse += "</div>";
      parse += "</div>";
      indexKey += 1;
    }
    parse += "</div>";
    longString += parse;
  })
  return longString
}


const selectArray = (arr, topicArryKey) => {
  if (!arr) return ""
  let parse = "";
  arr.forEach((item) => {
    parse += "<div class='contain-item'>";
    parse += `<span class="item-select-key">${topicArryKey + 1 + '.' + item.key}</span>`;
    parse += "<div class='select-list' style='flex:3;padding-left: 10px;'>";
    item.select.forEach((item, key) => {
      if (key !== 0) {
        parse += `<span style="padding-right: 5px;">[${getKey(key)}]</span>`;
      }
    })
    parse += "</div>";
    parse += "</div>";
  })
  return parse
}

export const keyNumList = {
  0: "一",
  1: "二",
  2: "三",
  3: "四",
  4: "五",
  5: "六",
  6: "七",
  7: "八",
  8: "九",
  9: "十"
}

export const scrollList = [0, 1700, 3388, 5076, 6764, 8452, 10140, 11828, 13516, 15204, 16892, 18580, 20268, 21956, 23644, 25332, 27020, 28368, 30036, 32084, 33772, 35040, 36708, 38376, 40044]


const selectKeyArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]

export function fotmatSelectKey(key) {
  if (!key) return;
  return selectKeyArr[key - 1] + "、";
}

export function fotmatSelectKey2(key) {
  if (!key) return;
  return selectKeyArr[key - 1];
}

export function fotmatSelectKey3(value) {
  let key = selectKeyArr.indexOf(value)
  if (key > -1) return key
  else return null
}

export function keyValue(key) {
  let two = key
  return two
}

export const image_url_file = {
  /* 将图片（路径）转换为Base64 */
  getBase64FromImageURL(url, callback) {
    let canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      let base64URL = canvas.toDataURL('image/png');
      callback(base64URL);
      canvas = null;
    };
    img.src = url;
  },
  /* 将base64转换为file类型 */
  getFileFromBase64(base64URL, filename) {
    let arr = base64URL.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
