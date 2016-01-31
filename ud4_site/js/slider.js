(function($) {

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function tlcb () {
	
	if (!animator.swiping)
	{
		animator.inProgress = false; 
		clearTs();
	}
};
var $activeSlide = $(".active"),
    $homeSlide = $(".homeSlide"),
	$bcg = $(".bcg"),
    $hero = $(".hero"),
	$randomTimeLine = new TimelineMax({ repeat:-1, paused:true, onRepeat: function () { getSlide("down", true);}});
	$randomTimeLine.to($("nothing"), 8, {width:"100px"});
	//$logoTimeline = new TimelineMax({paused: false, repeat:0, onComplete: function () { getSlide("down", true);}}); 
	//$logoTimeline.to($("#nothing"), 4, {width:"100px"});
	TweenLite.set($(".text-copy "), {strokeDasharray:"7% 28%"});
	$le1 = new TimelineMax({paused: false});
	$le1.to($(".text-copy "), 3, {strokeDasharray:"1% 87.5%",  strokeDashoffset: "35%", ease:Linear.easeOut });
	$le1.reverse();
	$le1.progress(1);
	animator = {inProgress : false, transitionTime: .35, swiping: false};//.35
	 $Tup = new TimelineMax({ paused:true, onReverseComplete : function (){tlcb (); }, onComplete: function (){ tlcb ();}});
	 $Tdown=new TimelineMax({ paused:true, onReverseComplete : function (){tlcb (); }, onComplete: function (){ tlcb ();}});
	 $Tleft=new TimelineMax({ paused:true, onReverseComplete : function (){tlcb (); }, onComplete: function (){ tlcb ();}});
	 $Tright=new TimelineMax({ paused:true, onReverseComplete : function (){tlcb (); }, onComplete: function (){ tlcb ();}});
	var _Y;
	var _X;
	dir = null;//двигаем по горизонтали или вертикали или не двигаем
	sens = 0.1; //насколько надо сдвинуть, чтобы определилась ось
	prgSens = 0.15; //насколько сильно сдвинуть, чтобы оторвать от края
	$("html").mousemove(function(event){
		if (!animator.inProgress)
		{
			var xPos = -(((event.pageX  - $( this ).offset().left)/event.currentTarget.clientWidth-0.5) * 3.0) -50;
			var yPos = -(((event.pageY  - $( this ).offset().top)/event.currentTarget.clientHeight-0.5)*3.0) - 50;
			var xPos2 = -(((event.pageX  - $( this ).offset().left)/event.currentTarget.clientWidth-0.5) * 5.6) -50;
			var yPos2 = -(((event.pageY  - $( this ).offset().top)/event.currentTarget.clientHeight-0.5)*5.6) - 50;
			TweenLite.to($(".slideImg"), 0.4, { x:xPos + "%", y:yPos + "%", ease:Power1.easeOut});
			TweenLite.to($(".slideImg2"), 0.5, { x:xPos2 + "%", y:yPos2 + "%", ease:Power1.easeOut});
			
			TweenLite.to($("#up_outline"), 0.5, { opacity: "0.75"});
			if ($("#menu_checkbox:checked").length == 0) 
				TweenLite.to($("#burger"), 0.5, { backgroundColor: "rgba(255,255,255,0.75)"});
			  clearTimeout($.data(this, 'mouseTimer'));
			$.data(this, 'mouseTimer', setTimeout(function() {
				TweenLite.to($(" #up_outline"), 0.5, { opacity: "0"});	
				TweenLite.to($("#burger"), 0.5, { backgroundColor: "rgba(255,255,255,0)"});
			}, 500));
		}		
	}); 
	
	function init(){
		 FastClick.attach(document.body);
	  TweenLite.set($homeSlide.not($activeSlide), {y:"-100%"});
	   TweenLite.set($(".imageContainer").not($(".active")), {y:"-100%"});
	
	  TweenLite.set($("#up"), {visibility: "visible"});
	  $homeSlide.toggleClass( "homeSlide homeSlide_anim" );
	  $bcg.toggleClass( "bcg bcg_anim" );
	  $("#menu").mCustomScrollbar();
	  $("#menu_checkbox")[0].checked = false; 
	  $(".homeSlide_anim").each(function( i ) {
		  $(this).find(".caseInfoContainer").clone().find("span").remove().end().toggleClass("full small").appendTo( $(this));
	  });
	  fixAdaptive();
	  clearTs() ;
	}

	$(window).load(function(){
            init();
        });

	function goToNextSlide(slideOut, slideIn){
		animator.inProgress = true;
		 var a = $(slideIn.filter(".homeSlide_anim")).find("a");
		 $(a).css("margin-bottom","300px");
		TweenLite.to(a,animator.transitionTime*2, {marginBottom:"15", ease:Power4.easeInOut});	
		 var ic = slideIn.filter(".imageContainer");
		 var hsa = slideIn.filter(".homeSlide_anim");
		 
		$(".homeSlide_anim").css("opacity","0");
		$(".imageContainer").css("opacity","0");
				
		var tl = new TimelineMax({ onComplete: function (){animator.inProgress = false;}});
			tl
				.set(slideIn, {y:"100%", className: '+=active', opacity:"1"})
				.set(slideOut, {className: '-=active', opacity:"1"})
				.to(ic, animator.transitionTime, {y: '-=100%', z: 0.1,  rotationZ: 0.01,force3D:true, ease:Power1.easeInOut},0)
				.to(hsa, animator.transitionTime*1.35, {y: '-=100%',z: 0.1,  rotationZ: 0.01,force3D:true, ease:Power1.easeInOut},0)
				.to(slideOut, animator.transitionTime, {y: '-=100%',z: 0.05,  rotationZ: 0.01,force3D:true, ease:Power1.easeInOut},0);
	};

	function goToPreviousSlide(slideOut, slideIn){
	  animator.inProgress = true;
		var a = $(slideIn.filter(".homeSlide_anim")).find("a");
		 $(a).css("margin-bottom","-300px");
		 TweenLite.to(a,animator.transitionTime*2, {marginBottom:"15", ease:Power4.easeInOut});	
		  var ic = slideIn.filter(".imageContainer");
		 var hsa = slideIn.filter(".homeSlide_anim");
		  $(".homeSlide_anim").css("opacity","0");
		$(".imageContainer").css("opacity","0");
		 var tl = new TimelineMax({ onComplete: function (){animator.inProgress = false;}});
			tl
				.set(slideIn, {y:"-100%", className: '+=active', opacity:"1"})
				.set(slideOut, {className: '-=active', opacity:"1"})
				.to(ic, animator.transitionTime, {y: '+=100%', z: 0.1,  rotationZ: 0.01,force3D:true, ease:Power1.easeInOut},0)
				.to(hsa, animator.transitionTime*1.35, {y: '+=100%',z: 0.1,  rotationZ: 0.01,force3D:true, ease:Power1.easeInOut},0)
				.to(slideOut, animator.transitionTime, {y: '+=100%',z: 0.05,  rotationZ: 0.01,force3D:true, ease:Power1.easeInOut},0);
	};
	

	 	
	function getSlide(direction, random)
	{
	TweenLite.set($("#clickArea"), {visibility:"visible", delay: animator.transitionTime});
	TweenLite.to($(".whiteBar"), animator.transitionTime, {visibility:"visible", opacity: 1, delay: animator.transitionTime});
	//$logoTimeline.stop();
	
	$randomTimeLine.play();
	if (!animator.inProgress)
	  {
		TweenLite.set($(".homeSlide_anim"),  { transform:"none"});
		TweenLite.set($(".imageContainer"),  { transform:"none"});
		var slideOut = $('.homeSlide_anim.active');
		var soim = $(".imageContainer[data-case="+slideOut[0].attributes["data-case"].value+"]");
		var slideIn = $('.homeSlide_anim');
		var si;
		var img;
		
		if (random)
			{
				si = slideOut.siblings(".homeSlide_anim");
				si = si[getRandomInt(0, si.length-1)];
				img = $(".imageContainer[data-case="+si.attributes["data-case"].value+"]");
				si = $(si).add(img);
				goToNextSlide(slideOut.add(soim), si);	
		}
		else	
		{
			if (direction == "down" )
			{
				if (slideIn.index(slideOut)  <  slideIn.length-1)
				{
					si = slideOut.nextAll(".homeSlide_anim");
					si = si[0];
				}
				else	
					si = slideIn[0];	
				img = $(".imageContainer[data-case="+si.attributes["data-case"].value+"]");
				si = $(si).add(img);
				var so = slideOut.add(soim);
					goToNextSlide(so, si);
			};
			
			if (direction == "up")
			{
				if (slideIn.index(slideOut)  >  0)
				{
					si = slideOut.prevAll(".homeSlide_anim");
					si = si[0];
				}
				else
					si =  slideIn[slideIn.length-1];
				img = $(".imageContainer[data-case="+si.attributes["data-case"].value+"]");
				si = $(si).add(img);
				var so = slideOut.add(soim);
				goToPreviousSlide(so, si);
			};
		  }
	  };
	  clearTs();
	};
	
	$( "html" ).mousewheel(function(event){
		$randomTimeLine.restart();
		if (event.deltaY < 0)
			getSlide("up", false)
		else
			getSlide("down", false);
	});
	
	
	
	function getTl(direction) {
		var slideOut = $('.homeSlide_anim.active');
		var soim = $(".imageContainer[data-case="+slideOut[0].attributes["data-case"].value+"]");
		var slideIn = $('.homeSlide_anim');
		var si;
		var img;
		var a = $(slideIn.filter(".homeSlide_anim")).find("a");
		var so =slideOut.add(soim);
		
		if (direction == "down" || direction == "right" )
			{
				if (slideIn.index(slideOut)  >  0)
				{
					si = slideOut.prevAll(".homeSlide_anim");
					si = si[0];
				}
				else
					si =  slideIn[slideIn.length-1];
				img = $(".imageContainer[data-case="+si.attributes["data-case"].value+"]");
				si = $(si).add(img);
				var ic = si.filter(".imageContainer");
				var ic_2 = $(ic).find(".slideImg2");
				var so_ic_2 = $(so).find(".slideImg2");
				var hsa = si.filter(".homeSlide_anim");
				
				if (direction == "down")
				{
				$Tdown
					
					.set($(si), {opacity: "1"})
					.set($(so), {opacity: "1"})
					.set(si, {y:"-100%"})
					.set(a, {marginBottom:"300px"})
					.set(ic_2, {y: "-=20%"})
					.set(so, {className: '-=active'})
					.to(ic, animator.transitionTime, {y: '+=100%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(ic_2, animator.transitionTime, {y: '+=20%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(so_ic_2, animator.transitionTime, {y: '+=20%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(hsa, animator.transitionTime*1.35, {y: '+=100%',z: 0.1,  rotationZ: 0.01,force3D:true, ease:Sine.easeIn},0)
					.to(a,animator.transitionTime*2, {marginBottom:"15px", ease:Power4.easeInOut,z: 0.1,  rotationZ: 0.01,force3D:true},0)
					.to(so, animator.transitionTime, {y: '+=100%',z: 0.05,  rotationZ: 0.01,force3D:true, ease:Sine.easeIn},0)
					.set(si,  { className: '+=active'});
				}
				else
				{
				$Tright
					
					.set($(si), {opacity: "1"})
					.set($(so), {opacity: "1"})
					.set(si, {x:"-100%"})
					.set(ic_2, {x: "-=20%"})
					.set(si,  {delay:animator.transitionTime, className: '+=active'})
					.set(so, {className: '-=active'})
					.to(ic, animator.transitionTime, {x: '+=100%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(ic_2, animator.transitionTime, {x: '+=20%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(so_ic_2, animator.transitionTime, {x: '+=20%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(hsa, animator.transitionTime*1.35, {x: '+=100%',z: 0.1,  rotationZ: 0.01,force3D:true, ease:Sine.easeIn},0)
					.to(so, animator.transitionTime, {x: '+=100%',z: 0.05,  rotationZ: 0.01,force3D:true, ease:Sine.easeIn},0);
				}
				
			};
			
			if (direction == "up" || direction == "left")
			{
				if (slideIn.index(slideOut)  <  slideIn.length-1)
				{
					si = slideOut.nextAll(".homeSlide_anim");
					si = si[0];
				}
				else	
					si = slideIn[0];	
				img = $(".imageContainer[data-case="+si.attributes["data-case"].value+"]");
				si = $(si).add(img);
				var ic = si.filter(".imageContainer");
				var hsa = si.filter(".homeSlide_anim");
				var ic_2 = $(ic).find(".slideImg2");
				var so_ic_2 = $(so).find(".slideImg2");
				
				
			
				if (direction == "up")
				{
				$Tup
				
					.set($(si), {opacity: "1"})
					.set($(so), {opacity: "1"})
					.set(si, {y:"100%"})
					.set(ic_2, {y: "+=20%"})
					.set(a, {marginBottom:"300px"})
					.set(so, {className: '-=active'})
					.to(ic, animator.transitionTime, {y: '-=100%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(hsa, animator.transitionTime*1.35, {y: '-=100%',z: 0.1,  rotationZ: 0.01,force3D:true, ease:Sine.easeIn},0)
					.to(ic_2, animator.transitionTime, {y: '-=20%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(so_ic_2, animator.transitionTime, {y: '-=20%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(a,animator.transitionTime*2, {marginBottom:"15px", ease:Power4.easeInOut,z: 0.1,  rotationZ: 0.01,force3D:true},0)
					.to(so, animator.transitionTime, {y: '-=100%',z: 0.05,  rotationZ: 0.01,force3D:true, ease:Sine.easeIn},0)
					.set(si,  { className: '+=active'});
				}
				else
				{
				$Tleft
					
					.set($(si), {opacity: "1"})
					.set($(so), {opacity: "1"})
					.set(si, {x:"100%"})
					.set(ic_2, {x: "+=20%"})
					.set(slideOut.add(soim), {className: '-=active'})
					.set(si,  {delay:animator.transitionTime, className: '+=active'})
					.to(ic, animator.transitionTime, {x: '-=100%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(ic_2, animator.transitionTime, {x: '-=20%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(so_ic_2, animator.transitionTime, {x: '-=20%', z: 0.1,  rotationZ: 0.01,force3D:true,  ease:Sine.easeIn},0)
					.to(hsa, animator.transitionTime*1.35, {x: '-=100%',z: 0.1,  rotationZ: 0.01,force3D:true, ease:Sine.easeIn},0)
					.to(so, animator.transitionTime, {x: '-=100%',z: 0.05,  rotationZ: 0.01,force3D:true, ease:Sine.easeIn},0);
				}
			};
	};
	
	$( "html" ).on('touchstart', function(e){
		if (!animator.inProgress)
		{
		_Y = e.originalEvent.touches[0].pageY;
		_X = e.originalEvent.touches[0].pageX;
		$randomTimeLine.restart();
		dir = null;
		e.preventDefault();
		animator.swiping = true;
		}
	});
	
	$( "html" ).on('touchmove', function(e){
		$randomTimeLine.restart();
		e.preventDefault();
			var dy = (e.originalEvent.touches[0].pageY - _Y)/$("html").height();
			var dx = (e.originalEvent.touches[0].pageX - _X)/$("html").width();
			if (dir==null)
			{
				if (Math.abs(dx) > Math.abs(dy) & Math.abs(dx)>sens) dir = 'horiz';
				if (Math.abs(dx) <= Math.abs(dy) & Math.abs(dy)>sens) dir = 'vert';
				TweenLite.set($(".homeSlide_anim"), {opacity:"0"});
			TweenLite.set($(".imageContainer"), {opacity:"0"});
			TweenLite.set($(".homeSlide_anim.active"), {opacity:"1"});
			TweenLite.set($(".imageContainer.active"), {opacity:"1"});
			TweenLite.set($(".imageContainer"),  { transform:"none"});
					TweenLite.set($(".homeSlide_anim"),  { transform:"none"});
			}
			if (dir =='horiz')
			{
				if ( dx > 0)
				{
					$Tleft.progress(0);
					$Tright.progress(dx);
					
				}
				else
				{
					$Tright.progress(0);
					$Tleft.progress(-dx);
				}
			}
			else
				if (dir =='vert')
				{
					if ( dy > 0) 
					{
						$Tup.progress(0);
						$Tdown.progress(dy);
					}
					else 
					{
						$Tdown.progress(0);
						$Tup.progress(-dy);
						
					}
					
				}
	});
	
	$( "html" ).on('touchend', function(e){
		animator.swiping = false;
		$randomTimeLine.play();
			if (dir=='horiz')
			{
				if ($Tleft.progress()>$Tright.progress() )
				{
					if ($Tleft.progress()>prgSens)
					$Tleft.play();
					else
					{
						$Tleft.reverse();
					}
				}
				else
				if ($Tleft.progress()<$Tright.progress() )
				{
					if ($Tright.progress()>prgSens)
					$Tright.play();
					else
					{
						$Tright.reverse();
					}
				}
			}
			if (dir=='vert')
			{
				if ($Tup.progress()>$Tdown.progress() )
				{
					if ($Tup.progress()>prgSens)
					$Tup.play();
					else
					{
						$Tup.reverse();
					}
				}
				else
				if ($Tup.progress()<$Tdown.progress() )
				{
					if ($Tdown.progress()>prgSens)
					$Tdown.play();
					else
					{
						$Tdown.reverse();
					}
				}
			}
			dir = null;
	});
	
	
	function clearTs() 
	{
		$Tdown.stop();
		$Tright.stop();
		$Tup.stop();
		$Tleft.stop();
		$Tup.clear();
		$Tdown.clear();
		$Tleft.clear();
		$Tright.clear();
		getTl('up');
		getTl('down');
		getTl('left');
		getTl('right');
	}
	
	$( "#up" ).click(function(e){
		$randomTimeLine.restart();
		getSlide("down", false)	
	});
	
	$( "#menuCloseArea" ).click(function(e){
		$("#menu_checkbox:checked").prop('checked', false).trigger("change");;
	});
	
	$( "#clickArea" ).click(function(e){
		if (!animator.inProgress)
		{
			$randomTimeLine.restart();
			TweenLite.set($("#clickArea, .whiteBar"), {visibility:"hidden", delay: animator.transitionTime});
			TweenLite.to($(".whiteBar"), animator.transitionTime, { opacity: 0});
			var slideOut = $('.homeSlide_anim.active');
			var soim = $(".imageContainer[data-case="+slideOut[0].attributes["data-case"].value+"]");
			var slideIn = $('.homeSlide_anim._logo');
			goToNextSlide(slideOut.add(soim), slideIn);
		}
	});
	
	$( "#menu_checkbox" ).change(function(e){
		{
		animator.menuAnim = true;		
		if ($("#menu_checkbox:checked").length == 1) 
		{
			var faceTl = new TimelineMax({});
			$("#toCross")[0].beginElement();
			
			faceTl.to(' #burger_up',.08, {
			  y: "300%" 
			});
			  faceTl.to(' #burger_down',.08, {
			  y: "-300%"
			});
		}
		else
		{
			var faceTl = new TimelineMax({});
			$("#toBar")[0].beginElement();
			
			faceTl.to(' #burger_up',.08, {
			  transform:"none"
			});
			  faceTl.to(' #burger_down',.08, {
			    transform:"none"
			});
		}	
		}
	});
	
	function fixAdaptive(){
	  var width = $( window ).width();
		var height = $( window ).height();
		var footHeight = $("#flex-container").height();
		 $(".caseInfoWrap").children("span").each(function( i ) {
		
			if ( ($(this).height()+ $(this).offset().top) + footHeight >  height) 
			{
				$(this).closest(".full").css("visibility", "hidden");
				$(this).closest(".full").siblings(".small").css("visibility", "visible");
			}
			else
			{
				$(this).closest(".full").css("visibility", "visible");
					$(this).closest(".full").siblings(".small").css("visibility", "hidden");
			}
		 });
	};
	
	$( window ).resize(function() {
		fixAdaptive();
		
});

})(jQuery);