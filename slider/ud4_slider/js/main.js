(function($) {


//TODO: full info panel


//FIXME: navigation buttons size & transparency  changes

//TODO: random/not random navigation
//TODO: mouse scroll sliding


//NOTE: mouse event forwarding for IE<11 instead of pointer-events:none

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var $activeSlide = $(".active"),
    $homeSlide = $(".homeSlide"),
	$fullInfo = $(".caseFullInfo"),
	$showInfo = $(".showInfo"),
	$closeInfo = $(".closeInfo"),
	$slideNav = $(".slideNav"),
    $slideNavPrev = $("#slideNavPrev"),
    $slideNavNext = $("#slideNavNext")
    $hero = $(".hero");

	animation = {inProgress : false, transitionTime: .8};
	

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
	
	function init(){
	  TweenLite.set($homeSlide.not($activeSlide), {autoAlpha: 0});
	  TweenLite.set($fullInfo, {autoAlpha: 0});
	  TweenLite.set($(".slideImg"), {x:"-50%", y:"-50%"});
	}

	init();

	
	function showFullInfo(slide, info){
		animation.inProgress = true;
		var tl1 = new TimelineMax({repeat:1, yoyo:true});
		tl1.append(new TweenLite.to(slide, animation.transitionTime/2.0, {y: '+=30px', ease:Power1.easeInOut}, 0));
		
		var tl = new TimelineMax({onComplete: function (){animation.inProgress = false;}});
			tl
				.set(info, {x:"-110%",className: '+=active'})
				.set(slide, {className: '-=active'})
				.to($slideNav, animation.transitionTime, {autoAlpha: 0, x:"+=110%", ease:Power2.easeInOut},0)
				.to(slide, animation.transitionTime, {x: '+=110%',autoAlpha: 0, ease:Power2.easeInOut}, 0)
				.to(info, animation.transitionTime, {x: '+=110%',autoAlpha: 1, ease:Power2.easeInOut}, 0);
				
		
	};
	function showCaseInfo(info, _case){
		animation.inProgress = true;
		var tl1 = new TimelineMax({repeat:1, yoyo:true});
		tl1.append(new TweenLite.to(_case, animation.transitionTime/2.0, {x: '-=30px', y:'+=10px', ease:Power1.easeInOut}, 0));
		
		var tl = new TimelineMax({onComplete: function (){animation.inProgress = false;}});
			tl
				.set(_case, {x:"+110%",className: '+=active'})
				.set(info, {className: '-=active'})
				.to($slideNav, animation.transitionTime, {autoAlpha: 1, x:"-=110%", ease:Power2.easeInOut},0)
				.to(info, animation.transitionTime, {x: '-=110%',autoAlpha: 0, ease:Power2.easeInOut}, 0)
				.to(_case, animation.transitionTime, {x: '-=110%',autoAlpha: 1, ease:Power2.easeInOut}, 0);
				
		
	};

	function goToNextSlide(slideOut, slideIn){
		animation.inProgress = true;
		var tl1 = new TimelineMax({repeat:1, yoyo:true});
		tl1.append(new TweenLite.to($(".homeSlide"), animation.transitionTime/2.0, {x: '+=30px', ease:Power1.easeInOut}, 0));
		
		var tl = new TimelineMax({onComplete: function (){animation.inProgress = false;}}),
	    size = $('.homeSlide').length;
		if(slideIn.length !== 0){
			tl
				.set(slideIn, {y:"110%",className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.to(slideIn, animation.transitionTime, {y: '-=110%',autoAlpha: 1, ease:Power2.easeInOut}, 0)
				.to(slideOut, animation.transitionTime, {y: '-=110%',autoAlpha: 0, ease:Power2.easeInOut}, 0);
				
		} 
	}


	$slideNavNext.click(function (e) {
	  e.preventDefault();
	  
	 if (!animation.inProgress)
	  {
	  var slideOut = $('.homeSlide.active'),
		   slideIn = $('.homeSlide:not(.active)');
		  slideIn =  slideIn [getRandomInt(0, slideIn.length-1)];
	  
	  goToNextSlide(slideOut, slideIn);
	  };
	  
	});

	function goToPreviousSlide(slideOut, slideIn){
	  animation.inProgress = true;
	  var tl1 = new TimelineMax({repeat:1, yoyo:true});
		tl1.append(new TweenLite.to($(".homeSlide"), animation.transitionTime/2.0, {x: '-=30px', ease:Power1.easeInOut}, 0));
		
	  var tl = new TimelineLite({onComplete: function (){animation.inProgress = false;}}),
	    size = $('.top .homeSlide').length;
	  
	  if(slideIn.length !== 0){
	    tl
			.set(slideIn, {y:"-110%",className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.to(slideIn, animation.transitionTime, {y: '+=110%', autoAlpha: 1,ease:Power3.easeInOut}, 0)
			.to(slideOut, animation.transitionTime, {y: '+=110%', autoAlpha: 0, ease:Power3.easeInOut}, 0);
	  } 
	}
	 
	$slideNavPrev.click(function (e) {
	  e.preventDefault();
	  if (!animation.inProgress)
	  {
	  var slideOut = $('.homeSlide.active'),
	  slideIn = $('.homeSlide:not(.active)');
		  slideIn =  slideIn [getRandomInt(0, slideIn.length-1)];
	  goToPreviousSlide(slideOut, slideIn);
	  };
	  
	});
	
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

})(jQuery);