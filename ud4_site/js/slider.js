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
	$slideNav = $(".slideNav"),
    $slideNavPrev = $("#slideNavPrev"),
    $slideNavNext = $("#slideNavNext")
    $hero = $(".hero"),
	$randomTimeLine = new TimelineMax({ delay:3,repeat:-1, onRepeat: function () { getRandomSlide("down");}});
	$randomTimeLine.to($("#nothing"), 8, {width:"100px"});
	$logoTimeline = new TimelineMax({ repeat:0, onComplete: function () { getRandomSlide("down");}});
	$logoTimeline.set($( "#up" ),  { autoAlpha: 0, delay:5});
	animator = {inProgress : false, transitionTime: .7, state:"case"};
	
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
		TweenLite.to(event.currentTarget.firstElementChild, 0.6, { x:xPos + "%", y:yPos + "%", ease:Power1.easeOut});
	});
	
	function init(){
	  TweenLite.set($homeSlide.not($activeSlide), {autoAlpha: 0});
	  TweenLite.set($fullInfo, {autoAlpha: 0});
	  TweenLite.set($("#up"), {visibility: "visible"});
	  $homeSlide.toggleClass( "homeSlide homeSlide_anim" );
	  $bcg.toggleClass( "bcg bcg_anim" );
	  $(".fullInfoContainer").mCustomScrollbar({scrollInertia:50,  theme:"3d-thick"});
	  
	}

	$(window).load(function(){
            init();
        });

	function goToNextSlide(slideOut, slideIn){
		animator.inProgress = true;
		$randomTimeLine.restart();
		var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
			tl
				.set(slideIn, {y:"100%", className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.to(slideIn, animator.transitionTime, {y: '-=100%',autoAlpha: 1, ease:Power2.easeInOut}, 0)
				.to(slideOut, animator.transitionTime, {y: '-=100%',autoAlpha: 0, ease:Power2.easeInOut}, 0);
	};

	function goToPreviousSlide(slideOut, slideIn){
	  animator.inProgress = true;
	  $randomTimeLine.restart();
	  var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
	    tl
			.set(slideIn, {y:"-100%",className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.set(slideOut, { y: '-=200%', delay:animator.transitionTime})
			.to(slideIn, animator.transitionTime, {y: '+=100%', autoAlpha: 1,ease:Power2.easeInOut}, 0)
			.to(slideOut, animator.transitionTime, {y: '+=100%', autoAlpha: 0, ease:Power2.easeInOut}, 0);
	};
	 
	function getRandomSlide(direction)
	{
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
	if (!animator.inProgress)
	  {
	var slideOut = $('.homeSlide_anim.active'),
		slideIn = $('.homeSlide_anim');
		
		if (direction == "down")
		{
		if (slideIn.index(slideOut)  <  slideIn.length-1)
			 goToNextSlide(slideOut, slideOut.next(".homeSlide_anim")[0])
		else
			goToNextSlide(slideOut, slideIn[1]);
		};
		
		if (direction == "up")
		{
		if (slideIn.index(slideOut)  >  1)
			 goToPreviousSlide(slideOut, slideOut.prev(".homeSlide_anim")[0])
		else
			goToPreviousSlide(slideOut, slideIn[slideIn.length-1]);
		};
	  };
	};
	
	$( "html" ).mousewheel(function(event){
		TweenLite.to($( "#up" ), 0, { autoAlpha: 0,ease:Power2.easeInOut}, 0);
		if (animator.state == "case")
		{
		if (event.deltaY < 0)
			getDirectSlide("up")
		else
			getDirectSlide("down");
		}
	});
	
	$( "html" ).on('swipeleft', function(e){
		getDirectSlide("up")
	});
	
	$( "html" ).on('swiperight', function(e){
		getDirectSlide("down")
	});
	
	$( "html" ).on('swipeup', function(e){
		getDirectSlide("up")
	});
	
	$( "html" ).on('swipedown', function(e){
		getDirectSlide("down")
	});
	
	
	$( "#up" ).click(function(e){
		e.preventDefault();
		getDirectSlide("down")
		TweenLite.to($( "#up" ), 0, { autoAlpha: 0,ease:Power2.easeInOut}, 0);
		
	});

})(jQuery);