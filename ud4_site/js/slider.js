(function($) {

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var $activeSlide = $(".active"),
    $homeSlide = $(".homeSlide"),
	$bcg = $(".bcg"),
	$fullInfo = $(".caseFullInfo"),
	$showInfo = $(".showInfo"),
	$closeInfo = $(".closeInfo"),
    $hero = $(".hero"),
	$randomTimeLine = new TimelineMax({ repeat:-1, paused:true, onRepeat: function () { getRandomSlide("down");}});
	$randomTimeLine.to($("#nothing"), 8, {width:"100px"});
	$logoTimeline = new TimelineMax({paused: true, repeat:0, onComplete: function () { getRandomSlide("down"); $randomTimeLine,play()}});
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

	$(".imageContainer").mousemove(function(event){
		
		var xPos = -(((event.pageX  - $( this ).offset().left)/event.currentTarget.clientWidth-0.5) * 3.0) -50;
		var yPos = -(((event.pageY  - $( this ).offset().top)/event.currentTarget.clientHeight-0.5)*3.0) - 50;
		var xPos2 = -(((event.pageX  - $( this ).offset().left)/event.currentTarget.clientWidth-0.5) * 5.6) -50;
		var yPos2 = -(((event.pageY  - $( this ).offset().top)/event.currentTarget.clientHeight-0.5)*5.6) - 50;
		TweenLite.to($(".slideImg"), 0.4, { x:xPos + "%", y:yPos + "%", ease:Power1.easeOut});
		TweenLite.to($(".slideImg2"), 0.5, { x:xPos2 + "%", y:yPos2 + "%", ease:Power1.easeOut});
	});
	
	$("html").mousemove(function(event){
		TweenLite.to($("#up_outline"), 0.5, { opacity: "1"});
		if ($("#menu_checkbox:checked").length == 0) 
			TweenLite.to($("#burger_outline"), 0.5, { opacity: "1"});
		  clearTimeout($.data(this, 'mouseTimer'));
		$.data(this, 'mouseTimer', setTimeout(function() {
			TweenLite.to($("#burger_outline, #up_outline"), 0.5, { opacity: "0"});	
		}, 500));	
	});
	
	function init(){
	  TweenLite.set($homeSlide.not($activeSlide), {autoAlpha: 0});
	  TweenLite.set($fullInfo, {autoAlpha: 0});
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
				.set(slideIn, {top:"100%", autoAlpha: 1, className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.set(slideOut, {autoAlpha: 0, delay:animator.transitionTime })
				.to(slideIn, animator.transitionTime, {top: '-=100%', ease:Power2.easeInOut}, 0)
				.to(slideOut, animator.transitionTime, {top: '-=100%',ease:Power2.easeInOut}, 0);
	};

	function goToRightSlide(slideOut, slideIn){
		animator.inProgress = true;

		var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
			tl
				.set(slideIn, {left:"100%", autoAlpha: 1, className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.set(slideOut, {autoAlpha: 0, delay:animator.transitionTime })
				.to(slideIn, animator.transitionTime, {left: '-=100%', ease:Power2.easeInOut}, 0)
				.to(slideOut, animator.transitionTime, {left: '-=100%', ease:Power2.easeInOut}, 0);
	};
	
	function goToPreviousSlide(slideOut, slideIn){
	  animator.inProgress = true;

	  var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
	    tl
			.set(slideIn, {top:"-100%",autoAlpha: 1,className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.set(slideOut, {autoAlpha: 0, delay:animator.transitionTime })
			.to(slideIn, animator.transitionTime, {top: '+=100%' ,ease:Power2.easeInOut}, 0)
			.to(slideOut, animator.transitionTime, {top: '+=100%', ease:Power2.easeInOut}, 0);
	};
	
	function goToLeftSlide(slideOut, slideIn){
	  animator.inProgress = true;

	  var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
	    tl
			.set(slideIn, {left:"-100%",autoAlpha: 1,className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.set(slideOut, {autoAlpha: 0, delay:animator.transitionTime })
			.to(slideIn, animator.transitionTime, {left: '+=100%',ease:Power2.easeInOut}, 0)
			.to(slideOut, animator.transitionTime, {left: '+=100%', ease:Power2.easeInOut}, 0);
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
		 TweenLite.set($(".homeSlide_anim"),  { top:"0"});
	var slideOut = $('.homeSlide_anim.active'),
		slideIn = $('.homeSlide_anim');
		
		if (direction == "down")
		{
		if (slideIn.index(slideOut)  <  slideIn.length-1)
			 goToNextSlide(slideOut, slideOut.next(".homeSlide_anim")[0])
		else
			goToNextSlide(slideOut, slideIn[1]);
		};
		
		if (direction == "right")
		{
		if (slideIn.index(slideOut)  <  slideIn.length-1)
			 goToRightSlide(slideOut, slideOut.next(".homeSlide_anim")[0])
		else
			goToRightSlide(slideOut, slideIn[1]);
		};
		
		if (direction == "up")
		{
		if (slideIn.index(slideOut)  >  1)
			 goToPreviousSlide(slideOut, slideOut.prev(".homeSlide_anim")[0])
		else
			goToPreviousSlide(slideOut, slideIn[slideIn.length-1]);
		};
		
		if (direction == "left")
		{
		if (slideIn.index(slideOut)  >  1)
			 goToLeftSlide(slideOut, slideOut.prev(".homeSlide_anim")[0])
		else
			goToLeftSlide(slideOut, slideIn[slideIn.length-1]);
		};
	  };
	};
	
	$( "html" ).mousewheel(function(event){
		if (event.deltaY < 0)
			getDirectSlide("up")
		else
			getDirectSlide("down");
	});
		
	$( ".slideImg" ).on('swiperight', function(e){
		if (!animator.scrolling)
		getDirectSlide("left")
	});
	
	$( ".slideImg" ).on('swipeleft', function(e){
		if (!animator.scrolling)
		getDirectSlide("right")
	});
	
	$( ".slideImg" ).on('swipeup', function(e){
		if (!animator.scrolling)
		getDirectSlide("down")
	});
	
	$( ".slideImg" ).on('swipedown', function(e){
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