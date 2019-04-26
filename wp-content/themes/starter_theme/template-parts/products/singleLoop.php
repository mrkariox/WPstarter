<?php 

$product    = $template_args['product'];
$class      = $template_args['class'];

?>

<div class="<?php echo $class ?>">
    <div class="singleLoop border">
        <a href="<?php echo get_permalink($product->id) ?>" class="singleLoop__img">
            <img src="<?php echo wp_get_attachment_image_src($product->get_image_id(), 'productThumb')[0] ?>" alt="<?php echo $product->name ?>"> 
        </a>
        <div class="standardPadding">
            <h2 class="singleLoop__title">
                <a href="<?php echo get_permalink($product->id) ?>"><?php echo $product->name ?></a>
            </h2>
            <div class="singleLoop__price">
                <?php echo $product->get_price_html() ?>
            </div>
            <div class="singleLoop__btn">
                <button class="btn btn--green btn--notbold add_to_cart_button ajax_add_to_cart" data-product_id="<?php echo $product->id ?>" data-quantity="1">Dodaj do koszyka</button>
            </div>
        </div>
        <div class="singleLoop__badges">
            <?php if ($product->is_on_sale()) : ?>
                <div class="productBadge productBadge--promo">
                    Wyprzedaż!
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>