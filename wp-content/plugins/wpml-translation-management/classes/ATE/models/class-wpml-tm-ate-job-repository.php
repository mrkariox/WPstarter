<?php

class WPML_TM_ATE_Job_Repository {
	/** @var WPML_TM_Jobs_Repository */
	private $job_repository;

	/** @var WPML_TM_ATE_Job_Records */
	private $ate_job_records;

	/** @var TranslationManagement */
	private $tm_core;

	/**
	 * @param WPML_TM_Jobs_Repository $job_repository
	 * @param WPML_TM_ATE_Job_Records $ate_job_records
	 * @param TranslationManagement   $tm_core
	 */
	public function __construct(
		WPML_TM_Jobs_Repository $job_repository,
		WPML_TM_ATE_Job_Records $ate_job_records,
		TranslationManagement $tm_core
	) {
		$this->job_repository  = $job_repository;
		$this->ate_job_records = $ate_job_records;
		$this->tm_core         = $tm_core;
	}


	/**
	 * @return stdClass[]
	 */
	public function get_in_progress() {
		$jobs = $this->job_repository->get( new WPML_TM_Jobs_Search_Params( array(
			'scope'    => WPML_TM_Jobs_Search_Params::SCOPE_LOCAL,
			'status'   => self::get_in_progress_statuses(),
			'job_type' => WPML_TM_Job_Entity::POST_TYPE,
		) ) );

		return $jobs->filter( array( $this, 'is_ate_job' ) )->map( array( $this, 'convert_to_raw_tm_job' ) );
	}

	/**
	 * @param WPML_TM_Post_Job_Entity $job
	 *
	 * @return bool
	 */
	public function is_ate_job( $job ) {
		return (bool) $this->ate_job_records->get_ate_job_id( $job->get_translate_job_id() );
	}

	/**
	 * @param WPML_TM_Job_Entity $job
	 *
	 * @return stdClass[]
	 */
	public function convert_to_raw_tm_job( WPML_TM_Post_Job_Entity $job ) {
		return $this->tm_core->get_translation_job( $job->get_translate_job_id() );
	}

	/** @return array */
	public static function get_in_progress_statuses() {
		return array( ICL_TM_WAITING_FOR_TRANSLATOR, ICL_TM_IN_PROGRESS );
	}
}