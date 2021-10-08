<?php
header("Content-Type: application/json");
if (count($PURLi) > 1) {
	$apifile = $myfolder."/APIs/".$PURLi[1]."/index.php";
	if (file_exists($apifile)) include($apifile);
	else {
		$response = array();
		$response["VERSION"] = $ata["clientside"]["VERSION"];
		$response["TargetID"] = @$_POST["TargetID"];
		$response["Error"] = "API not found!";
		$response["Time"] = $ata["Time"];
		echo json_encode($response);
	}
}
ob_flush();
ob_end_clean();
?>