/*
*
* 网页进度条
*
*/
window.onload = function(){

	var iNow = 0;  // 初始值
	// 定时器
	var timer = setInterval(function(){
	
		if(iNow==100){  // 当等于100%时
			clearInterval(timer); // 清除定时器
		}
		else{
			iNow += 1;
			progressFn(iNow);
		}
	
	},30);

	// 进度条函数,传入百分比
	function progressFn(cent){
		// 获取元素
		var oDiv1 = document.getElementById('progressBox');
		var oDiv2 = document.getElementById('progressBar');
		var oDiv3 = document.getElementById('progressText');
		
		var allWidth = parseInt(getStyle(oDiv1,'width')); // 获取oDiv1的宽度
		
		oDiv2.innerHTML = cent + '%';
		oDiv3.innerHTML = cent + '%';
		oDiv2.style.clip = 'rect(0px, '+ cent/100 * allWidth +'px, 40px, 0px)';
		
		
		function getStyle(obj,attr){ 
			if(obj.currentStyle){ // 要做兼容
				return obj.currentStyle[attr];
			}
			else{
				return getComputedStyle(obj,false)[attr];
			}
		}
	}
};