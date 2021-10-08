<?php

if (@$ata["Session"]["_WHO"] == 1) {
	$ata["Company"] = ReadRows("Company", "ID='".$ata["Session"]["User"]["CompanyID"]."'");
	if (!isset($ata["Company"]["ID"])) unset($ata["Company"]);
}

?>