(function($) {

// Set variables


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

	/*	// Mouse move tilt effect
	$(document).mousemove(function(event){
	  
		// Detect mouse position
		var xPos = (event.clientX/$(window).width())-0.5;
		var yPos = (event.clientY/$(window).height())-0.5;

		// Tilt the hero container
		TweenLite.to($hero, 0.6, { rotationY:5*xPos, rotationX:5*yPos, ease:Power1.easeOut, transformPerspective:900, transformOrigin:"center" });

		// Update text on the page with the current mouse position
		$(".bottom strong").text(event.pageX + ", " + event.pageY);
	});*/
	

	// Init function that run on page load
	function init(){

	  // Hide all slides apart from the active one
	  TweenLite.set($homeSlide.not($activeSlide), {autoAlpha: 0});

	  // Disable arrow down on page load
	  TweenLite.set($slideNavPrev, {autoAlpha: 0.2});
	  
	}

	// Run Init function
	init();


	function goToNextSlide(slideOut, slideIn){
	  var tl = new TimelineLite(),
	    size = $('.homeSlide').length;
		if(slideIn.length !== 0){
			tl
				.set(slideIn, {y:"100%", autoAlpha: 1,className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.to(slideIn, 1, {y: '-=100%', ease:Power2.easeInOut}, 0)
				.to(slideOut, 1, {y: '-=100%', ease:Power2.easeInOut}, 0);
		} 
		TweenLite.set($slideNavPrev, {autoAlpha: 1});
		//if(index === size){
		//  TweenLite.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
		//}
	  
	}

	// Navigation click - go to the Next Slide
	$slideNavNext.click(function (e) {
	  e.preventDefault();
	  
	  var slideOut = $('.homeSlide.active'),
		   slideIn = $('.homeSlide:not(.active)');
		  slideIn =  slideIn [getRandomInt(0, slideIn.length-1)];
	  
	  goToNextSlide(slideOut, slideIn);
	  
	});

	// Go to previous slide - pass 2 parameters - slideOut and slideIn
	function goToPreviousSlide(slideOut, slideIn){
	  
	  var tl = new TimelineLite(),
	    index = slideIn.index(),
	    size = $('.top .homeSlide').length;
	  
	  if(slideIn.length !== 0){
	    tl
			.set(slideIn, {y:"-100%", autoAlpha: 1,className: '+=active'})
			.set(slideOut, {className: '-=active'})
			.to(slideIn, 2, {y: '+=100%', ease:Power3.easeInOut}, 0)
			.to(slideOut, 2, {y: '+=100%', ease:Power3.easeInOut}, 0);
	  
	  } 

	  TweenLite.set($slideNavNext, {autoAlpha: 1});
	  
	  if(index === 1){
	    TweenLite.to($slideNavPrev, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
	  }
	  
	}
	 
	// Navigation click - go to the Prev Slide
	$slideNavPrev.click(function (e) {
	  e.preventDefault();
	  
	  var slideOut = $('.homeSlide.active');
	 
	    var  slideIn = $('.homeSlide.active').prev('.homeSlide');
	  
	  goToPreviousSlide(slideOut, slideIn);
	  
	});

})(jQuery);