<?php

if (@$ata["Session"]["_WHO"] == 1) {
	$ata["Session"]["User"] = ReadRows("Users", "ID='".$_SESSION["ID"]."'");
	$ata["Session"]["ID"] = "XAU".$ata["Session"]["User"]["ID"];
} else {
	$ata["Session"]["ID"] = $ata["Domain"]."_ATA";
}

?>