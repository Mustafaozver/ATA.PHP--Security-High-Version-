<?php
/*

ATA.PHP V3.0
Connected Module Apis

*/

// Setup
header("Access-Control-Allow-Origin: *");
$response = array();
$response["VERSION"] = $ata["clientside"]["VERSION"];
$response["TargetID"] = @$_POST["TargetID"];
$response["Time"] = $ata["Time"];
$response["API"] = "Connected Module APIs";

// Special Response
$response["Flags"] = array();
$response["Code"] = "";
$response["Method"] = $_SERVER['REQUEST_METHOD'];

$apiIndex = $myfolder."/Protected_UI/Pages/Dashboard/".@$PURLi[2]."/api.php";

if (!isset($PURLi[2])) $response["Error"] = "Connected Module is needed.";
else if (file_exists($apiIndex)) include($apiIndex);
else $response["Error"] = "Connected Module is not valid";

// Finish
echo json_encode($response);
?>