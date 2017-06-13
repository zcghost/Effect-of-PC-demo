/*
* 微博发布框js
* author:wangzhenchuan
* timer:2017/6/13
*  
*  onchange:当光标消失的时候,只能触发一次

   ie:onpropertychange:输入连续触发
   标准:oninput:也是连续触发
*/
 window.onload = function(){
			var oDiv = document.getElementById("div1");
			var oP = oDiv.getElementsByTagName("p")[0];
			var oT = oDiv.getElementsByTagName("textarea")[0];
			var oA = oDiv.getElementsByTagName("a")[0];
			var ie = !-[1,];   // 这是一个很简短的判断是不是IE的
			var bBtn = true;  // 建一个开关
			var timer = null; // 引入一个定时器
			var iNum = 0;
			// 光标移入时
			oT.onfocus = function(){
			      if(bBtn){
			      	  oP.innerHTML = '打击虚假消息,建设文明微博,还可以输入<span>140</span>字';
			      	  btn = false;
			      }
			};
			// 失去焦点时
			oT.onblur = function(){
			      if(oT.value == ""){
			      	  oP.innerHTML = "<<新浪微博社区公约(征求意见稿)意见征求>>";
			      	  bBtn = true;
			      }
			};
			// 做兼容处理
			if(ie){
			     oT.onpropertychange = toChange;
			}else{
			     oT.oninput = toChange;
			}
			// 封装成一个函数
			function toChange(){
			     var num = Math.ceil(getLength(oT.value)/2);
			     var oSpan = oDiv.getElementsByTagName('span')[0];
			      	  	 
			     if(num<=140){
			      	  oSpan.innerHTML = 140-num;
			      	  oSpan.style.color = "";
			     }else{
			      	  oSpan.innerHTML = num-140;
			      	  oSpan.style.color = "red";
			    }
			    //当输入的内容在允许范围之内,按钮变颜色
			    if(oT.value == "" || num>140){
			      	  oA.className = "gray";
			    }else{
			      	  oA.className = "";
			    }
			}
			function getLength(str){
			      	 return String(str).replace(/[^\x00-\xff]/g,"aa").length;
			}
			// 点击发布按钮时
			oA.onclick = function(){
			    if(this.className == "gray"){
				    // 为了防止连续点击,清除定时器
				    clearInterval(timer);
			    	timer = setInterval(function(){
					    if(iNum == 5){
					      	 clearInterval(timer);
					      	 iNum = 0;
					    }else{
			      	    	 iNum++;
			    		}
			    		if(iNum%2){
 					    	oT.style.background="pink";
			    		}else{
			      	    	oT.style.background = "";
			        	}
			    	},100)
			    }else{
			      	alert("发布成功");
			    }
	    }
}