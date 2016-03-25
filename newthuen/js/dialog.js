

$(function(){
	
		$('body').append('<div class="_plugMasklayer"></div>');
		
		var attr=null
		var realLayer=null;
	    $('._plugbox').bind('click',function(e){
			e.preventDefault();
		    attr=$(this).attr('boxid');
			realLayer=$('.ulayer[boxid='+attr+']');
			realLayer.show();
			lrelad();
			$('._plugMasklayer').show();
			$(window).bind("resize",function(){
				lrelad();
			})

			//sa=new scrollbar();
			//sa.detachevent();
	        //sa.bind({'scrollbox':$('._plugLayer[boxid='+attr+']').find('.leftarea .innerarea'),'bar':$('._plugLayer[boxid='+attr+']').find('.sidebar .bar'),'hoverbox':$('._plugLayer[boxid='+attr+']').find('.layerbox'),'step':'15px'});
		})
		$('._plugLayer .close').live('click',function(){
		    $('._plugLayer').hide();
			$('._plugMasklayer').hide();
		})
		
		function lrelad()
		{
			var realLayerbox=$('.ulayer[boxid='+attr+'] .layerbox');
			var currentimgwrap=$('.ulayer[boxid='+attr+'] .imgwrap');
			
			$('._plugLayer').css({'margin-top':-realLayer.outerHeight()/2,"margin-left":-realLayer.outerWidth()/2});
			realLayerbox.css("height",(realLayer.outerHeight()-parseInt(realLayerbox.css("padding-top"),10)-parseInt(realLayerbox.css("padding-bottom"),10)-(currentimgwrap.css("float")!="right"?currentimgwrap.outerHeight():0)));
		}
		
	
})


window.scrollbar=function(){
	      this.y1=0;
		  this.y2=0;
		  this.move=false;
		  this.top=0;
		  this.prop=1;
		  this.maxh=0;
		  this.top_1=0;
		  this.prop_1=1;
		  this.ifwheel=false;
		  this.getTargetEvent=function(obj,eventname,func){
			  if(obj.addEventListener){
			      obj.addEventListener(eventname,func);
			  }
			  else if(obj.attachEvent){
			      obj.attachEvent('on'+eventname,func);
			      return;
			  }
			  else{
			      obj['on'+eventname]=func;
			  }
		  }
		  this.removeTargetEvent=function(obj,eventname,func){
			  if(obj.removeEventListener){
				  if(typeof func=='function'){
					  obj.removeEventListener(eventname,func);
				  }
			  }
			  else if(obj.detachEvent){
				  if(typeof func=='function'){
					  obj.detachEvent('on'+eventname,func);
				  }
			      return;
			  }
			  else{
				  if(typeof func=='function'){
					  obj['on'+eventname]=null;
				  }
			  }
		  }
	   }
	   scrollbar.prototype.scrollsize=function(t,s,a){
		   t=s==0?(t+parseInt(this.bar.css('top'),10)):t;
	       if(t<=0){
			   this.scrollbox.css('top',0);
			   this.bar.css('top',0);
			   return false;
		   }
		   else if(t>=this.maxh){
			   this.bar.css('top',this.maxh+'px');
			   this.scrollbox.css('top',-1*(this.maxh*this.prop)+'px');
			   return false;
		   }
		   else{
			   this.scrollbox.css('top',-1*(t*this.prop)+'px');
			   this.bar.css('top',t+'px');
			   return false;
		   }
	   }
	   scrollbar.prototype.animatescroll=function(t){
	       if(t<=0){
			   this.bar.animate({'top':0},100);this.scrollbox.animate({'top':0},100); return false;
		   }
		   else if(t>=this.maxh){
			  this.bar.animate({'top':-1*(this.maxh*this.prop)+'px'},100);this.scrollbox.animate({'top':-1*(this.maxh*this.prop)+'px'},100);return false;
		   }
		   else{
			   this.bar.animate({'top':t+'px'},100);this.scrollbox.animate({'top':-1*(t*this.prop)+'px'},100);return false;
		   }
	   }
		scrollbar.prototype.detachevent=function(){
			var that=this;
		    if($.browser.mozilla){
			    this.removeTargetEvent(window,'DOMMouseScroll',that.wheelfunc);
		    }
		    else if($.browser.opera && parseFloat($.browser.version)<9.5){
			   this.removeTargetEvent(window,'mousewheel',that.wheelfunc);
		    }
		   else{
			   this.removeTargetEvent(document,'mousewheel',that.wheelfunc);
		   }
		}
	    scrollbar.prototype.bind=function(obj){   
		   this.scrollbox=obj.scrollbox;
		   this.bar=obj.bar;
		   this.hoverscroll=obj.hoverbox;
		   this.scrollbox.css('top',0);
		   this.step=parseInt(typeof obj.step=='undefined'?'20px':obj.step,10);
		   this.bar.css('top',0);
		   var barp_h=this.bar.parent().height();
		   var bar_h=this.bar.height();
		   var scrollboxp_h=this.scrollbox.parent().height();
		   var scrollbox_h=this.scrollbox.height();
		   if(scrollbox_h<=scrollboxp_h){this.bar.css('visibility','hidden');this.bar.parent().css('visibility','hidden'); return false;}else{this.bar.css('visibility','visible');this.bar.parent().css('visibility','visible');}
		   var h1=parseInt(scrollboxp_h/scrollbox_h*barp_h);
		   this.bar.css('height',h1+'px');
		   this.maxh=barp_h-h1;
		   this.prop=scrollbox_h/barp_h;
		   var that=this;
		   this.hoverscroll.hover(function(){that.ifwheel=true;},function(){that.ifwheel=false;})
		   this.wheelfunc=function(event){ if($.browser.mozilla){ if(that.ifwheel==true){ event.preventDefault(); var t=parseInt(event.detail*40*that.step/120); that.scrollsize(t,0); } } else if($.browser.opera && parseFloat($.browser.version)<9.5){ if(that.ifwheel==true){ if(window.event){window.event.returnValue=false;var e=window.event;} else{ event.preventDefault(); var e=event; } var t=parseInt(e.wheelDelta*that.step/120); that.scrollsize(t,0); } } else{ if(that.ifwheel==true){ if(window.event){window.event.returnValue=false;var e=window.event;} else{ event.preventDefault(); var e=event; } var t=parseInt(-1*e.wheelDelta*that.step/120); that.scrollsize(t,0); } } }
		   if($.browser.mozilla){
			    this.getTargetEvent(window,'DOMMouseScroll',that.wheelfunc);
		   }
		   else if($.browser.opera && parseFloat($.browser.version)<9.5){
			   this.getTargetEvent(window,'mousewheel',that.wheelfunc);
		   }
		   else{
		       this.getTargetEvent(document,'mousewheel',that.wheelfunc);
		   }
		   this.bar.parent().bind('click',function(e){
			  var target=e.target;
			  if(target==obj.bar[0]){return false;}
			  var top=e.pageY;
			  var top_1=obj.bar.offset().top+obj.bar.height();
			  var t;
			  if(top<obj.bar.offset().top){t=top-obj.bar.parent().offset().top;}
			  else{t=top-top_1+parseInt(obj.bar.css('top'),10);}
			  that.animatescroll(t);
		  })
		   this.bar.bind('mousedown',function(e){
			   e.preventDefault();
		       that.move=true;
			   that.y1=e.pageY;
			   that.top=parseInt(that.bar.css('top'),10);
			   that.top_1=parseInt(that.scrollbox.css('top'),10);
		   })
		   $(document).bind('mousemove',function(e){
		       if(that.move==true){
			       that.y2=e.pageY;
				   var x=that.y2-that.y1;
				   var top=x+that.top;
				   that.scrollsize(top,1);
			   }
		   }).bind('mouseup',function(e){
			   if(that.move==true){
				that.move=false;
				that.y1=that.y2=that.top=that.top_1=0;}
		  })
		  
	  }
