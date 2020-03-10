module.exports = async (req, res) => {
	let data = {
		url: req.files.upfile.path.split('public')[1],
		state: 'SUCCESS'
	};
	
	// 如果用户上传了文件
	// if (req.files) {
	// 	// 循环结果对象
	// 	for (let attr in req.files) {
	// 		// 如果结果对象中存在path属性
	// 		if(req.files[attr].path) {
	// 			// 将值存储到结果数组中
	// 			imgsPath.push({
	// 				[attr]: req.files[attr].path.split('public')[1]
	// 			})
	// 		}
	// 	}
	// }
	// 将路径响应给客户端
	data = JSON.stringify(data);
	res.send(data);
};