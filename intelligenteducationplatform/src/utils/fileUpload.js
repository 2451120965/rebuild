//图片上传前判断大小
export function onFileChange(e) {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) {
    return;
  }
  let isLt2M = files[0].size / 1024 / 1024 < 1;
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 1MB');
    return;
  }
  createImage(files[0]);
}
//图片上传
export function createImage() {
  let firImg;
  let self = this
  reader.onload = e => {
    let result = e.target.result
    let img = new Image()
    img.src = result
    if (result.length / 1024 > 50) {
      img.onload = function () {
        firImg = self.compress(img, 0.6)
      }
    } else {
      firImg = result
    }
  };
}

/**
 * imgType 压缩图片类型
 */
const imgType = 'image/jpeg'

/**
 *
 * @param {*} img type:Array
 * @param {*} size type:number 压缩精度
 * @returns
 */
// 压缩图片
export async function compress(img, size, is_blob) {
  let files = {}
  for (const key in img) {
    const data = await imgOnload(img[key], size)
    let k = parseInt(key)
    let m = "m0"
    k >= 9 && (m = 'm')
    let res = convertBase64UrlToBlob(data, m, k, is_blob)
    files[key] = res
  }
  return new Promise((resolve, reject) => {
    resolve(files)
  })
}
//使用formData异步上传文件    fieldSet一个对象，属性有 { files, examId }
export function upload(filesField, fieldSet) {
  let formData = new FormData();
  for (const key in fieldSet) {
    if (key === filesField) {
      for (const key1 in fieldSet[key]) {   //遍历传入文件
        formData.append(filesField, fieldSet[key][key1]);
      }
    } else {     //把试卷id与对应文件对应起来
      formData.append(key, fieldSet[key]);
    }
  }
  return formData
}
//根据url下载图片后将url转为base64按照指定格式和大小
const imgOnload = (img, size) => {
  return new Promise((resolve, reject) => {
    let paperImg = new Image()
    // paperImg.src = img + "&timeStamp=" + new Date();
    paperImg.src = img;
    paperImg.crossOrigin = 'Anonymous';
    paperImg.onload = () => {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let width = paperImg.width
      let height = paperImg.height
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(paperImg, 0, 0, width, height)
      //进行最小压缩
      let ndata = canvas.toDataURL(imgType, size)
      resolve(ndata)
    }
    paperImg.onerror = () => reject("加载失败")
  })
}
/*
1.返回一个blob对象或者 file对象 将传入的base64根据逗号截取，对第二个解码，并对解码后的字符用转为unicode式编码 u8arr记录了索引和对应字符的unicode编码
*/
export function convertBase64UrlToBlob(urlData, m, k, is_blob) {
  const bstr = window.atob(urlData.split(',')[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  if (is_blob) {
    return new Blob([u8arr], { type: imgType })
  } else {
    return new File([u8arr], `${m}${k + 1}`, { type: imgType })
  }
}

// import { Addcardimg, Addexamimg,AddAnswerimg } from "@/api/paper";
import { Addcardimg, Addexamimg,addanswerimg } from "@/api/paper";
import store from "@/store"
//作用：根据id从vuex中取出图片，再把examID与对应试卷图片对应起来向后端发过去
export async function uplpadPaperImgs(examId){
  const { imgs, cardImg, answerImg } = store.state.paper;
  const files = await compress(imgs, 1);   //压缩文件
  const formData = upload("files", { files, examId });
  await Addexamimg(formData);   //把封装好的formdata直接发送过去给服务器  添加试卷

  const answerImgFiles = await compress(answerImg, 1);
  const formData0 = upload("files", { files: answerImgFiles, examId });
  await addanswerimg(formData0);

  const cardImgFiles = await compress(cardImg, 1);
  const formData1 = upload("files", { files: cardImgFiles, examId });
  await Addcardimg(formData1);
  return examId
}