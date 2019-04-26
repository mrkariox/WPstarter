<?php 

$src = $template_args['src'];
$category_slugs = $template_args['category_slugs'];
$product_not_in = $template_args['product_not_in'];
$headerName = '';
$class = '';

switch ($src) {
    case 'onsale':
        $args = array(
            'post_type'      => 'product',
            'posts_per_page' => 8,
            'post__not_in' => $product_not_in,
            'post_status' => 'publish',
            'meta_query'     => array(
                'relation' => 'OR',
                array( // Simple products type
                    'key'           => '_sale_price',
                    'value'         => 0,
                    'compare'       => '>',
                    'type'          => 'numeric'
                ),
                array( // Variable products type
                    'key'           => '_min_variation_sale_price',
                    'value'         => 0,
                    'compare'       => '>',
                    'type'          => 'numeric'
                )
            )
        );
        $headerName = 'Wyprzedaż';
        $class = 'orange';
        break;
    case 'bestsellers':
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => 8,
            'post__not_in' => $product_not_in,
            'post_status' => 'publish',
            'meta_key' => 'total_sales',
            'orderby' => 'meta_value_num',
            'order' => 'DESC',
        );
        $headerName = "Najczęściej kupowane";
        $class = 'blue';
        break;
    case 'category':
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => 8,
            'post__not_in' => $product_not_in,
            'post_status' => 'publish',
            'product_cat' => $category_slugs,
            'orderby' => 'meta_value_num',
            'order' => 'DESC',
        );
        $headerName = "Do zakupów polecamy...";
        $class = 'green';
        break;
    default:
        # code...
        break;
}

$loop = new WP_Query( $args );
?>
<?php if ( $loop->have_posts() ): ?> 
    <section class="productsGroup productsModule marginBottomHalf clearfix">
        <h2 class="sectionHeader marginBottom <?php echo $class ?>">
            <?php echo $headerName ?>
        </h2>
        <div class="productsModule__sliderContainer">
            <div class="sRow row"> 
                <div class="productsModule__slider">
                    <?php while ( $loop->have_posts() ) : $loop->the_post() ?>
                        <div class="sCol col-lg-3 col-md-3 col-sm-6 col-xs-12 marginBottomHalf">
                            <?php hm_get_template_part( 'template-parts/products/singleLoop', [
                                'product' => wc_get_product($loop->post)
                            ] ); ?>
                        </div>
                    <?php endwhile ?>
                </div>  
            </div>
            <div class="productsModule__nav productsModule__nav--left"><i class="fas fa-caret-left"></i></div>
            <div class="productsModule__nav productsModule__nav--right"><i class="fas fa-caret-right"></i></div>
        </div>
    </section>
<?php endif ?>
<?php wp_reset_postdata() ?>