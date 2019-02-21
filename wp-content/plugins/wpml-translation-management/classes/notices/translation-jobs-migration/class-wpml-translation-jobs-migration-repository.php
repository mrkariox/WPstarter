<?php

class WPML_Translation_Jobs_Migration_Repository {

	private $jobs_repository;

	public function __construct( WPML_TM_Jobs_Repository $jobs_repository ) {
		$this->jobs_repository = $jobs_repository;
	}

	public function get() {
		return $this->jobs_repository->get( $this->get_params() )->getIterator()->getArrayCopy();
	}

	public function get_count() {
		return $this->jobs_repository->get_count( $this->get_params() );
	}

	private function get_params() {
		$params = new WPML_TM_Jobs_Search_Params();
		$params->set_scope( WPML_TM_Jobs_Search_Params::SCOPE_REMOTE );
		$params->set_tp_id( null );

		return $params;
	}
}