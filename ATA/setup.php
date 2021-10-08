<?php
/*
Çalışma sisteminin kurulum dosyasıdır
Gerekli ve önemli değilse değişlik yapmayın.
*/
$ata = array();
$ata["Langs"] = array("TR","EN");
$ata["Lang"] = "TR";
$ata["mobile"] = preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
$ata["Domain"] = "www.sitem.com";
$ata["ShowFolders"] = false;
$ata["Session"] = array();
$ata["Session"]["Name"] = "SESSION1";
$ata["Session"]["active"] = true;
$ata["AddonsUrls"] = array();

$ata["database"] = array();
$ata["database"]["HOST"] = "localhost";
$ata["database"]["user"] = "root";
$ata["database"]["password"] = "";
$ata["database"]["name"] = "deneme";

$ata["Page"] = array();
$ata["Page"]["Head"] = "";
$ata["Page"]["Header"] = "";
$ata["Page"]["Content"] = "";
$ata["Page"]["Footer"] = "";
$ata["Time"] = time();

$addons = $myfolder."/addons/";

?>