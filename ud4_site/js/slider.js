(function($) {

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var $activeSlide = $(".active"),
    $homeSlide = $(".homeSlide"),
	$bcg = $(".bcg"),
    $hero = $(".hero"),
	$randomTimeLine = new TimelineMax({ repeat:-1, paused:true, onRepeat: function () { getRandomSlide("down");}});
	$randomTimeLine.to($("#nothing"), 8, {width:"100px"});
	$logoTimeline = new TimelineMax({paused: true, repeat:0, onComplete: function () { getRandomSlide("down");}}); 
	$logoTimeline.to($("#nothing"), 4, {width:"100px"});
	animator = {inProgress : false, transitionTime: .35};//.35
	
	if (!('pointer-events' in document.body.style )) 
	{
		//fix for browsers without pointer-events support
		$(document).on('mousemove', '.caseInfo', function (e) {
			ev = $.Event('mousemove');
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
		$(this).hide();
		$(document.elementFromPoint(e.pageX, e.pageY)).trigger(ev);
		$(this).show();
		}); 
	};

	
	
	$("html").mousemove(function(event){
		if (!animator.inProgress)
		{
			var xPos = -(((event.pageX  - $( this ).offset().left)/event.currentTarget.clientWidth-0.5) * 3.0) -50;
			var yPos = -(((event.pageY  - $( this ).offset().top)/event.currentTarget.clientHeight-0.5)*3.0) - 50;
			var xPos2 = -(((event.pageX  - $( this ).offset().left)/event.currentTarget.clientWidth-0.5) * 5.6) -50;
			var yPos2 = -(((event.pageY  - $( this ).offset().top)/event.currentTarget.clientHeight-0.5)*5.6) - 50;
			TweenLite.to($(".slideImg"), 0.4, { x:xPos + "%", y:yPos + "%", ease:Power1.easeOut});
			TweenLite.to($(".slideImg2"), 0.5, { x:xPos2 + "%", y:yPos2 + "%", ease:Power1.easeOut});
			
			TweenLite.to($("#up_outline"), 0.5, { opacity: "1"});
			if ($("#menu_checkbox:checked").length == 0) 
				TweenLite.to($("#burger_outline"), 0.5, { opacity: "1"});
			  clearTimeout($.data(this, 'mouseTimer'));
			$.data(this, 'mouseTimer', setTimeout(function() {
				TweenLite.to($("#burger_outline, #up_outline"), 0.5, { opacity: "0"});	
			}, 500));
		}		
	});
	
	function init(){
	  TweenLite.set($homeSlide.not($activeSlide), {autoAlpha: 0});
	  TweenLite.set($(".imageContainer").not($(".active")), {autoAlpha: 0});
	  TweenLite.set($("#up"), {visibility: "visible"});
	  $homeSlide.toggleClass( "homeSlide homeSlide_anim" );
	  $bcg.toggleClass( "bcg bcg_anim" );
	  //$(".caseInfoContainer").mCustomScrollbar();
	  $("#menu").mCustomScrollbar();
	}

	$(window).load(function(){
            init();
        });

	function goToNextSlide(slideOut, slideIn){
		animator.inProgress = true;
		 
		var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
			tl
				.set(slideIn, {y:"100%", className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.to(slideIn.filter(".imageContainer"), animator.transitionTime, {y: '-=100%',autoAlpha: 1, ease:Power1.easeInOut}, 0)
				.to(slideIn.filter(".homeSlide_anim"), animator.transitionTime*1.35, {y: '-=100%',autoAlpha: 1, ease:Power2.easeInOut}, 0)
				.to(slideOut, animator.transitionTime, {y: '-=100%',autoAlpha: 0, ease:Power2.easeInOut}, 0);
	};

	function goToRightSlide(slideOut, slideIn){
		animator.inProgress = true;

		var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
			tl
				.set(slideIn, {x:"100%", className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.to(slideIn.filter(".imageContainer"), animator.transitionTime, {x: '-=100%',autoAlpha: 1, ease:Power2.easeInOut}, 0)
				.to(slideIn.filter(".homeSlide_anim"), animator.transitionTime*1.35, {x: '-=100%',autoAlpha: 1, ease:Power2.easeInOut}, 0)
				.to(slideOut, animator.transitionTime, {x: '-=100%',autoAlpha: 0, ease:Power2.easeInOut}, 0);
	};
	
	function goToPreviousSlide(slideOut, slideIn){
	  animator.inProgress = true;

	  var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
	    tl
			.set(slideIn, {y:"-100%",className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.to(slideIn.filter(".imageContainer"), animator.transitionTime, {y: '+=100%', autoAlpha: 1,ease:Power1.easeInOut}, 0)
			.to(slideIn.filter(".homeSlide_anim"), animator.transitionTime*1.35, {y: '+=100%', autoAlpha: 1,ease:Power2.easeInOut}, 0)
			.to(slideOut, animator.transitionTime, {y: '+=100%', autoAlpha: 0, ease:Power2.easeInOut}, 0);
	};
	
	function goToLeftSlide(slideOut, slideIn){
	  animator.inProgress = true;

	  var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
	    tl
			.set(slideIn, {x:"-100%",className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.to(slideIn.filter(".imageContainer"), animator.transitionTime, {x: '+=100%', autoAlpha: 1,ease:Power2.easeInOut}, 0)
			.to(slideIn.filter(".homeSlide_anim"), animator.transitionTime*1.35, {x: '+=100%', autoAlpha: 1,ease:Power2.easeInOut}, 0)
			.to(slideOut, animator.transitionTime, {x: '+=100%', autoAlpha: 0, ease:Power2.easeInOut}, 0);
	};
	 
	function getRandomSlide(direction)
	{
		$logoTimeline.stop();
		//$randomTimeLine.play();
		if (!animator.inProgress)
		{
			var slideOut = $('.homeSlide_anim.active'),
				slideIn = $('.homeSlide_anim:not(.active)');
				slideIn =  slideIn [getRandomInt(1, slideIn.length-1)];
			if (direction == "down")
			  goToNextSlide(slideOut, slideIn);
			if (direction == "up")
			  goToPreviousSlide(slideOut, slideIn);
		};
	};
	
	function getDirectSlide(direction)
	{
	$logoTimeline.stop();
	//$randomTimeLine.play();
	if (!animator.inProgress)
	  {
		 TweenLite.set($(".homeSlide_anim"),  { transform:"none"});
		 TweenLite.set($(".imageContainer"),  { transform:"none"});
		var slideOut = $('.homeSlide_anim.active');
		var soim = $(".imageContainer[case="+slideOut[0].attributes["case"].value+"]");
		var slideIn = $('.homeSlide_anim');
		var si;
		var img;
		
		if (direction == "down" || direction == "right" )
		{
			if (slideIn.index(slideOut)  <  slideIn.length-1)
				si = slideOut.nextAll(".homeSlide_anim")[0];
			else	
				si = slideIn[1];	
			img = $(".imageContainer[case="+si.attributes["case"].value+"]");
			si = $(si).add(img);
			if (direction == "down")
				goToNextSlide(slideOut.add(soim), si);
			else
				goToRightSlide(slideOut.add(soim), si);
		};
		
		if (direction == "up" || direction == "left")
		{
			if (slideIn.index(slideOut)  >  1)
				si = slideOut.prevAll(".homeSlide_anim")[0];
			else
				si =  slideIn[slideIn.length-1];
			img = $(".imageContainer[case="+si.attributes["case"].value+"]");
			si = $(si).add(img);
			if (direction == "up")
				goToPreviousSlide(slideOut.add(soim), si);
			else
				goToLeftSlide(slideOut.add(soim), si);
		};
	  };
	};
	
	$( "html" ).mousewheel(function(event){
		if (event.deltaY < 0)
			getDirectSlide("up")
		else
			getDirectSlide("down");
	});
		
	$( "html" ).on('swiperight', function(e){
		if (!animator.scrolling)
		getDirectSlide("left")
	});
	
	$( "html" ).on('swipeleft', function(e){
		if (!animator.scrolling)
		getDirectSlide("right")
	});
	
	$( "html" ).on('swipeup', function(e){
		if (!animator.scrolling)
		getDirectSlide("down")
	});
	
	$( "html" ).on('swipedown', function(e){
		if (!animator.scrolling)
		getDirectSlide("up")
	});
	
	$( "#up" ).click(function(e){
		getDirectSlide("down")	
	});
	
	$( "#burger" ).click(function(e){
		 TweenLite.set($("#burger_outline"),  { opacity:"0"});
	});

})(jQuery);