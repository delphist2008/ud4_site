(function($) {


//TODO: full info panel


//FIXME: navigation buttons size & transparency  changes

//TODO: random/not random navigation
//TODO: mouse scroll sliding
//TODO: slideImg css transform multibrowser

//NOTE: mouse event forwarding for IE<11 instead of pointer-events:none

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var $activeSlide = $(".active"),
    $homeSlide = $(".homeSlide"),
    $slideNavPrev = $(".slideNavPrev"),
    $slideNavNext = $(".slideNavNext")
    $slideNavPrevA = $(".slideNavPrev a"),
    $slideNavNextA = $(".slideNavNext a"),
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
	  TweenLite.set($(".slideImg"), {x:"-50%", y:"-50%"});
	}

	init();

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

})(jQuery);