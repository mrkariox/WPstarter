<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Starter_theme
 */

?>

<article id="post-<?php the_ID(); ?>" class="newsArticle marginBottom">

	<div class="clearfix">
		
		<?php if (get_the_post_thumbnail_url( $post->ID )): ?>
				
			<div class="newsArticle__thumb">
				
				<img src="<?php echo get_the_post_thumbnail_url( $post->ID ) ?>" alt="<?php echo get_the_title( ) ?>">

			</div>

		<?php endif ?>

		<div class="newsArticle__content">	
			
			<?php the_content(); ?>

		</div>

	</div><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->