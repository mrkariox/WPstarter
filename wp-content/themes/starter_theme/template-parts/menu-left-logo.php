<?php
/**
 * Template part for displaying menu with logo on the left
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Starter_theme
 */

?>
<div class="navSpaceHolder"></div>
    <nav class="navbar navbar-starter-theme">
        <div class="container">
        <div class="flexy_nonmobile">
            <div class="navbar-header">
                <a class="navbar-brand" href="<?php echo get_home_url(); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="site logo">
                <span class="brandName">
                    Company
                </span>
                </a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#mainNav">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span> 
                </button>
            </div>
            <div class="collapse navbar-collapse mainNav" id="mainNav">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'menu-1',
                    'menu_id'        => 'primary-menu',
                    'menu_class'     => 'nav navbar-nav',
                    'walker'     => new ipage_submenu_class()
                ) );
                ?>
            </div>
        </div>
        </div>
    </nav><!-- #site-navigation -->