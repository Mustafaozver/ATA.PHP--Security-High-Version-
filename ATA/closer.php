<?php

$DB->AddRow(array(
	"Time" => $ata["Time"],
	"IP" => $_SERVER['REMOTE_ADDR'],
	"URL" => $_SERVER["REQUEST_URI"],
	"Method" => $_SERVER['REQUEST_METHOD']
), "Reports");

mysqli_close($_db);
?>