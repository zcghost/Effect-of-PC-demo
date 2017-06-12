/*
*
* 新浪表单输入框提示js代码
*
*
*/
window.onload = function(){
	var s1 = new Suggest();   // 创建一个实例化对象,构造函数
	s1.init();   //初始化程序
};

// 构造函数
function Suggest(){
	this.oInput = document.getElementById('input1');  // 获取输入框
	this.oUl = document.getElementById('suggest');    // 下拉层
	this.aLi = this.oUl.getElementsByTagName('li');   // 获取li
}

Suggest.prototype = {
	// 初始化init
	init : function(){
		this.toChange();
		this.toBlur();   // 光标移开
	},
	toChange : function(){
		//ie : onpropertychange
		//标准 : oninput
		var ie = !-[1,]; // 与IE进行区分
		var This = this;
		
		if(ie){
			this.oInput.onpropertychange = function(){
				if(This.oInput.value==''){ 
					This.tips(); 
					return;
				}
				This.thowUl();
				This.tips();
				This.sel(1);
			};
		}
		else{
			this.oInput.oninput = function(){
				This.thowUl();
				This.tips();
				This.sel(1);
			};
		}
	},
	thowUl : function(){ // 显示
		this.oUl.style.display = 'block';
	},
	toBlur : function(){
		var This = this;
		this.oInput.onblur = function(){
			This.oUl.style.display = 'none';
		};
	},
	tips : function(){
	
		var value = this.oInput.value;
		var re = new RegExp('@'+value.substring(value.indexOf('@')+1)+'');
	
		for(var i=1;i<this.aLi.length;i++){
			this.aLi[i].style.display = 'block';
		}
	
		if(re.test(value)){
			
			for(var i=1;i<this.aLi.length;i++){
				var oEmail = this.aLi[i].getAttribute('email');
				if(i==1){
					this.aLi[i].innerHTML = value;
				}
				else{
					if(re.test(oEmail)){
						this.aLi[i].style.display = 'block';
					}
					else{
						this.aLi[i].style.display = 'none';
					}
				}
			}
			
		}
		else{
			for(var i=1;i<this.aLi.length;i++){
				var oEmail = this.aLi[i].getAttribute('email');
				if(!oEmail){
					this.aLi[i].innerHTML = value;
				}
				else{
					this.aLi[i].innerHTML = value + oEmail;
				}
			}
		}
	},
	sel : function(iNow){
		
		var This = this;
		
		for(var i=1;i<this.aLi.length;i++){
			this.aLi[i].className = 'item';
		}
		
		if(this.oInput.value == ''){
			this.aLi[iNow].className = 'item';
		}
		else{
			this.aLi[iNow].className = 'active';
		}
		
		
		for(var i=1;i<this.aLi.length;i++){
			this.aLi[i].index = i;
			this.aLi[i].onmouseover = function(){
				for(var i=1;i<This.aLi.length;i++){
					This.aLi[i].className = 'item';
				}
				this.className = 'active';
				iNow = this.index;
			};
			
			this.aLi[i].onmousedown = function(){
				This.oInput.value = this.innerHTML;
			};
		}
		
		this.oInput.onkeydown = function(ev){
			var ev = ev || window.event;
			if(ev.keyCode == 38){  //上
				if(iNow == 1){
					iNow = This.aLi.length-1;
				}
				else{
					iNow--;
				}
				for(var i=1;i<This.aLi.length;i++){
					This.aLi[i].className = 'item';
				}
				This.aLi[iNow].className = 'active';
			}
			else if(ev.keyCode == 40){  //下
				if(iNow == This.aLi.length-1){
					iNow = 1;
				}
				else{
					iNow++;
				}
				for(var i=1;i<This.aLi.length;i++){
					This.aLi[i].className = 'item';
				}
				This.aLi[iNow].className = 'active';
			}
			else if(ev.keyCode == 13){  //回车
				This.oInput.value = This.aLi[iNow].innerHTML;
				This.oInput.blur();	
			}
		};
		
	}
};