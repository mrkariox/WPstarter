<?php

class WPML_TP_String_Job extends WPML_WPDB_User {

	/** @var  WPML_Translation_Basket $basket */
	private $basket;

	/** @var WPML_Translation_Job_Factory $job_factory */
	private $job_factory;

	/**
	 * WPML_TP_String_Job constructor.
	 *
	 * @param wpdb                         $wpdb
	 * @param WPML_Translation_Basket      $basket
	 * @param WPML_Translation_Job_Factory $job_factory
	 */
	public function __construct( &$wpdb, &$basket, &$job_factory ) {
		parent::__construct( $wpdb );
		$this->basket      = &$basket;
		$this->job_factory = &$job_factory;
	}

	function send_strings_to_translation_service( $string_ids, $target_language, $translator_id ) {
		/** @var WPML_String_Translation $WPML_String_Translation */
		global $WPML_String_Translation;

		if ( sizeof( $string_ids ) > 0 ) {
			$project         = $this->basket->get_project();
			$strings         = array();
			$word_count      = 0;
			$source_language = $this->basket->get_source_language();
			foreach ( $string_ids as $string_id ) {
				$string_data_query   = "SELECT id, context, name, value FROM {$this->wpdb->prefix}icl_strings WHERE id=%d";
				$string_data_prepare = $this->wpdb->prepare( $string_data_query, $string_id );
				$string_data         = $this->wpdb->get_row( $string_data_prepare );
				$word_count += $WPML_String_Translation->estimate_word_count( $string_data->value, $source_language );
				$strings[] = $string_data;
			}
			$xliff = new WPML_TM_Xliff_Writer( $this->job_factory );
			$tp_job_id   = $project->send_to_translation_batch_mode(
				$xliff->get_strings_xliff_file( $strings, $source_language, $target_language ),
				'String Translations',
				'',
				'',
				$source_language,
				$target_language,
				$word_count );

			if ( $tp_job_id ) {
				foreach ( $strings as $string_data ) {
					$translation_service = TranslationProxy_Service::get_translator_data_from_wpml( $translator_id );
					$string_translation_id               = icl_add_string_translation( $string_data->id,
						$target_language,
						null,
						ICL_TM_IN_PROGRESS,
						$translation_service['translator_id'],
						$translation_service['translation_service'],
						TranslationProxy_Batch::update_translation_batch(
							$this->basket->get_name() ) );
					if ( $string_translation_id ) {
						$data = array(
							'rid'                   => $tp_job_id,
							'string_translation_id' => $string_translation_id,
							'timestamp'             => date( 'Y-m-d H:i:s' ),
							'md5'                   => md5( $string_data->value ),
						);

						$current_rid = $this->wpdb->get_var(
							$this->wpdb->prepare(
								"SELECT rid FROM {$this->wpdb->prefix}icl_string_status WHERE string_translation_id=%d",
								$string_translation_id
							)
						);
						if ( $current_rid ) {
							$this->wpdb->update( $this->wpdb->prefix . 'icl_string_status', $data, array( 'rid' => $current_rid ) );
						} else {
							$this->wpdb->insert( $this->wpdb->prefix . 'icl_string_status', $data ); //insert rid
						}

					}
				}

				$data   = array(
					'rid'    => $tp_job_id,
					'module' => '',
					'origin' => $source_language,
					'target' => $target_language,
					'status' => ICL_TM_IN_PROGRESS
				);
				if ( ! empty ( $current_rid ) ) {
					$data['ts_status'] = null;
					$this->wpdb->update( $this->wpdb->prefix . 'icl_core_status', $data, array( 'rid' => $current_rid ) );
				} else {
					$this->wpdb->insert( $this->wpdb->prefix . 'icl_core_status', $data );
				}

				if ( $project->errors && count( $project->errors ) ) {
					$tp_job_id['errors'] = $project->errors;
				}

				return $tp_job_id;
			}
		}

		return 0;
	}
}