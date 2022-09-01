let COS = require('cos-js-sdk-v5');

const Bucket = 'images-1258054530'; //存储桶的名称，命名规则为 BucketName-APPID，此处填写的存储桶名称必须为此格式
const Region = 'ap-guangzhou'; //存储桶所在地域

let getAuthorization = function (options, callback) {
    // 格式四、（不推荐，适用于前端调试，避免泄露密钥）前端使用固定密钥计算签名
    let authorization = COS.getAuthorization({
      SecretId: 'AKIDYUCw6LeC9D0ZtCqkeV7TTE4jANTKjKRY', // 可传固定密钥或者临时密钥
      SecretKey: 'GI4MqCOSfz7xVqvlCPMBzWpuso61h8Jc', // 可传固定密钥或者临时密钥
      Method: options.Method,
      Pathname: options.Pathname,
      Query: options.Query,
      Headers: options.Headers,
      Expires: 900,
    });
    callback({
        Authorization: authorization,
    });
};
//获取
export function getFileFromTencentCloud(Key) {
	return new Promise((resolve, reject) => {
        let cos = new COS({
            getAuthorization: getAuthorization,
            SecretId: "AKIDYUCw6LeC9D0ZtCqkeV7TTE4jANTKjKRY",
            SecretKey: "GI4MqCOSfz7xVqvlCPMBzWpuso61h8Jc",
        });
		cos.getObjectUrl({
			Bucket: Bucket,
			Region: Region,
			Key: Key,
			Sign: true
		}, function(err, data) {
			console.log(err || data);
			resolve(data)
		});
	})
}
//删除
export function deleteFileToTencentClound(Key) {
	// console.log(Key)
	return new Promise((resolve, reject) => {
        let cos = new COS({
            getAuthorization: getAuthorization,
            SecretId: "AKIDYUCw6LeC9D0ZtCqkeV7TTE4jANTKjKRY",
            SecretKey: "GI4MqCOSfz7xVqvlCPMBzWpuso61h8Jc",
        });
		cos.deleteObject({
			Bucket: Bucket,
			Region: Region,
			Key: Key,
		}, function(err, data) {
			console.log(err || data);
			resolve(data)
		});
	})
}


//上传图片到腾讯云 （"- "）批量上传
export function uploadFileToTencentClound(files, action = "black/essayOcr/", filename = "") {
	return new Promise((resolve, reject) => {
		console.log(files);
		let fileList = files.map(function(file) {
			// let pathArr = file.path.split('.');
			//  随机生成文件名称
			let fileRandName = new Date().getTime() + Math.random().toString(36).substr(2);
			// let fileName = fileRandName + '.' + pathArr[pathArr.length - 1];
            let fileName = fileRandName + '.' + 'png';
            console.log('ceshi')
			return Object.assign(file, {
				Bucket: Bucket,
				Region: Region,
				Key: action + fileName,
				Body: file.path,
				onTaskReady: function(taskId) {
					/* taskId可通过队列操作来取消上传cos.cancelTask(taskId)、停止上传cos.pauseTask(taskId)、重新开始上传cos.restartTask(taskId) */
					// console.log(taskId, 'wewewe');
				}
			})
		})
        console.log(fileList,'ceshi2')
        let cos = new COS({
            getAuthorization: getAuthorization,
            SecretId: "AKIDYUCw6LeC9D0ZtCqkeV7TTE4jANTKjKRY",
            SecretKey: "GI4MqCOSfz7xVqvlCPMBzWpuso61h8Jc",
        });
		cos.uploadFiles({
			files: fileList,
			SliceSize: 1024 * 1024 * 10,
			/* 设置大于10MB采用分块上传 */
			onProgress: function(info) {
				let percent = parseInt(info.percent * 10000) / 100;
				let speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
				// console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
			},
			onFileFinish: function(err, data, options) {
				// console.log(err, '上传失败')
				console.log(options.Key + '上传' + (err ? '失败' : '完成'));
			},
		}, function(err, data) {
            console.log(err,'err')
			// console.log(data,'data');
			let key = []
			let path = []
			data.files.map(item => {
				let d = item.data
				let op = item.options
				if(d.statusCode === 200){
					key.push(op.Key)
					// path.push(op.path)	
					let result = {
						key,
						// path				
					}
					resolve(result)
				}
			})
			// resolve(data.files)
		});
	})
}
export default {
	uploadFileToTencentClound,
	deleteFileToTencentClound,
	getFileFromTencentCloud
}