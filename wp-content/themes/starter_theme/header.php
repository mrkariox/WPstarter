<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Starter_theme
 */

?>
<?php 	

	// Theme variables

	// $GLOBALS['theme_email'] = get_field('theme_email', 'option');

?>

<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<!-- jquery -->
	<?php wp_enqueue_script( 'jquery', get_template_directory_uri().'/js/jquery-3.2.1.js' ); ?>
	
	<!-- Paralax stellarjs -->
	<?php wp_enqueue_script( 'stellarjs', get_template_directory_uri().'/js/jquery.stellar.js' ); ?>
	
	<!-- owl carousel -->
	<?php wp_enqueue_style( 'owlcss', get_template_directory_uri().'/css/owl.carousel.min.css' ); ?>
	<?php wp_enqueue_script( 'owljs', get_template_directory_uri().'/js/owl.carousel.min.js' ); ?>
	
	<!-- bootstrap -->
	<?php wp_enqueue_script( 'bootstrap', get_template_directory_uri().'/js/bootstrap.min.js' ); ?>

	<!-- FontAwesome 5 -->
	<?php wp_enqueue_style( 'fontawesome', 'https://use.fontawesome.com/releases/v5.0.10/css/all.css' ); ?>
	
	<!-- KBmodal -->
	<?php wp_enqueue_script( 'KBmodaljs', get_template_directory_uri().'/js/KBmodal.js' ); ?>

	<!-- custom js -->
	<?php wp_enqueue_script( 'custom', get_template_directory_uri().'/js/custom.js' ); ?>

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">

	<header class="mainHeader">
		<div class="mainHeader_infos">
			<div class="container">
				Contact infos
			</div>
		</div>
		<!-- site-navigation -->
		<?php //echo get_template_part('template-parts/menu-left-logo') ?>
		<?php echo get_template_part('template-parts/menu-center-logo') ?>

	</header><!-- #masthead -->

	<div id="content" class="site-content">
