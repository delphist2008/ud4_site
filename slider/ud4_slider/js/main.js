(function($) {


//FIXME: prevent slide changing during animation
//FIXME: navigation buttons size & transparency  changes
//TODO: proper layout for slide
//TODO: mousemove
//TODO: full info panel
//TODO: random/not random navigation

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

	 animation = {inProgress : false};
	

		// Mouse move tilt effect
	$(".slideImg").mousemove(function(event){
	  
		// Detect mouse position
		var xPos = ((event.clientX/$(window).width())-0.5)*(-90);
		var yPos = ((event.clientY/$(window).height())-0.5)*(-90);

		//TweenLite.to($(".slideImg"), 0.6, { backgroundPosition:"xPos  yPos", ease:Power1.easeOut});


	});
	

	// Init function that run on page load
	function init(){

	  // Hide all slides apart from the active one
	  TweenLite.set($homeSlide.not($activeSlide), {autoAlpha: 0});

	  // Disable arrow down on page load
	  //TweenLite.set($slideNavPrev, {autoAlpha: 0.2});
	  
	}

	// Run Init function
	init();


	function goToNextSlide(slideOut, slideIn){
		animation.inProgress = true;
		var tl1 = new TimelineMax({repeat:1, yoyo:true});
		tl1.append(new TweenLite.to($(".homeSlide"), 0.5, {x: '+=30px', ease:Power1.easeInOut}, 0));
		
		var tl = new TimelineMax({onComplete: function (){animation.inProgress = false;}}),
	    size = $('.homeSlide').length;
		if(slideIn.length !== 0){
			tl
				.set(slideIn, {y:"110%",className: '+=active'})
				.set(slideOut, {className: '-=active'})
				.to(slideIn, 1, {y: '-=110%',autoAlpha: 1, ease:Power2.easeInOut}, 0)
				.to(slideOut, 1, {y: '-=110%',autoAlpha: 0, ease:Power2.easeInOut}, 0);
				
		} 
		//TweenLite.set($slideNavPrev, {autoAlpha: 1});
		//if(index === size){
		//  TweenLite.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
		//}
	  
	}

	// Navigation click - go to the Next Slide
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
		tl1.append(new TweenLite.to($(".homeSlide"), 0.5, {x: '-=30px', ease:Power1.easeInOut}, 0));
		
	  var tl = new TimelineLite({onComplete: function (){animation.inProgress = false;}}),
	    size = $('.top .homeSlide').length;
	  
	  if(slideIn.length !== 0){
	    tl
			.set(slideIn, {y:"-110%",className: '+=active'})
			.set(slideOut, { className: '-=active'})
			.to(slideIn, 1, {y: '+=110%', autoAlpha: 1,ease:Power3.easeInOut}, 0)
			.to(slideOut, 1, {y: '+=110%', autoAlpha: 0, ease:Power3.easeInOut}, 0);
	  } 

	 // TweenLite.set($slideNavNext, {autoAlpha: 1});
	  
	 // if(index === 1){
	  //  TweenLite.to($slideNavPrev, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
	 // }
	  
	}
	 
	// Navigation click - go to the Prev Slide
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