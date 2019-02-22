<?php

class WPML_TM_Jobs_Date_Range {
	/** @var DateTime|null */
	private $begin;

	/** @var DateTime|null */
	private $end;

	/**
	 * @param DateTime|null $begin
	 * @param DateTime|null $end
	 */
	public function __construct( DateTime $begin = null, DateTime $end = null ) {
		$this->begin = $begin;
		$this->end   = $end;
	}

	/**
	 * @return DateTime|null
	 */
	public function get_begin() {
		return $this->begin;
	}

	/**
	 * @return DateTime|null
	 */
	public function get_end() {
		return $this->end;
	}
}