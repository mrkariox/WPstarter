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
		<nav class="navbar navbar-starter-theme">
		  <div class="flexy_nonmobile">
		    <div class="navbar-header">
		      <a class="navbar-brand" href="<?php echo get_home_url(); ?>">
		      	<img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="site logo">
		      </a>
		      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span> 
		      </button>
		    </div>
		    <div class="collapse navbar-collapse" id="myNavbar">
		      <?php
				wp_nav_menu( array(
					'theme_location' => 'menu-1',
					'menu_id'        => 'primary-menu',
					'menu_class'     => 'nav navbar-nav'
				) );
				?>
		    </div>
		  </div>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
