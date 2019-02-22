<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Starter_theme
 */

?>

	</div><!-- #content -->

	<footer class="mainFooter">

		<div class="mainFooter__content">
			
			

		</div>

		<div class="mainFooter__copyrights">
			
			<a class="mainFooter__cookies" href="<?php echo get_permalink( get_icl_id( 20 ) ) ?>"><?php echo get_the_title( get_icl_id( 20 ) ) ?></a><span> | </span>
			<a class="mainFooter__company" href="https://artixen.net/"><?php echo __('Tworzenie stron www', 'starter_theme') ?>:<span class="mainFooter__companyName"> Artixen.net</span></a><span class="mainFooter__date"> 2019</span>

		</div>
		
	</footer><!-- .mainFooter -->
</div><!-- #page -->

<?php wp_footer(); ?>

<!-- back to top btn -->
<a href="#0" class="cd-top"></a>
</body>
</html>
