<?php

class WPML_ACF_Options_Page {

	const CONTEXT = "ACF Option";

	public function add_hooks() {
		add_filter( "acf/update_value", array($this, "register_field_value"), 10, 4);
		add_filter( 'acf/validate_post_id', array($this, "maybe_remove_language_code"), 10, 2);
		add_filter( "acf/load_value", array($this, "translate_field_value"), 10, 3);
	}

	public function is_acf_options_page() {
		$is = is_admin() && isset( $_GET['page'] ) && stristr( $_GET['page'], "acf-options-" ) !== false;
		return $is;
	}

	public function register_field_value( $value, $post_id = null, $field = null, $original_value = null ) {
		if ( $post_id === "options" && !empty( $value ) && isset( $field['name'] )) {
			do_action( 'wpml_register_single_string', self::CONTEXT, $field['name'], $value );
		}

		return $value;
	}

	public function maybe_remove_language_code( $post_id, $original_post_id = null ) {
		$current_language = apply_filters( "wpml_current_language", null );
		if ( $current_language && "options_" . $current_language === $post_id  ) {
			$post_id = "options";
		}

		return $post_id;
	}

	public function translate_field_value( $value, $post_id, $field ) {
		if ( in_array( $post_id, array("options", "option") ) && isset( $field['name'] ) ) {
			$value = apply_filters( 'wpml_translate_single_string', $value, self::CONTEXT, $field['name'] );
		}

		return $value;
	}
}