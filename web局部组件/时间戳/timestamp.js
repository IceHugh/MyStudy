getTimeShow = function(time_str){
	var now = new Date();
	var date =  new Date(time_str);
	var inter = parseInt((now.getTime() - date.getTime())/1000/60);
	if(inter == 0){
		return '刚刚';
	}else if(inter < 60){
		return inter.toString() + '分钟前';
	}else if(inter < 60*24){
		return parseInt(inter/60) + "小时前";
	}else if(now.getFullYear() === date.getFullYear()){
		return (date.getMonth()+1).toString() + '-' + date.getDate().toString() + ' ' + date.getHours() + ':' + date.getMinutes();
	}else{
		return date.getFullYear().toString().substring(2,4) + '-' + (date.getMonth().toString()) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
	}
	console.log(inter);
}·