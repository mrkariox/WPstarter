// 
//  Artixen.net
//  Custom JS
// 

(function($) {


	$(document).ready(function(){

        // ---------------- Main slider ----------------
		$('.mainSlider__slider').slick({
			dots: true,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			prevArrow: $('.mainSlider__nav_left'),
			nextArrow: $('.mainSlider__nav_right'),
			appendDots: $('.mainSlider__dots'),
		  });

		// lang switcher vertical
		$('.langSwitcher__active').click(function(){
			$('.langSwitcher__list').slideToggle();
		});

		// ------------------------------------- BACK TO TOP --------------------------------
		// browser window scroll (in pixels) after which the "back to top" link is shown
			var offset = 300,
			//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
			offset_opacity = 1200,
			//duration of the top scrolling animation (in ms)
			scroll_top_duration = 700,
			//grab the "back to top" link
			$back_to_top = $('.cd-top');

		//hide or show the "back to top" link
		$(window).scroll(function(){
			( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
			if( $(this).scrollTop() > offset_opacity ) { 
				$back_to_top.addClass('cd-fade-out');
			}
		});

		//smooth scroll to top
		$back_to_top.on('click', function(event){
			event.preventDefault();
			$('body,html').animate({
				scrollTop: 0 ,
				}, scroll_top_duration
			);
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
	
		$('.navSpaceHolder').css('height', $menuHeight);

	}

	function stickyNav() {
		var $navbar = $('.navbar-starter-theme');
		var $navbarHolder = $('.navSpaceHolder');

		if ($(window).scrollTop() > $navbarHolder.offset().top) {
			if (!$navbar.hasClass('sticky')) {
				fixedMenuHeightMargin();
				$navbar.addClass('sticky');
			}

		} else {
			if ($navbar.hasClass('sticky')) {
			} else {
				if ($navbar.hasClass('sticky')) {
					$('.navSpaceHolder').css('height', 0);
					$navbar.removeClass('sticky').trigger('stickyRemove');
				}
			}
		}
	}


})(jQuery);
