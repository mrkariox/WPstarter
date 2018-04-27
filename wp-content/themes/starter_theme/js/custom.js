// 
//  Artixen.net
//  Custom JS
// 

(function($) {


	$(document).ready(function(){

        // ---------------- Main slider ----------------
		$('.main_slider').owlCarousel({
		    loop:true,
		    margin:0,
		    nav:false,
		    dots: true,
		    dotsContainer: '.mainSlider__dots',
		    items:1,
		    smartSpeed: 2000,
		    navText: ["",""],
		    autoplay: true,
		    autoplayHoverPause: true
		});

	}); //document ready



	window.onload = function() {



	}; //window onload

	$( window ).resize(function() {



	}); //window resize


})(jQuery);