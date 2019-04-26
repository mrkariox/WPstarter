<?php 

$src = $template_args['src'];
$headerName = '';
$class = '';

switch ($src) {
    case 'onsale':
        $args = array(
            'post_type'      => 'product',
            'posts_per_page' => 4,
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
            'posts_per_page' => 4,
            'post_status' => 'publish',
            'meta_key' => 'total_sales',
            'orderby' => 'meta_value_num',
            'order' => 'DESC',
        );
        $headerName = "Najczęściej kupowane";
        $class = 'blue';
        break;
    default:
        # code...
        break;
}

$loop = new WP_Query( $args );
?>

<section class="productsGroup marginBottomHalf clearfix">
    <h2 class="sectionHeader marginBottom <?php echo $class ?>">
        <?php echo $headerName ?>
    </h2>
    <div class="sRow row"> 
        <?php if ( $loop->have_posts() ): ?> 
            <?php while ( $loop->have_posts() ) : $loop->the_post() ?>
                <div class="sCol col-lg-3 col-md-3 col-sm-6 col-xs-12 marginBottomHalf">
                    <?php hm_get_template_part( 'template-parts/products/singleLoop', [
                        'product' => wc_get_product($loop->post)
                    ] ); ?>
                </div>
            <?php endwhile ?>
        <?php endif ?>
        <?php wp_reset_postdata() ?>  
    </div>
</section>