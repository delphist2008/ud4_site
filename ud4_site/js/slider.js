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
	$randomTimeLine = new TimelineMax({ repeat:-1, onRepeat: function () { getRandomSlide("up");}});
	$randomTimeLine.to($("#nothing"), 8, {width:"100px"});

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
	  $homeSlide.toggleClass( "homeSlide homeSlide_anim" );
	  $bcg.toggleClass( "bcg bcg_anim" );
	//  var _width = $bcg.width()/**0.9 */+ "px";
	  //TweenLite.set($fullInfo, {width: _width});
	 // TweenLite.set($(".slideImg"), {x:"-50%", y:"-50%"});
	  $(".fullInfoContainer").mCustomScrollbar({scrollInertia:50,  theme:"3d-thick"});
	}

	$(window).load(function(){
            init();
        });

	
	

	function goToNextSlide(slideOut, slideIn){
		animator.inProgress = true;
		$randomTimeLine.restart();
	//	var tl1 = new TimelineMax({repeat:1, yoyo:true});
		//	tl1.append(new TweenLite.to($(".homeSlide"), animator.transitionTime/2.0, {x: '+=30px', ease:Power1.easeInOut}, 0));
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
	//  var tl1 = new TimelineMax({repeat:1, yoyo:true});
	//	tl1.append(new TweenLite.to($(".homeSlide"), animator.transitionTime/2.0, {x: '-=30px', ease:Power1.easeInOut}, 0));
	  var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
	    tl
			.set(slideIn, {y:"-100%",className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.set(slideOut, { y: '-=200%', delay:animator.transitionTime})
			.to(slideIn, animator.transitionTime, {y: '+=100%', autoAlpha: 1,ease:Power2.easeInOut}, 0)
			.to(slideOut, animator.transitionTime, {y: '+=100%', autoAlpha: 0, ease:Power2.easeInOut}, 0);
	};
	 
	$slideNavNext.click(function (e) {
		getDirectSlide("down");
	});
	
	$slideNavPrev.click(function (e) {
	 getDirectSlide("up");
	});
	
	function getRandomSlide(direction)
	{
	if (!animator.inProgress)
	  {
	var slideOut = $('.homeSlide_anim.active'),
		slideIn = $('.homeSlide_anim:not(.active)');
		slideIn =  slideIn [getRandomInt(0, slideIn.length-1)];
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
			goToNextSlide(slideOut, slideIn[0]);
		};
		
		if (direction == "up")
		{
		if (slideIn.index(slideOut)  >  0)
			 goToPreviousSlide(slideOut, slideOut.prev(".homeSlide_anim")[0])
		else
			goToPreviousSlide(slideOut, slideIn[slideIn.length-1]);
		};
	  };
	};
	
	$showInfo.click(function (e) {
	  e.preventDefault();
	  var $case = $( this )[0].parentElement.attributes["case"].value;
	  var $infoSlide = $(".caseFullInfo[case="+$case+"]");
	  var $slide = $( this )[0].parentElement;
	 showFullInfo($slide, $infoSlide);
	});
	
	$closeInfo.click(function (e) {
	  e.preventDefault();
	  var $case = $( this )[0].parentElement.attributes["case"].value;
	  var $caseSlide  =  $(".homeSlide_anim[case="+$case+"]"); 
	  var $infoSlide = $(".caseFullInfo[case="+$case+"]");
	 showCaseInfo( $infoSlide, $caseSlide);
	});
	
	$( "html" ).mousewheel(function(event){
		if (animator.state == "case")
		{
		if (event.deltaY < 0)
			getDirectSlide("up")
		else
			getDirectSlide("down");
		}
	});

})(jQuery);