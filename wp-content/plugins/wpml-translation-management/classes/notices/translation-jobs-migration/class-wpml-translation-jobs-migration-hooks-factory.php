<?php

class WPML_Translation_Jobs_Migration_Hooks_Factory implements IWPML_Backend_Action_Loader, IWPML_AJAX_Action_Loader {

	/**
	 * @return null|WPML_Translation_Jobs_Migration_Hooks
	 */
	public function create() {
		if ( WPML_Translation_Jobs_Migration::is_migrated() ) {
			return null;
		}

		$template_service = new WPML_Twig_Template_Loader( array( WPML_TM_PATH . '/templates/translation-jobs-migration/' ) );
		$notice           = new WPML_Translation_Jobs_Migration_Notice( wpml_get_admin_notices(), $template_service->get_template() );

		$jobs_migration_repository = new WPML_Translation_Jobs_Migration_Repository( wpml_tm_get_jobs_repository() );

		global $wpml_post_translations, $wpml_term_translations, $wpdb;

		$job_factory     = wpml_tm_load_job_factory();
		$wpml_tm_records = new WPML_TM_Records( $wpdb, $wpml_post_translations, $wpml_term_translations );
		$cms_id_helper   = new WPML_TM_CMS_ID( $wpml_tm_records, $job_factory );
		$jobs_migration  = new WPML_Translation_Jobs_Migration( $jobs_migration_repository, $cms_id_helper, $wpdb, wpml_tm_get_tp_jobs_api() );
		$ajax_handler    = new WPML_Translation_Jobs_Migration_Ajax( $jobs_migration, $jobs_migration_repository );
		$schema          = wpml_get_upgrade_schema();

		return new WPML_Translation_Jobs_Migration_Hooks( $notice, $ajax_handler, $jobs_migration_repository, $schema );
	}
}