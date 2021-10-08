<?php
/*

ATA.PHP V3.0
Örnek API dosyası

*/

// Setup
$response = array();
$response["VERSION"] = $ata["clientside"]["VERSION"];
$response["TargetID"] = @$_POST["TargetID"];
$response["Time"] = $ata["Time"];
$response["API"] = "0 Sample API";

// Special Response
$response["Flags"] = array();
$response["Code"] = "";
$response["Method"] = $_SERVER['REQUEST_METHOD'];
// temp
$response["Code"] .= "console.log(\"Sistem Cevabı\");";
$response["Code"] .= "console.log(ATA.Flags);";
$response["Code"] .= file_get_contents($myfolder."/APIs/".$PURLi[1]."/js.js");

$Parameters = array();
foreach ($_REQUEST as $param => $value) {
	if ($param == "date" || 
	$param == "TargetID" ||
	$param == "Method" ||
	$param == "STableName") continue;
	$Parameters["".$param] = $value;
}

$tablename = "";
$Method = "";
if (count($PURLi) > 2) {
	$tablename = $PURLi[2];
	$Method = $_SERVER['REQUEST_METHOD'];
} else if (isset($_REQUEST["Method"])) {
	$tablename = $_REQUEST["STableName"];;
	$Method = $_REQUEST["Method"];
}
switch($Method) {
	case "POST":
		if (!isset($Parameters["ID"])) {
			$response["Flags"]["STableName"] = $tablename;
			if (!AddRow($Parameters,$tablename)) $response["Error"] = "Database error!";
			else $response["Flags"]["ID"] = GetLastID();
			break;
		}
	case "GET":
		if (isset($Parameters["ID"])) $response["Flags"] = GetRow("0".$Parameters["ID"], $tablename);
		else $response["Error"] = "Database error!";
		break;
	case "DELETE":
		$where = "1";
		if (isset($Parameters["ID"])) $where = "ID=\"".$Parameters["ID"]."\"";
		if (!DeleteRow($tablename, $where)) $response["Error"] = "Database error!";
	case "UPDATE":
		if (!UpdateRow($Parameters,$tablename)) $response["Error"] = "Database error!";
		else $response["Flags"]["ID"] = GetLastID();
		break;
	//
	case "PUT":
	case "PATCH":
	case "COPY":
	case "OPTIONS":
	case "LINK":
	case "UNLINK":
	case "PURGE":
	case "LOCK":
	case "UNLOCK":
	case "PROPFIND":
	case "VIEW":
	default:
	break;
}

// Finish
echo json_encode($response);
exit();
?>