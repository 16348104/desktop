 var CURRENTSERVERDATE="2014-03-01";//请按照格式生成服务器当前时间，因为客户端时间不一定准确
 var LIMITDATE="2014-03-01";//看能到的最早年月，测试时用2月，上线时请用3月，因为3月之前没有这个版本的图片
 var PRELOADIMGNUM=5;//预加载图片个数
$(function(){
$.ajax({url:'/application/gettime.jsp',async:false, success: function(data){
		CURRENTSERVERDATE = data;
	   }
           })
			//var jdata={};
			var cal;
			CURRENTSERVERDATE=parseISO8601(CURRENTSERVERDATE);
			LIMITDATE=parseISO8601(LIMITDATE);
			//$.ajax({url:"./data/thuimg.js",dataType:"json",cache:false,success:function(data){
				//jdata=data;
				cal=new Calendar(jdata);
				cal.cal();
				$('#thuimgPre').click(function(){
					goPreDate();
				})
				$('#thuimgNext').click(function(){
					goNextDate();
				})
				
				$('#calendarMonthpre').click(function(){
					cal.subMonth();
				})
				$('#calendarMonthnext').click(function(){
					cal.addMonth();
				})
				
				$("#calendarDay a").live("click",function(){if(!$(this).hasClass('none'))GetImg($("#calendarYear").text(),$("#calendarMonth").text(),$(this).text())});
				
				var tmpdate=new Date(CURRENTSERVERDATE);
				tmpdate=getClosedDate(tmpdate);
				GetImg(tmpdate.Format("yyyy"),tmpdate.Format("MM"),tmpdate.Format("d"));
				$(window).resize(function(){$(".thuimga").css("height",(4/12)*$("#thuimgWrap .mainImg").width());});
			//}});
			
			function GetImg(y,m,d)
			{
				var date=takefulldate(y,m,d);
				 if(jdata[date]){
					 $("#calendarDay a").each(function(){
						 if($("#calendarYear").text()==y && dulnum($("#calendarMonth").text())==dulnum(m) && $(this).text()==d) {$(this).addClass("current");}else{$(this).removeClass("current");}
						})
					if(date==takefulldate(CURRENTSERVERDATE.Format("yyyy"),CURRENTSERVERDATE.Format("MM"),CURRENTSERVERDATE.Format("dd")))
					{
						$('#calendarToday').html("Today").addClass("today");
						$('#thuimgNext').hide();//如果是最新的日期，隐藏向前的箭头
					}else
					{
						$('#calendarToday').html(parseISO8601(date).Format('yyyy.M.d')).removeClass("today");
						
						if(jdata[date].id!="1"){$('#thuimgNext').show()}else{$('#thuimgNext').hide()}
						
						if(parseInt(y,10)==LIMITDATE.getFullYear() && parseInt(m,10)==LIMITDATE.getMonth()+1) //最后月，隐藏向后翻箭头
						{
							if($("#calendarDay a").not(".none").first().text()==d)//当前月的有数据的第一天
							{
								$('#thuimgPre').hide();
							}else
							{
								$('#thuimgPre').show();
							}
						}else
						{
							$('#thuimgPre').show();
						}
						
					}
					
					ImgAction(date);
					preload(date);
				 }
			}
			
			function ImgAction(date)
			{
				var calender_bigimg=$("#thuimgWrap .mainImg");
				var swfid=$("#thuimgWrap .thuimga #swfid");
				if(checkflash() && jdata[date].swf)
				{
					calender_bigimg.attr({"src":"/publish/newthu/images/blank.png","date":date});
					calender_bigimg.show();
					$('#thuImgTitle').text(jdata[date].title);
					$('.thua').attr("href",jdata[date].url);
					if(swfid.length>0){
						swfid.remove();
					}
					$("#thuimgWrap .thuimga").append('<embed id="swfid" style="position:relative;z-index:-1;" src="'+jdata[date].swf+'" wmode="transparent" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>');
				}else{
					var bimg=new Image();
					bimg.onload=function()
					{	
						calender_bigimg.attr({"src":this.src,"date":date});
						calender_bigimg.animate({opacity:'show',left:0},500);
						$('#thuImgTitle').text(jdata[date].title);
						$('.thua').attr("href",jdata[date].url);
						$(".thuimga").css("height",(4/12)*calender_bigimg.width());
						if(jdata[date].js)
						{
							$.getScript(jdata[date].js);
						}
					}
					calender_bigimg.css("left","20px").hide();
					swfid.hide();
					bimg.src=jdata[date].img;
				}
					$('#jsarea').remove();
			}

		
			function preload(date)
			{
				var preimg=[];
				var tmpdate=parseISO8601(date);
				tmpdate=getClosedDate(tmpdate);
				for(var ii=0;ii<PRELOADIMGNUM;ii++)
				{
					preimg[ii]=new Image();
					if(jdata[tmpdate.Format("yyyy-MM-dd")])preimg[ii].src=jdata[tmpdate.Format("yyyy-MM-dd")].img;
					tmpdate.setDate(tmpdate.getDate()-1);
					tmpdate=getClosedDate(tmpdate);
				}
			}
			
			function getClosedDate(tmpdate) {//如果当前时间没有数据则往前找有数据的一条记录
					 
					 if(jdata[takefulldate(tmpdate.Format("yyyy"),tmpdate.Format("MM"),tmpdate.Format("dd"))]){
					  }else
					 {
						 tmpdate.setDate(tmpdate.getDate()-1);
						 if(tmpdate<=LIMITDATE) return tmpdate;
						 if(tmpdate!="NaN")getClosedDate(tmpdate);
					 }
					 
					 return tmpdate;
				}
			
			function goPreDate()
			{
				var p=$("#calendarDay a.current").parent();
				function getp() //找到之前日中有数据的列
				{
					if($(p)[0]==$("#calendarDay li:first")[0]) //如果是第一列则要向后退一个月
					{
						cal.subMonth();
						p=$("#calendarDay li:last");
					}else
					{
						p=p.prev();
					}
					
					if(p.length==0) //每个月第一天，新图还未发布时问题
					{
						cal.subMonth();
						p=$("#calendarDay a:not(.none):last").parent();
						p=p.prev();
					}
					
					if (p.children("a.none").length>0)
					{
						getp();
					}
					return p;
				}
				p=getp();
				GetImg($("#calendarYear").text(),$("#calendarMonth").text(),$(p).text())
			}
			
			
			function goNextDate()
			{
				var p=$("#calendarDay a.current").parent();
				function getp()//找到之后日中有数据的列
				{
					if($(p)[0]==$("#calendarDay li:last")[0])//月末则要向前进一个月
					{
						cal.addMonth();
						p=$("#calendarDay li:first");
					}else
					{
						p=p.next();
					}
					if (p.children("a.none").length>0)
					{
						getp();
					}
					return p;
				}
				p=getp();
				GetImg($("#calendarYear").text(),$("#calendarMonth").text(),$(p).text())
			}
			
			
		})
		
function dulnum(num)
	{
		num=parseInt(num,10);
		if(num<10 && num>0)
		{
			return "0"+num;
		}
		return num;
}

function takefulldate(yer,mon,da)
{
	var mon=parseInt(mon,10);
	var da=parseInt(da,10);
	return yer+"-"+dulnum(mon)+"-"+dulnum(da);
}

function checkflash()
{
	if(navigator.plugins['Shockwave Flash'] ){
		return true;
	}
	try{
		return !!new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	}catch(e){
		return false;
	}
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function parseISO8601(dateStringInRange) {  
   var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,  
       date = new Date(NaN), month,  
       parts = isoExp.exec(dateStringInRange);  
  
   if(parts) {  
     month = +parts[2];  
     date.setFullYear(parts[1], month - 1, parts[3]);  
     if(month != date.getMonth() + 1) {  
       date.setTime(NaN);  
     }  
   }  
   return date;  
 }  


 function Calendar(data) {
	 
	 var oo=this;
	 var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31);
	 var today=new getToday();
	 var year=today.year;
	 var month=today.month;
	 
	this.cal=function(){	 
		  var startDay = 1;
		  var endDay=this.getDays(month,year);
		  var inh="";
		  for (var intLoop = 1; intLoop <= endDay;intLoop++) 
		  {
			  	var date=year+"-"+dulnum(month)+"-"+dulnum(intLoop);
			    if(data[date])
				{	
					if(date==$("#thuimgWrap .mainImg").attr("date"))
					{
						inh+='<li><a class="current">'+intLoop+'</a></li>'
					}else
					{
						inh+='<li><a>'+intLoop+'</a></li>'
					}
				}else
				{
					inh+='<li><a class="none">'+intLoop+'</a></li>'
				}
		  }
			$("#calendarDay").html(inh);
			$("#calendarMonth").html(month);
			$("#calendarYear").html(year);
	}
	
	 this.getDays=function(month, year) {
		  if (1 == month-1) return ((0 == year % 4) && (0 != (year % 100))) ||(0 == year % 400) ? 29 : 28;
		  else return daysInMonth[month-1];
	 }
	 
	 function getToday() {
		  //this.now = new Date();
		  //this.year = this.now.getFullYear();
		  //this.month = this.now.getMonth();
		  //this.day = this.now.getDate();
		  this.year = CURRENTSERVERDATE.getFullYear();
		  this.month = CURRENTSERVERDATE.getMonth()+1;
		  this.day = CURRENTSERVERDATE.getDate();
	 }
	 
	
	 this.subMonth=function(pos)
	 {
		 if(year==LIMITDATE.getFullYear() && month==LIMITDATE.getMonth()+1)return;
		  if ((month)<2)
		  {
		   month=12;
		   year=year-1;
		  } else
		  {
		   month=month-1;
		  }
		  this.cal();
	 }
	 
	 this.addMonth=function()
	 {
		  if(year==today.year && month==today.month)return;
		  if((month)>11)
		  {
		   month=1;
		   year=year+1;
		  } else
		  {
		   month=month+1;
		  }
		  this.cal();
	 }


 }
