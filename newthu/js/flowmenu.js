 $(function(){
	//随屏幕滚动
	if($('#flowmenu').length>0){
		window.guide={};
		guide.ttop=$('#flowmenu').siblings(".leftNav").height()+70;
		guide.top=$('#flowmenu').offset().top;
		guide.scrollheight=$(document).height()-$('.footer').height()-$('#flowmenu').height()-70;
		scrollvisitor();
		$(window).bind('scroll',function(){
			scrollvisitor();
		})
		
/*		$(window).bind("resize",function(){
			guide.ttop=$('#flowmenu').siblings(".leftNav").height()+70;
			guide.top=$('#flowmenu').offset().top;
			guide.scrollheight=$(document).height()-$('.footer').height()-$('#flowmenu').height()-70;
			scrollvisitor();
		})
	*/	
	//点击左边滚动到相应位置；
		$('#flowmenu li').bind('click',function(){
			var attr=$(this).attr('at');
			var top=$('#flowContent h3[at='+attr+']').offset().top-60;
			$('html,body').animate({'scrollTop':top},300);
			$(this).addClass("current").siblings().removeClass("current");
		})
	}
	function scrollvisitor(){
		var top=$(document).scrollTop();
		if(top>=guide.scrollheight){
			$('#flowmenu').css('top',guide.scrollheight-guide.ttop);
		}
		else if(top>=guide.top){
			$('#flowmenu').css({'top':top-guide.ttop+70});
		}
		else{
			$('#flowmenu').css({'top':guide.ttop});
		}
	}
	
						
})