<?php
/**
 * Template part for displaying single item
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Starter_theme
 */

?>

<?php 

	// template args
	$img_src = $template_args['img_src'];
	$desc = $template_args['desc_src'];
	$page = $template_args['page'];
	$show_title = $template_args['show_title'];
	$title = $template_args['title'];
	$name_in_btn = $template_args['name_in_button'];
	$hide_btn = $template_args['hide_btn'];
	$pageID = $page->ID;

?>

<article class="singleItem">
		
	<?php if ($img_src): ?>
		<div class="singleItem__thumb">
			<img src="<?php echo $img_src ?>" alt="<?php echo $link_text ?>">
		</div>
	<?php endif ?>

	<div class="singleItem__content" style="<?php echo (!$desc ? 'justify-content: center' : ''); ?>">
		
		<div class="singleItem__text">
			<?php if ($show_title): ?>
				<div class="singleItem__title"><?php echo ($title ? $title : $page->post_title)  ?></div>
			<?php endif ?>
			<?php echo $desc ?>
		</div>
		
		<?php if ($page & !$hide_btn): ?>
			
			<div class="singleItem__link">

				<a href="<?php echo get_permalink( $pageID ); ?>">
					<?php echo ($name_in_btn ? __('Zobacz', 'starter_theme')." ".get_the_title( $pageID ) : __('Zobacz', 'starter_theme')) ?>
				</a>

			</div>
			
		<?php endif ?>

	</div>


</article>
