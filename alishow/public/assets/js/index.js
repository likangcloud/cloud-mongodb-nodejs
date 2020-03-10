// 获取文章的数量
$.ajax({
	type: 'get',
	url: '/posts/count',
	success: function (response) {
		$('#post').html('<strong>'+ response.postCount +'</strong>篇文章（<strong>'+ response.draftCount +'</strong>篇草稿）')
	}
});

// 获取分类数量
$.ajax({
	type: 'get',
	url: '/categories/count',
	success: function (response) {
		$('#category').html('<strong>'+response.categoryCount+'</strong>个分类')
		$("#menus").append(response.categoryCount)
	}
})

// 获取评论数量
$.ajax({
	type: 'get',
	url: '/comments/count',
	success: function (response) {
		$('#comment').html('<strong>'+ response.commentCount +'</strong>条评论')
	}
})



//总用户数：
$.ajax({
	type: 'get',
	url: '/users',
	success: function (response) {
		//用户总数：
		$("#counts").append(response.length)
		//管理员用户数：
		var adminArr = []
		//普通用户数：
		var normalArr = []
		for(var i = 0;i < response.length;i++){
		  if(response[i].role == 'admin'){
			adminArr.push(response[i])		
		  }else{
			normalArr.push(response[i])	
		  } 
		}
		$("#puser").append(normalArr.length)   //获取普通用户数量：
		$("#guser").append(adminArr.length)   //获取管理员用户数量：
		

		 

	}
})




window.onload  =function(){
	let useData = []
	var z = Number($("#counts").html())
	useData.push(z)
	var p = Number($("#puser").html())
	useData.push(p)
	var g = Number($("#guser").html())
	useData.push(g)
	var d = Number($("#menus").html())
	useData.push(d)
	

	console.log(useData)


    //初始化实例
    var option = {
		title: {
			text: '数据统计',
			subtext: '',
			sublink: 'http://e.weibo.com/1341556070/AjQH99che'
		},
		color: ['#3398DB'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data: ['用户总数', '普通用户总数', '管理员总数', '管理频道'],
				axisTick: {
					alignWithLabel: true
				}
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: '直接访问',
				type: 'bar',
				barWidth: '60%',
				data: useData
			}
		]
	};
    let myChart = echarts.init(document.getElementById('echarts1'));
    


     //模拟定时器刷新数据：
   
     
    
    
     function  getList(){
     myChart.setOption(option);
     }
     getList()

     window.onresize = function(){
		myChart.resize()
		myChart1.resize()
     }


	 $.ajax({
		type: 'get',
		url: '/posts/count',
		success: function (response) {
    //初始化实例
    var option1 = {
		title: {
			text: '发布分析',
			subtext: '',
			left: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)'
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['已发布', '草稿']
		},
		color : [ '#4caf50', '#ff9800'],
		series: [
			{
				name: '访问来源',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: [
					{value:response.postCount, name: '已发布'},
					{value: response.draftCount, name: '草稿'},
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				},
				
			}
		]
	};
    let myChart1 = echarts.init(document.getElementById('echarts2'));
    
	function  getchart(){
		myChart1.setOption(option1);
		}
		getchart()

	}
});





	}