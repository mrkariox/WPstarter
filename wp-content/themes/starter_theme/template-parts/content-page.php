<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Starter_theme
 */

?>

<article id="post-<?php the_ID(); ?>" class="paddingBottom">

	<?php
		the_content();

		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'starter_theme' ),
			'after'  => '</div>',
		) );
	?>

</article><!-- #post-<?php the_ID(); ?> -->

