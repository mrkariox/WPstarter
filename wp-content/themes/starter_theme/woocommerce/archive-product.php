<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

?>

<div class="container">
	<div class="sRow row">
		<div class="sCol col-md-12">
			<?php woocommerce_breadcrumb(); ?>
		</div>
		<div class="sCol col-md-12">
			<div class="notificationsContainer">
				<?php woocommerce_output_all_notices() ?>
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="productsFlexy">
			<div class="sCol col-lg-9 col-lg-push-3 col-md-9 col-md-push-3 col-sm-8 col-sm-push-4 col-xs-12">
				<?php
				if ( woocommerce_product_loop() ) {

					?>
					<h1 class="sectionHeader marginBottom marginTopHalf">
						<?php single_cat_title() ?>
					</h1>
					<div class="beforeProductLoop">
						<?php woocommerce_catalog_ordering(); ?>
					</div>
					<div class="clearfix"></div>
					<main class="productsContainer">
						<div class="sRow row">
						<?php

						if ( wc_get_loop_prop( 'total' ) ) {
							while ( have_posts() ) {
								the_post();

								/**
								 * Hook: woocommerce_shop_loop.
								 *
								 * @hooked WC_Structured_Data::generate_product_data() - 10
								 */
								// do_action( 'woocommerce_shop_loop' );

								wc_get_template_part( 'content', 'product' );
							}
						}

						?>
						</div>
					</main><!-- productsContainer -->
					<?php

					/**
					 * Hook: woocommerce_after_shop_loop.
					 *
					 * @hooked woocommerce_pagination - 10
					 */
					do_action( 'woocommerce_after_shop_loop' );
				} else {
					/**
					 * Hook: woocommerce_no_products_found.
					 *
					 * @hooked wc_no_products_found - 10
					 */
					do_action( 'woocommerce_no_products_found' );
				}?>
			</div>

			<div class="sCol col-lg-3 col-lg-pull-9 col-md-3 col-md-pull-9 col-sm-4 col-sm-pull-8 col-xs-12">
				<?php
				/**
				 * Hook: woocommerce_sidebar.
				 *
				 * @hooked woocommerce_get_sidebar - 10
				 */
				do_action( 'woocommerce_sidebar' );

				?>
			</div>
		</div>
	</div><!-- row -->
</div><!-- container -->

<?php

get_footer( 'shop' );
