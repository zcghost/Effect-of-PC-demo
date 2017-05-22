/*
* QQ幻灯片轮播
* time:2017/5/22
* author:wangzhenchuan
*
*/



window.onload=function ()
{
	/*获取元素*/
	var oDiv=document.getElementById('box');
	var aPicLi=document.getElementById('pic_list').getElementsByTagName('li');
	var aTxtLi=document.getElementById('text_list').getElementsByTagName('li');
	var oIcoUl=document.getElementById('ico_list').getElementsByTagName('ul')[0];
	var aIcoLi=document.getElementById('ico_list').getElementsByTagName('li');
	var oBtnPrev=document.getElementById('btn_prev');
	var oBtnNext=document.getElementById('btn_next');
	var iNowUlLeft=0;
	var iNow=0;
	var i=0;
	// 前按钮操作
	oBtnPrev.onclick=function ()
	{ 
		if(iNowUlLeft>0)
		{
			iNowUlLeft--;

			fixUlLeft();
		}
	};
	// 底下ul列表的移动
	function fixUlLeft()
	{
		oBtnPrev.className=iNowUlLeft==0?'btn':'btn showBtn';// 箭头颜色灰暗切换
		oBtnNext.className=iNowUlLeft==(aIcoLi.length-7)?'btn':'btn showBtn';// 最后一个按钮的时候,变灰色
		//oIcoUl.style.left = -aIconLi[0].offsetWidth*iNowUlLeft+"px";
		miaovStartMove(oIcoUl, {left: -aIcoLi[0].offsetWidth*iNowUlLeft}, MIAOV_MOVE_TYPE.BUFFER);// 最后一个参数是运动形式
	}
	// 下一个按钮
	oBtnNext.onclick=function ()
	{
		if(iNowUlLeft<aIcoLi.length-7) //总共14张图片 一屏显示7张图片,在点击的时候就出问题了的
		{
			iNowUlLeft++;
			
			fixUlLeft();
		}
	};
	
	for(i=0;i<aIcoLi.length;i++)
	{
		aIcoLi[i].index=i; // 添加一个索引
		/*添加事件*/
		aIcoLi[i].onclick=function ()
		{
			if(iNow==this.index) // 点击重复的图片,出现闪烁的问题
			{
				return;
			}
			
			iNow=this.index;   // 解决重复点击图片闪烁的问题
			
			tab();
		};
	}
	
	function tab()
	{
		for(i=0;i<aIcoLi.length;i++)
		{
			/*先去掉所有的li的className,然后在添加*/
			aIcoLi[i].className='';
			aTxtLi[i].getElementsByTagName('h2')[0].className='';
			aPicLi[i].style.filter='alpha(opacity:0)';
			aPicLi[i].style.opacity=0;
			miaovStopMove(aPicLi[i]); // 解决重复点击各图片频繁切换问题
		}
		aIcoLi[iNow].className='active';
		aTxtLi[iNow].getElementsByTagName('h2')[0].className='show';
		miaovStartMove(aPicLi[iNow], {opacity: 100}, MIAOV_MOVE_TYPE.BUFFER);
	}
	// 封装一自动播放函数
	function autoPlay()
	{
		iNow++;
		// 自动播放设置
		if(iNow>=aIcoLi.length)
		{
			iNow=0;
		}
		
		if(iNow<iNowUlLeft)
		{
			iNowUlLeft=iNow;
		}
		else if(iNow>=iNowUlLeft+7)
		{
			iNowUlLeft=iNow-6;
		}
		
		fixUlLeft();
		tab();
	}
    // 设置定时器
	var timer=setInterval(autoPlay, 2000);
	// 当鼠标移入时,暂停自动播放
	oDiv.onmouseover=function ()
	{
		clearInterval(timer);
	};
	// 当鼠标移出时,开启定时器
	oDiv.onmouseout=function ()
	{
		timer=setInterval(autoPlay,2000);
	};
};