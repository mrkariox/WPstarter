<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Starter_theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<div class="container marginBottom" style="text-align:center">	

				<div class="fouroufour">404</div>

				<h1><?php echo __('Coś poszło nie tak', 'starter_theme') ?>! <span style="white-space: nowrap">;(</span></h1>

			</div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
