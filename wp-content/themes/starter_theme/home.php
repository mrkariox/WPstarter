<?php
/**
 * The template for displaying all pages
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

	<?php get_template_part( 'template-parts/main', 'slider' ); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<?php
			while ( have_posts() ) : the_post();

				echo hm_get_template_part('/template-parts/singleItem', [
	        			
					'img_src' => get_the_post_thumbnail_url($post->ID),
					'show_title' => true,
					'desc_src' => get_the_excerpt($post->ID),
					'page' => $post,
					'name_in_button' => false,

				]);

			endwhile; // End of the loop.
			?>

			<?php $args = array(
				'prev_text'          => '<',
				'next_text'          => '>',
				'show_all'           => true,
				'type'               => 'array',
			); ?>
			
			<?php if (paginate_links($args)): ?>
				
				<div class="customPagination paddingTopHalf">
					<?php 
						foreach (paginate_links($args) as $key => $link) {
							echo $link;
						}
					?>
				</div>

			<?php endif ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php

get_footer();
