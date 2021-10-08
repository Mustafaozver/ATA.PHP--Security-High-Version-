<?php
if (isset($_REQUEST["Task"])) switch(strtoupper($_REQUEST["Task"])) {
	default:
	case "":
		$response["Code"] .= "if (ATA.Modules.Messages) ATA.Modules.Messages.Error();";
	break;
	case "GET":
		$id = $_REQUEST["ID"]?$_REQUEST["ID"]:0; // There is not a message where id = 0
		$response["Flags"]["Messages"] = ReadRows("Messages", "ID='".$id."'");
		$response["Code"] .= "if (ATA.Modules.Messages) ATA.Modules.Messages.OpenMessage();";
	break;
}
else $response["Error"] = "No Task";
?>