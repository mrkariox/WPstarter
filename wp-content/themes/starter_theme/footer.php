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
			
			<a href="<?php echo get_permalink( get_icl_id( 20 ) ) ?>"><?php echo get_the_title( get_icl_id( 20 ) ) ?></a> <a href="https://artixen.net/"><?php echo __('tworzenie stron www', 'starter_theme') ?>: Artixen.net</a> 2018

		</div>
		
	</footer><!-- .mainFooter -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
