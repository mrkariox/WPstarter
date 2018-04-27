<?php
/**
 * The template for displaying front page
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Starter_theme
 */

get_header(); ?>

	<?php get_template_part( 'template-parts/frontPageHeader' ); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
	
			<?php //get_template_part( 'template-parts/frontPageUnderHeader' ); ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php

get_footer();
