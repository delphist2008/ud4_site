(function($) {

// Set variables
var $activeSlide = $(".active"),
    $homeSlide = $(".homeSlide"),
    $slideNavPrev = $(".slideNavPrev"),
    $slideNavNext = $(".slideNavNext")
    $slideNavPrevA = $(".slideNavPrev a"),
    $slideNavNextA = $(".slideNavNext a"),
    $hero = $(".hero");

	// Mouse move tilt effect
	$(document).mousemove(function(event){
	  
		// Detect mouse position
		var xPos = (event.clientX/$(window).width())-0.5;
		var yPos = (event.clientY/$(window).height())-0.5;

		// Tilt the hero container
		TweenLite.to($hero, 0.6, { rotationY:5*xPos, rotationX:5*yPos, ease:Power1.easeOut, transformPerspective:900, transformOrigin:"center" });

		// Update text on the page with the current mouse position
		$(".bottom strong").text(event.pageX + ", " + event.pageY);
	});
	

	// Init function that run on page load
	function init(){

	  // Hide all slides apart from the active one
	  TweenLite.set($homeSlide.not($activeSlide), {autoAlpha: 0});

	  // Disable arrow down on page load
	  TweenLite.set($slideNavPrev, {autoAlpha: 0.2});
	  
	}

	// Run Init function
	init();

	// Go to next slide - pass 2 parameters - slideOut and slideIn
	function goToNextSlide(slideOut, slideIn){
	  var tl = new TimelineLite(),
		slideOutH1 = slideOut.find('h1'),
		slideOutP = slideOut.find('p'),
		slideInH1 = slideIn.find('h1'),
		slideInP = slideIn.find('p'),
	    index = slideIn.index(),
	    size = $('.top .homeSlide').length;
	  
		if(slideIn.length !== 0){
			
			// go to the next slide timeline
			tl
				// move the new slide (the one about to enter viewport) out of the viewport and add class active
				.set(slideIn, {y: '100%', autoAlpha: 1, className: '+=active'})
				// remove class active from the currently active slide (slideOut)
				.set(slideOut, {className: '-=active'})
				// animate H1 and p of the active slide up and fade them out
				.to([slideOutH1,slideOutP], 0.3, {y: '-=15px', autoAlpha: 0, ease:Power3.easeInOut}, 0)
				// animate active slide up (out of the viewport)
				.to(slideOut, 0.5, {y: '-100%', ease:Power3.easeInOut}, 0)
				// animate new slide up (from out of the viewport)
				.to(slideIn, 0.5, {y: '-=100%', ease:Power3.easeInOut}, 0)
				// animate H1 and P of the new slide up and fade them in
				.fromTo([slideInH1,slideInP], 0.3, {y: '+=20px', autoAlpha: 0}, {autoAlpha: 1, y: 0, ease:Power1.easeInOut}, 0.3);

		} 

		// Fade out arrow up and fade in arrow down 

		// Fade in arrow down
		TweenLite.set($slideNavPrev, {autoAlpha: 1});

		// Fade out arrow up on last slide
		if(index === size){
		  TweenLite.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
		}
	  
	}

	// Navigation click - go to the Next Slide
	$slideNavNext.click(function (e) {
	  e.preventDefault();
	  
	  var slideOut = $('.homeSlide.active'),
	      slideIn = $('.homeSlide.active').next('.homeSlide');
	  
	  goToNextSlide(slideOut, slideIn);
	  
	});

	// Go to previous slide - pass 2 parameters - slideOut and slideIn
	function goToPreviousSlide(slideOut, slideIn){
	  
	  var tl = new TimelineLite(),
	    slideOutH1 = slideOut.find('h1'),
	    slideOutP = slideOut.find('p'),
	    slideInH1 = slideIn.find('h1'),
	    slideInP = slideIn.find('p'),
	    index = slideIn.index(),
	    size = $('.top .homeSlide').length;
	  
	  if(slideIn.length !== 0){

		// go to the previous slide timeline
	    tl
	      // move the new slide (the one about to enter viewport) out of the viewport (to the top)
	      .set(slideIn, {y: '-100%', autoAlpha: 1, className: '+=active'})
	      // remove class active from the currently active slide (slideOut)
	      .set(slideOut, {className: '-=active'})
	      // animate H1 and p of the active slide down and fade them out
	      .to([slideOutH1,slideOutP], 0.3, {y: '+=15px', autoAlpha: 0, ease:Power3.easeInOut}, 0)
	      // animate active slide down (out of the viewport)
	      .to(slideOut, 0.5, {y: '100%', ease:Power3.easeInOut}, 0)
	      // animate new slide down (from out of the viewport)
	      .to(slideIn, 0.5, {y: '+=100%', ease:Power3.easeInOut}, '-=0.5')
	      // animate H1 and P of the new slide down and fade them in
	      .fromTo([slideInH1,slideInP], 0.3, {y: '-=20px', autoAlpha: 0}, {autoAlpha: 1, y: 0, ease:Power1.easeInOut}, 0.3);
	  
	  } 

	  // Fade out arrow down and fade in arrow up 
	  
	  // Fade in arrow up
	  TweenLite.set($slideNavNext, {autoAlpha: 1});
	  
	  // Fade out arrow down on first slide
	  if(index === 1){
	    TweenLite.to($slideNavPrev, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
	  }
	  
	}
	 
	// Navigation click - go to the Prev Slide
	$slideNavPrev.click(function (e) {
	  e.preventDefault();
	  
	  var slideOut = $('.homeSlide.active'),
	      slideIn = $('.homeSlide.active').prev('.homeSlide');
	  
	  goToPreviousSlide(slideOut, slideIn);
	  
	});

})(jQuery);