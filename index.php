<?php
/*

ATA.PHP V3.0

Çalışma sisteminin ana dosyasıdır
Gerekli ve önemli değilse değişlik yapmayın.

*/

// System setup
$myfolder = "ATA";
include($myfolder."/setup.php");
include($myfolder."/settings.php");
include($myfolder."/libraries.php");

// Database setup
include($myfolder."/database.php");

// Session setup
if ($ata["Session"]["active"]) include($myfolder."/session.php");

// DataSets
include($myfolder."/datasets.php");

// Addons Setup
$folder = opendir($addons);
while (($file = readdir($folder)) !== false) {
	if (file_exists($addons.$file."/index.php")) include($addons.$file."/index.php");
}
closedir($folder);

// Language setup
$ata["Lang"] = $DSets->ReadCookie("Lang","EN");
include($myfolder."/Langs/".$ata["Lang"].".php");

// Page system setup
$ata["URLsPs"] = parse_url($_SERVER["REQUEST_URI"]);
$PURLi = explode("/",substr($ata["URLsPs"]["path"],1));
if ($PURLi[0] != "" && file_exists($myfolder."/UI".$_SERVER["REQUEST_URI"])) {
	if (is_dir($myfolder."/UI".$_SERVER["REQUEST_URI"])) {
		if ($ata["ShowFolders"]) include($myfolder."/folders.php");
	} else {
		include($myfolder."/files.php");
	}
} else switch(strtoupper($PURLi[0])) {
	// pages for the system core
	case "API":
		include($myfolder."/APIs/index.php");
	break;
	case "ROUTER":
		include($myfolder."/router/index.php");
	break;
	case "OUT":
		include($myfolder."/out/index.php");
	break;
	/*
	case "RSS": // cancelled !
		include($myfolder."/rss/index.php");
	break;
	case "DOWNLOAD": // cancelled !
		include($myfolder."/download/index.php");
	break;
	case "GO": // cancelled !
		include($myfolder."/go/index.php");
	break;
	*/
	// pages and files for users
	default:
	case "": // building a page
		include($myfolder."/UI/ROOT.php");
	break;
};

// Finish
include($myfolder."/closer.php");
?>