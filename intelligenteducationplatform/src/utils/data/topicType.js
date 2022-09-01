
export const singleType = [
  "选择题",
  "多项选择题",
  "双选题",
  "听力选择题",
  "多选题",
  "不定项选择题",
  "单项选择",
  "听力-选择题",
  "单项选择题",
  "单选题"
]
// 填空
export const fillType = [
  "句型转换",
  "单句语法填空",
  "匹配题",
  "单词拼写",
  "单词拼写-单句",
  "完形填空",
  "简答题",
  "单词拼写（词汇运用）",
  "排序题",
  "单项填空",
  "实验探究题",
  "名句默写",
  "实验题",
  "短文填词",
  "听力填空",
  "语段阅读",
  "多空题",
  "语法填空",
  "字母",
  "单空题",
  "词汇互译",
  "看图题",
  "探究题",
  "情景交际",
  "选择填充题",
  "选词填空-句子",
  "推断题",
  "材料题",
  "填空题"
]

// 多选
export const danxuanType = [
  "选择题",
  "听力选择题",
  "单项选择",
  "听力-选择题",
  "单项选择题",
  "单选题"
]

// 双选
export const shuanxuanType = [
  "多项选择题",
  "双选题",
  "多选题",
  "不定项选择题"
]

import grade from "./grade.json"

export function gradeFormat() {
  let gradeMap = new Map()
  grade.forEach(item => {
    item.children.forEach(child => {
      gradeMap.set(child.id, child.text)
    })
  })
  return gradeMap
}

import textbook from "./textbook.json"

export function textbookFormat() {
  let textbookMap = new Map()
  textbook.forEach(item => {
    textbookMap.set(item.id, item.name)
  })
  return textbookMap
}
