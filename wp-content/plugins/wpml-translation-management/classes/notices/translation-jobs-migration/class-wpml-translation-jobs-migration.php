<?php

class WPML_Translation_Jobs_Migration {

	const MIGRATION_DONE_KEY = 'wpml-tm-translation-jobs-migration';

	private $jobs_repository;
	private $cms_id_builder;
	private $wpdb;
	private $jobs_api;

	public function __construct(
		WPML_Translation_Jobs_Migration_Repository $jobs_repository,
		WPML_TM_CMS_ID $cms_id_builder,
		wpdb $wpdb,
		WPML_TP_Jobs_API $jobs_api
	) {
		$this->jobs_repository = $jobs_repository;
		$this->cms_id_builder  = $cms_id_builder;
		$this->wpdb            = $wpdb;
		$this->jobs_api        = $jobs_api;
	}

	public function migrate_jobs( array $jobs ) {
		$mapped_jobs = $this->map_cms_id_job_id( $jobs );

		if ( $mapped_jobs ) {
			try {
				$tp_jobs = $this->jobs_api->get_jobs_per_cms_ids( array_values( $mapped_jobs ), true );
			} catch ( Exception $e ) {
				$tp_jobs = array();
			}

			foreach ( $jobs as $job ) {
				$cms_id = array_key_exists( $job->get_id(), $mapped_jobs ) ? $mapped_jobs[ $job->get_id() ] : '';
				list( $tp_id, $revision_id ) = $this->get_tp_id_revision_id( $cms_id, $tp_jobs );
				$this->fix_job_tp_id_revision_id( $tp_id, $revision_id, $job->get_id() );
			}
		}
	}

	/**
	 * @param int $cms_id
	 * @param array $tp_jobs
	 *
	 * @return array
	 */
	private function get_tp_id_revision_id( $cms_id, $tp_jobs ) {
		$tp_id = 0;
		$revision_id = 0;

		foreach ( $tp_jobs as $tp_job ) {
			if ( $tp_job->cms_id === $cms_id ) {
				$tp_id = $tp_job->id;
				$revision_id = $tp_job->translation_revision;

				break;
			}
		}

		return array( $tp_id, $revision_id );
	}

	/**
	 * @param int $tp_id
	 * @param int $revision_id
	 * @param int $job_id
	 */
	private function fix_job_tp_id_revision_id( $tp_id, $revision_id, $job_id ) {
		$this->wpdb->update(
			$this->wpdb->prefix . 'icl_translation_status',
			array( 'tp_id' => $tp_id, 'tp_revision' => $revision_id ),
			array( 'rid' => $job_id )
		);
	}

	/**
	 * @param array $jobs
	 *
	 * @return array
	 */
	private function map_cms_id_job_id( $jobs ) {
		$mapped_jobs = array();

		foreach ( $jobs as $job ) {
			$cms_id                 = $this->cms_id_builder->cms_id_from_job_id( $job->get_id() );
			$mapped_jobs[ $job->get_id() ] = $cms_id;
		}

		return $mapped_jobs;
	}

	/**
	 * @return bool
	 */
	public static function is_migrated() {
		return (bool) get_option( self::MIGRATION_DONE_KEY );
	}

	public static function mark_migration_as_done() {
		update_option( self::MIGRATION_DONE_KEY, 1 );
	}
}