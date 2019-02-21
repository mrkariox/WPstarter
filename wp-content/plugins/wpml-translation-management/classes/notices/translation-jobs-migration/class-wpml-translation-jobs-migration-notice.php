<?php

class WPML_Translation_Jobs_Migration_Notice {

	const NOTICE_ID       = 'translation-jobs-migration';
	const NOTICE_GROUP_ID = 'translation-jobs';
	const TEMPLATE        = 'translation-jobs-migration.twig';

	private $admin_notices;
	private $template_service;

	public function __construct( WPML_Notices $admin_notices, IWPML_Template_Service $template_service ) {
		$this->admin_notices    = $admin_notices;
		$this->template_service = $template_service;
	}

	/**
	 * @param WPML_Notices $wpml_admin_notices
	 */
	public function add_notice() {
		$notice = $this->admin_notices->create_notice( self::NOTICE_ID, $this->get_notice_content(), self::NOTICE_GROUP_ID );
		$notice->set_css_class_types( 'notice-error' );
		$this->admin_notices->add_notice( $notice );
	}

	public function remove_notice() {
		$this->admin_notices->remove_notice( self::NOTICE_GROUP_ID, self::NOTICE_ID );
	}

	public function exists() {
		return (bool) $this->admin_notices->get_notice( self::NOTICE_ID, self::NOTICE_GROUP_ID );
	}

	private function get_notice_content() {
		return $this->template_service->show( $this->get_model(), self::TEMPLATE );
	}

	private function get_model() {
		return array(
			'strings' => array(
				'title'         => __( 'WPML Translation Jobs Migration', 'sitepress' ),
				'description'   => __( 'WPML found some remote jobs on your site that must be migrated in order to work with WPML ' . ICL_SITEPRESS_VERSION . '. You might not be able to access some of the WPML administration pages until this migration is fully completed.', 'sitepress' ),
				'button'        => __( 'Run now', 'sitepress' ),
				'of'            => __( 'of', 'sitepress' ),
				'jobs_migrated' => __( 'jobs migrated', 'sitepress' ),
			),
			'nonce' => wp_nonce_field( WPML_Translation_Jobs_Migration_Ajax::ACTION, WPML_Translation_Jobs_Migration_Ajax::ACTION, false, false ),
		);
	}
}