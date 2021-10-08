<?php

function RandomString($len) {
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$randstring = '';
	for ($i = 0; $i < $len; $i++) $randstring = $characters[rand(0, strlen($characters))];
	return $randstring;
}

class Manifest {
	public $__Manifest_;
	public function __construct($file){
		$this->__Manifest_ = json_decode(file_get_contents($file),true);
		$items = explode("/",$file);
		$items[sizeof($items) - 1] = "";
		$this->URL = implode("/",$items);
	}
	public function ReadValue($val){
		if (isset($this->__Manifest_["".$val])) return $this->__Manifest_["".$val];
		else return false;
	}
	public function IncludeFile($file){
		include(($this->URL)."/".($this->ReadValue($file)));
	}
}

?>