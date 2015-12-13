(function($) {

//TODO: random/not random navigation
//NOTE: mouse event forwarding for IE<11 instead of pointer-events:none

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
    $hero = $(".hero");

	animator = {inProgress : false, transitionTime: .8, state:"case"};
	

	//fix for browsers without pointer-events support
	/*$(document).on('mousemove', '.caseInfo', function (e) {

    $(this).hide();
    var BottomElement = document.elementFromPoint(e.clientX, e.clientY);
    $(this).show();
    $(BottomElement).mousedown(); //Manually fire the event for desired underlying element

    return false;

	});*/ 
	
	
	$(".imageContainer").mousemove(function(event){
		var xPos = -(((event.pageX  - $( this ).offset().left)/event.currentTarget.clientWidth-0.5) * 3.0) -50;
		var yPos = -(((event.pageY  - $( this ).offset().top)/event.currentTarget.clientHeight-0.5)*3.0) - 50;
		TweenLite.to(event.currentTarget.firstElementChild, 0.6, { x:xPos + "%", y:yPos + "%", ease:Power1.easeOut});
	});
	
	$( window ).resize(function()
	{
		var _width = $bcg.width()*0.9 + "px";
	   TweenLite.set($fullInfo, {width: _width});
	});
	function init(){
	  TweenLite.set($homeSlide.not($activeSlide), {autoAlpha: 0});
	  TweenLite.set($fullInfo, {autoAlpha: 0});
	  var _width = $bcg.width()*0.9 + "px";
	   TweenLite.set($fullInfo, {width: _width});
	  TweenLite.set($(".slideImg"), {x:"-50%", y:"-50%"});
	}

	init();

	
	function showFullInfo(slide, info){
		animator.inProgress = true;
		animator.state = "full";
		var tl1 = new TimelineMax({repeat:1, yoyo:true});
		tl1.append(new TweenLite.to(slide, animator.transitionTime/2.0, {y: '+=30px', ease:Power1.easeInOut}, 0));
		
		var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
			tl
				.set(info, {x:"-110%",className: '+=active'})
				.set(slide, {className: '-=active'})
				.set($bcg, {overflowY:"auto", delay:animator.transitionTime})
				.to($slideNav, animator.transitionTime, {autoAlpha: 0, x:"+=110%", rotation:"+=90deg", ease:Power2.easeInOut},0)
				.to(slide, animator.transitionTime, {x: '+=110%',autoAlpha: 0, ease:Power2.easeInOut}, 0)
				.to(info, animator.transitionTime, {x: '+=110%',autoAlpha: 1, ease:Power2.easeInOut}, 0);
				
		
	};
	function showCaseInfo(info, _case){
		animator.inProgress = true;
		animator.state = "case";
		var tl1 = new TimelineMax({repeat:1, yoyo:true});
		tl1.append(new TweenLite.to(_case, animator.transitionTime/2.0, {x: '-=30px', y:'+=10px', ease:Power1.easeInOut}, 0));
		
		var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
			tl
				.set(_case, {x:"+110%",className: '+=active'})
				.set(info, {className: '-=active'})
				.set($bcg, {overflowY:"hidden"})
				.to($slideNav, animator.transitionTime, {autoAlpha: 1, x:"-=110%", rotation:"-=90deg", ease:Power2.easeInOut},0)
				.to(info, animator.transitionTime, {x: '-=110%',autoAlpha: 0, ease:Power2.easeInOut}, 0)
				.to(_case, animator.transitionTime, {x: '-=110%',autoAlpha: 1, ease:Power2.easeInOut}, 0);
				
		
	};

	function goToNextSlide(slideOut, slideIn){
		animator.inProgress = true;
		//var tl1 = new TimelineMax({repeat:1, yoyo:true});
			//tl1.append(new TweenLite.to($(".homeSlide"), animator.transitionTime/2.0, {x: '+=30px', ease:Power1.easeInOut}, 0));
		var tl = new TimelineMax({onComplete: function (){animator.inProgress = false;}});
			tl
				.set(slideIn, {y:"110%", className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.to(slideIn, animator.transitionTime, {y: '-=110%',autoAlpha: 1, ease:Power2.easeInOut}, 0)
				.to(slideOut, animator.transitionTime, {y: '-=110%',autoAlpha: 0, ease:Power2.easeInOut}, 0);
	};

	function goToPreviousSlide(slideOut, slideIn){
	  animator.inProgress = true;
	//  var tl1 = new TimelineMax({repeat:1, yoyo:true});
	//	tl1.append(new TweenLite.to($(".homeSlide"), animator.transitionTime/2.0, {x: '-=30px', ease:Power1.easeInOut}, 0));
	  var tl = new TimelineLite({onComplete: function (){animator.inProgress = false;}});
	    tl
			.set(slideIn, {y:"-110%",className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.set(slideOut, { y: '-=220%', delay:animator.transitionTime})
			.to(slideIn, animator.transitionTime, {y: '+=110%', autoAlpha: 1,ease:Power2.easeInOut}, 0)
			.to(slideOut, animator.transitionTime, {y: '+=110%', autoAlpha: 0, ease:Power2.easeInOut}, 0);
	};
	 
	$slideNavNext.click(function (e) {
		getRandomSlide("down");
	});
	
	$slideNavPrev.click(function (e) {
	  getRandomSlide("up");
	});
	
	function getRandomSlide(direction)
	{
	if (!animator.inProgress)
	  {
	var slideOut = $('.homeSlide.active'),
		slideIn = $('.homeSlide:not(.active)');
		slideIn =  slideIn [getRandomInt(0, slideIn.length-1)];
	if (direction == "down")
	  goToNextSlide(slideOut, slideIn);
	if (direction == "up")
	  goToPreviousSlide(slideOut, slideIn);
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
	  var $caseSlide  =  $(".homeSlide[case="+$case+"]"); 
	  var $infoSlide = $(".caseFullInfo[case="+$case+"]");
	 showCaseInfo( $infoSlide, $caseSlide);
	});
	
	$( "html" ).mousewheel(function(event){
		if (animator.state == "case")
		{
		if (event.deltaY < 0)
			getRandomSlide("up")
		else
			getRandomSlide("down");
		}
	});

})(jQuery);