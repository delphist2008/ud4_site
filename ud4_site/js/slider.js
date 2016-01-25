(function($) {

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var $activeSlide = $(".active"),
    $homeSlide = $(".homeSlide"),
	$bcg = $(".bcg"),
    $hero = $(".hero"),
	$randomTimeLine = new TimelineMax({ repeat:-1, paused:true, onRepeat: function () { /*getSlide("down", true);*/}});
	$randomTimeLine.to($("nothing"), 8, {width:"100px"});
	//$logoTimeline = new TimelineMax({paused: false, repeat:0, onComplete: function () { getSlide("down", true);}}); 
	//$logoTimeline.to($("#nothing"), 4, {width:"100px"});
	TweenLite.set($(".text-copy "), {strokeDasharray:"7% 28%"});
	$le1 = new TimelineMax({paused: false});
	$le1.to($(".text-copy "), 3, {strokeDasharray:"1% 87.5%",  strokeDashoffset: "35%", ease:Linear.easeOut });
	$le1.reverse();
	$le1.progress(1);
	animator = {inProgress : false, transitionTime: 0.8};//.35
	var T;
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
	  //TweenLite.set($homeSlide.not($activeSlide), {opacity: 0});
	 // TweenLite.set($homeSlide, {z: 0.1});
	  //TweenLite.set($(".imageContainer").not($(".active")), {opacity: 0});
	  TweenLite.set($("#up"), {visibility: "visible"});
	  $homeSlide.toggleClass( "homeSlide homeSlide_anim" );
	  $bcg.toggleClass( "bcg bcg_anim" );
	  $("#menu").mCustomScrollbar();
	  $("#menu_checkbox")[0].checked = false; 
	  $(".homeSlide_anim").each(function( i ) {
		  $(this).find(".info").clone().toggleClass("info infoCopy").appendTo( $(this).find(".caseInfoContainer"));
	  });
	  fixAdaptive();
	}

	$(window).load(function(){
            init();
        });

	function goToNextSlide(slideOut, slideIn){
		animator.inProgress = true;
		// var a = $(slideIn.filter(".homeSlide_anim")).find("a");
		// $(a).css("margin-bottom","300px");
		//  TweenLite.to(a,animator.transitionTime*2, {marginBottom:"15", ease:Power4.easeInOut});	
		 var ic = slideIn.filter(".imageContainer");
		 var hsa = slideIn.filter(".homeSlide_anim");
		var tl = new TimelineMax({ onComplete: function (){animator.inProgress = false;}});
			tl
				.set(slideIn, {y:"100%", className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.to(ic, animator.transitionTime, {y: '-=100%', z: 0.1,  rotationZ: 0.01,force3D:true, ease:Power1.easeInOut},0)
				.to(hsa, animator.transitionTime*1.35, {y: '-=100%',z: 0.1,  rotationZ: 0.01,force3D:true, ease:Power1.easeInOut},0)
				.to(slideOut, animator.transitionTime, {y: '-=100%',z: 0.05,  rotationZ: 0.01,force3D:true, ease:Power1.easeInOut},0);
	};

	function goToRightSlide(slideOut, slideIn){
		animator.inProgress = true;
		
		var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
			tl
				.set(slideIn, {x:"100%", className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.to(slideIn.filter(".imageContainer"), animator.transitionTime, {x: '-=100%',opacity: 1, ease:Power2.easeInOut}, 0)
				.to(slideIn.filter(".homeSlide_anim"), animator.transitionTime*1.35, {x: '-=100%',opacity: 1, ease:Power2.easeInOut}, 0)
				.to(slideOut, animator.transitionTime, {x: '-=100%',opacity: 0, ease:Power2.easeInOut}, 0);
	};
	
	function goToPreviousSlide(slideOut, slideIn){
	  animator.inProgress = true;
		var a = $(slideIn.filter(".homeSlide_anim")).find("a");
		 $(a).css("margin-bottom","-300px");
		 TweenLite.to(a,animator.transitionTime*2, {marginBottom:"15", ease:Power4.easeInOut});	
	  var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
	    tl
			.set(slideIn, {y:"-100%",className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.to(slideIn.filter(".imageContainer"), animator.transitionTime, {y: '+=100%', opacity: 1,ease:Power1.easeInOut}, 0)
			.to(slideIn.filter(".homeSlide_anim"), animator.transitionTime*1.35, {y: '+=100%', opacity: 1,ease:Power2.easeInOut}, 0)
			.to(slideOut, animator.transitionTime, {y: '+=100%', opacity: 0, ease:Power2.easeInOut}, 0);
	};
	
	function goToLeftSlide(slideOut, slideIn){
	  animator.inProgress = true;
		
	  var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
	    tl
			.set(slideIn, {x:"-100%",className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.to(slideIn.filter(".imageContainer"), animator.transitionTime, {x: '+=100%', opacity: 1,ease:Power2.easeInOut}, 0)
			.to(slideIn.filter(".homeSlide_anim"), animator.transitionTime*1.35, {x: '+=100%', opacity: 1,ease:Power2.easeInOut}, 0)
			.to(slideOut, animator.transitionTime, {x: '+=100%', opacity: 0, ease:Power2.easeInOut}, 0);
	};
	 	
	function getSlide(direction, random)
	{
	TweenLite.set($("#clickArea"), {visibility:"visible", delay: animator.transitionTime});
	TweenLite.to($(".whiteBar"), animator.transitionTime, {visibility:"visible", opacity: 1, delay: animator.transitionTime});
	//$logoTimeline.stop();
	
	//$randomTimeLine.play();
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
				si = si[getRandomInt(1, si.length-1)];
				img = $(".imageContainer[data-case="+si.attributes["data-case"].value+"]");
				si = $(si).add(img);
				if (direction == "down")
				goToNextSlide(slideOut.add(soim), si);
				if (direction == "right")
				goToRightSlide(slideOut.add(soim), si);
				if (direction == "up")
				goToPreviousSlide(slideOut.add(soim), si);
				if (direction == "left")
				goToLeftSlide(slideOut.add(soim), si);
		}
		else	
		{
			if (direction == "down" || direction == "right" )
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
				if (direction == "down")
					goToNextSlide(slideOut.add(soim), si);
				else
					goToRightSlide(slideOut.add(soim), si);
			};
			
			if (direction == "up" || direction == "left")
			{
				if (slideIn.index(slideOut)  >  1)
				{
					si = slideOut.prevAll(".homeSlide_anim");
					si = si[0];
				}
				else
					si =  slideIn[slideIn.length-1];
				img = $(".imageContainer[data-case="+si.attributes["data-case"].value+"]");
				si = $(si).add(img);
				if (direction == "up")
					goToPreviousSlide(slideOut.add(soim), si);
				else
					goToLeftSlide(slideOut.add(soim), si);
			};
		  }
	  };
	  
	};
	
	/*$( "html" ).mousewheel(function(event){
		$randomTimeLine.restart();
		if (event.deltaY < 0)
			getSlide("up", false)
		else
			getSlide("down", false);
	});*/
	
	$( "html" ).on('move', function(e){
		var r = (Math.abs(e.distY)/$("html").height());
		TweenLite.set($("#movebar"), {height:r*100+"%"});
		T.progress(r);
		
		//window.alert("blah");
	});
	
	$( "html" ).on('moveend', function(e){
		var r = (Math.abs(e.distY)/$("html").height());
		//TweenLite.set($("#movebar"), {height:r+"%"});
		//T.seek(r);
		//if (r>0.5) 
		 	T.play();
		//window.alert("blah");
	});
	
	$( "html" ).on('movestart', function(e){
		if (!animator.inProgress)
		{

		var slideOut = $('.homeSlide_anim.active');
		var soim = $(".imageContainer[data-case="+slideOut[0].attributes["data-case"].value+"]");
		var slideIn = $('.homeSlide_anim');
		var si;
		var img;
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
		T = new TimelineMax({ paused:true, onComplete: function (){animator.inProgress = false;}});
			T
				.set($(".imageContainer"),  { transform:"none"})
				.set($(".homeSlide_anim"),  { transform:"none"})
				.set(si, {y:"100%", className: '+=active'})
				.set(slideOut.add(soim), {className: '-=active'})
				.to(ic, animator.transitionTime, {y: '-=100%', z: 0.1,  rotationZ: 0.01,force3D:true, ease:Linear.easeNone},0)
				.to(hsa, animator.transitionTime*1.35, {y: '-=100%',z: 0.1,  rotationZ: 0.01,force3D:true, ease:Linear.easeNone},0)
				.to(slideOut.add(soim), animator.transitionTime, {y: '-=100%',z: 0.05,  rotationZ: 0.01,force3D:true, ease:Linear.easeNone},0);
		}
	});
		
	/*$( "html" ).on('swiperight', function(e){
		if (!animator.scrolling)
		{
			$randomTimeLine.restart();
		getSlide("left", false)
		
		}
	});
	
	$( "html" ).on('swipeleft', function(e){
		if (!animator.scrolling)
		{
			$randomTimeLine.restart();
		getSlide("right", false)
		}
	});
	
	$( "html" ).on('swipeup', function(e){
		if (!animator.scrolling)
		{
			$randomTimeLine.restart();
		getSlide("down", false)
		}
	});
	
	$( "html" ).on('swipedown', function(e){
		if (!animator.scrolling)
		{
			$randomTimeLine.restart();
		getSlide("up", false)
		}
	});*/
	
	/*$( "#up" ).click(function(e){
		$randomTimeLine.restart();
		getSlide("down", false)	
	});
	$( "#menuCloseArea" ).click(function(e){
		$("#menu_checkbox:checked").prop('checked', false).trigger("change");;
	});
	
	$( "#clickArea" ).click(function(e){
		if (!animator.inProgress)
		{*/
			/*$randomTimeLine.restart();
			TweenLite.set($("#clickArea, .whiteBar"), {visibility:"hidden", delay: animator.transitionTime});
			TweenLite.to($(".whiteBar"), animator.transitionTime, { opacity: 0});
			var slideOut = $('.homeSlide_anim.active');
			var soim = $(".imageContainer[data-case="+slideOut[0].attributes["data-case"].value+"]");
			var slideIn = $('.homeSlide_anim._logo');
			goToNextSlide(slideOut.add(soim), slideIn);*/
		/*}
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
	});*/
	
	function fixAdaptive(){
	  var width = $( window ).width();
		var height = $( window ).height();
		var footHeight = $("#flex-container").height();
		 $(".caseInfoContainer").children("span").each(function( i ) {
		
			if ( ($(this).height()+ $(this).offset().top) + footHeight >  height) 
			{
				$(this).css("visibility", "hidden");
				$(this).siblings(".infoCopy").css("display", "block");
				$(this).siblings(".infoCopy").css("visibility", "visible");
				$(this).siblings(".info").css("visibility", "hidden");
			}
			else
			{
				$(this).css("visibility", "visible");
				$(this).siblings(".infoCopy").css("display", "none");
				$(this).siblings(".info").css("visibility", "visible");
			}
		 });
	};
	
	$( window ).resize(function() {
		fixAdaptive();
		
});

})(jQuery);