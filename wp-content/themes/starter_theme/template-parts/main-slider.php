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
		
		<div class="main_slider owl-carousel">
	    
		    <?php while( have_rows('start_slider', 'option') ) : the_row(); ?>
		        
		        <div class="main_slider__item" style="background-image: url(<?php echo get_sub_field('start_slider_background')['sizes']['start_slider_background']; ?>)">
		        	
		        	<div class="main_slider__content">
		        		<?php echo get_sub_field('start_slider_content'); ?>
		        	</div>

		        </div>

		    <?php endwhile; ?>
		
		</div>
		<div class="mainSlider__dots"></div>

	<?php endif; ?>

</section>
