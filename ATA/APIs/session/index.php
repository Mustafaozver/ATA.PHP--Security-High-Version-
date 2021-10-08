<?php
/*

ATA.PHP V3.0
Örnek API dosyası

*/

// Setup
$response = array();
$response["VERSION"] = $ata["clientside"]["VERSION"];
$response["TargetID"] = @$_REQUEST["TargetID"];
$response["Time"] = $ata["Time"];
$response["API"] = "Session API by ATA.PHP";

if ($ata["Session"]["active"]) {
	// Special Response
	$response["Flags"] = array();
	$response["Code"] = "";
	$response["Method"] = $_SERVER['REQUEST_METHOD'];
	// temp
	$response["Code"] .= file_get_contents($myfolder."/APIs/".$PURLi[1]."/js.js");
	$session_name = $ata["Session"]["Name"];

	if (isset($_REQUEST["Task"])) {
		switch(@$_REQUEST["Task"]) {
			case "SINGIN":
				if (isset($_POST["EMail"]) && isset($_POST["Password"])) {
					$EMail = "".@$_POST["EMail"];
					$Password = hash('ripemd160',@$_POST["Password"]);
					$result = ReadRows("Users", "EMail='".$EMail."' AND Password='".$Password."'");
					if (isset($result["ID"])) {
						$_SESSION["ID"] = $result["ID"];
						$_SESSION["EMail"] = $result["EMail"];
						$_SESSION["Password"] = $result["Password"];
						$_SESSION[$session_name] = 1;
						$response["Code"] .= "ATA.GoURL('/admin');";
					} else $response["Error"] = "User name or password is wrong!";//.$Password;
				}
			break;
			case "SINGOUT":
				$ata["Session"]["_WHO"] = -1;
				unset($_SESSION["ID"]);
				unset($_SESSION["EMail"]);
				unset($_SESSION["Password"]);
				unset($_SESSION[$session_name]);
				session_unset();
				session_destroy();
			break;
			case "RESET":
			break;
			case "VERIFY":
			break;
			default:
			break;
		}
	} else if ($response["Method"] == "GET") {
		if (isset($PURLi[2])) {
			switch (strtoupper($PURLi[2])) {
				case "SINGOUT":
					$ata["Session"]["_WHO"] = -1;
					unset($_SESSION["ID"]);
					unset($_SESSION["EMail"]);
					unset($_SESSION["Password"]);
					unset($_SESSION[$session_name]);
					session_unset();
					session_destroy();
				break;
			}
		}
	}
} else $response["Error"] = "Session is not valid";
// Finish
echo json_encode($response);
exit();
?>