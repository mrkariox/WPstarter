<?php
/**
 * Template part for displaying Main Slider
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Starter_theme
 */

?>

<section class="mainSlider">

	<?php if( have_rows('start_slider', 'option') ): ?>
		
		<div class="mainSlider__slider">
	    
		    <?php while( have_rows('start_slider', 'option') ) : the_row(); ?>
		        <!-- .slick-slide  -->
				<div>
					<div class="mainSlider__item" style="background-image: url(<?php echo get_sub_field('start_slider_background')['sizes']['start_slider_background']; ?>)">
						
						<div class="mainSlider__content">
							<?php echo get_sub_field('start_slider_content'); ?>
						</div>

					</div>
				</div>

		    <?php endwhile; ?>
		
		</div>
		<div class="mainSlider__dots">
		</div>
		<div class="mainSlider__nav">
			<div class="mainSlider__nav_left"></div>
			<div class="mainSlider__nav_right"></div>
		</div>

	<?php endif; ?>

</section>
