
$(function() {
	var dates = ['2014/04/25', '2014/08/26', '2014/08/27','2014/08/31', '2014/09/01', '2014/09/11', '2014/09/12', '2014/09/13', '2014/01/17','2014/01/01','2014/01/02','2014/01/03'];
	var msg =['本科入学报到','本科开学典礼','不参加社会实践的研究生注册','研究生入学报到','研究生开学典礼','参加社会实践的研究生注册','参加社会实践的研究生注册','本科生、研究生上课','研究生毕业典礼','元旦假期','元旦假期','元旦假期'];
		$( "#datepicker" ).datepicker(
		{
			numberOfMonths: lod(),
			regional:'zh-CN',
			onSelect:function(dateText){
					alert($.inArray(dateText.replace(/-/g,"/"),dates)<0?'无事件':msg[$.inArray(dateText.replace(/-/g,"/"),dates)]);
				},
			beforeShowDay: highlightDays,
			beforeShow:function(){alert('')}
			
		}
	)
	 function highlightDays(date) {
		for (var i = 0; i < dates.length; i++) {
			if (new Date(dates[i]).toDateString() == date.toDateString()) {
						  return [true, 'highlight'];
				  }
		  }
		  return [true, ''];
		}  
	/*resizeDatepicker();
	function resizeDatepicker(){
		setTimeout(function() {  $('#datepicker .ui-datepicker-inline').css("width","450px"); }, 0);
	}*/
	
	$(window).bind("resize",function(){
			lod();
		})
	function lod()
	{
		if($(window).outerWidth()<=640 && $(window).outerWidth()>=480)
		{
			$( "#datepicker" ).datepicker( "option", "numberOfMonths", 2 ); 
			return 2
		}else if($(window).outerWidth()<480){
			$( "#datepicker" ).datepicker( "option", "numberOfMonths", 1 ); 
			return 1
		}else
		{
			$( "#datepicker" ).datepicker( "option", "numberOfMonths",3 ); 
			return 3
		}
	}
  
});
