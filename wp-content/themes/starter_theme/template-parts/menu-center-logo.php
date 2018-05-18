<?php
/**
 * Template part for displaying menu with logo in center
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Starter_theme
 */

?>
<div class="navSpaceHolder"></div>
<nav class="navbar navbar-starter-theme">
  <div class="flexy_nonmobile">
    <div class="navbar-header">
      <a class="navbar-brand" href="<?php echo get_home_url(); ?>">
		  	<img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="logo">
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
		<div class="row">

    		<div class="container" style="position: relative">
    			<div class="row">
    				<div class="mainNav__child mainNav__child--left col-lg-6 col-md-6 col-sm-6">
						<?php
							wp_nav_menu( array(
								'menu' => 'menu-1',
								'menu_class'     => 'nav navbar-nav navbar-navLeft'
							) );
						?>
		    		</div>
		    		<a class="navbar-brand-nomobile" href="<?php echo get_home_url(); ?>">
						<img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="logo">
					</a>
		    		<div class="mainNav__child mainNav__child--right col-lg-6 col-md-6 col-sm-6">
						<?php
							wp_nav_menu( array(
								'menu'        => 'menu-2',
								'menu_class'     => 'nav navbar-nav navbar-navRight'
							) );
						?>
		    		</div>
    			</div>
			</div>
		
		</div>
    </div>
  </div>
</nav><!-- #site-navigation -->