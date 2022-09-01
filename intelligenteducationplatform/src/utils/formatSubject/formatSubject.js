/*
1.该函数返回的是一个数字 和下面的函数根据传入数字返回科目类别 是互逆过程
*/
export  function formatSubject (n,subject) {
 const subjectList = ['语文','数学','英语','历史','地理','政治','生物','物理','化学','科学','道德与法治']
 let i = subjectList.indexOf(subject) + 1
 let num = 200 + i
 let sn = n.toString()+num.toString()
 return parseInt(sn)
}
export function formatexamSubject(n) {
   let N = parseInt(n)
   const subjectList = ['语文','数学','英语','历史','地理','政治','生物','物理','化学','科学','道德与法治']
   if( N > 6000 && N < 7000 ) {
      let num =  N -6000-200
      return subjectList[num-1]
   } else if ( parseInt(n) > 7000 && parseInt(n) < 8000 ) {
    let num =  N -7000-200
    return subjectList[num-1]
   }
}
export function formatexamType(n) {
   if( parseInt(n) > 6000 && parseInt(n) < 7000 ) return '外部试卷'
   else if(parseInt(n) > 9000 && parseInt(n) < 9212) return '外部试卷答题卡'
   else if ( parseInt(n) > 7000 && parseInt(n) < 8000 ) return '内部试卷'
}