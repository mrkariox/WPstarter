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

	$(window).on('scroll', function() {
		// stickyNav();
	});

	window.onload = function() {

	}; //window onload

	$( window ).resize(function() {

	}); //window resize

	function fixedMenuHeightMargin() {
		$navbar = $('.navbar-starter-theme');

		if (window.innerWidth > 767) {
			var $menuHeight = $navbar.height();
		} else {
			var $menuHeight = $('.navbar-header').outerHeight();
		}
	
		$('.navSpaceHolder').css('margin-bottom', $menuHeight);

    }

    function stickyNav() {
        var $navbar = $('.navbar-starter-theme');
        var $navbarHolder = $('.navSpaceHolder');
        if ($(window).scrollTop() >= $navbarHolder.offset().top) {
			if (!$navbar.hasClass('sticky')) {
				fixedMenuHeightMargin();
				$navbar.addClass('sticky');
			}
        } else {
            if ($navbar.hasClass('sticky')) {
				$('.navSpaceHolder').css('margin-bottom', 0);
				$navbar.removeClass('sticky').trigger('stickyRemove');
			}
        }
    }


})(jQuery);