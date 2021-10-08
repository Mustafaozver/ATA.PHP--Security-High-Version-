<?php
/*

Verify session

*/

if ($ata["Session"]["active"]) {
	$session_name = $ata["Session"]["Name"];
	$ata["clientside"]["SessionName"] = $session_name;
	$ata["clientside"]["Session"] = array();
	$ata["clientside"]["Session"]["EMail"] = "".@$ata["Session"]["EMail"];
	session_start();
	if (isset($_SESSION[$session_name])) {
		if (RunQuery("SELECT * FROM Users WHERE ID='".$_SESSION["ID"]."' AND EMail='".$_SESSION["EMail"]."' AND Password='".$_SESSION["Password"]."'")->num_rows == 1) {
			$ata["Session"]["ID"] = $_SESSION["ID"];
			$ata["Session"]["EMail"] = $_SESSION["EMail"];
			$ata["Session"]["Password"] = $_SESSION["Password"];
			$ata["Session"]["_WHO"] = 1;
			$_SESSION[$session_name] = 1;
			unset($ata["clientside"]["SessionName"]);
			$ata["clientside"]["Session"] = array();
			$ata["clientside"]["Session"]["EMail"] = "".@$ata["Session"]["EMail"];
			$ata["Session"]["User"] = ReadRows("Users", "ID='".$_SESSION["ID"]."'");
		} else {
			$ata["Session"]["_WHO"] = -1;
			unset($_SESSION["ID"]);
			unset($_SESSION["EMail"]);
			unset($_SESSION["Password"]);
			unset($_SESSION[$session_name]);
			session_unset();
			session_destroy();
			header("Location: /");
		}
	} else {
		$ata["Session"]["ID"] = $ata["Domain"]."_ATA";
		$ata["Session"]["EMail"] = "";
		$ata["Session"]["Password"] = "";
		$ata["Session"]["_WHO"] = 0;
	}
}

?>