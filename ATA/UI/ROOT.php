<?php
header("Content-type: text/html");
header("HTTP/1.1 200 OK");
$onthemainpage = strtolower($PURLi[0]) == $ata["Lang"]["mainpage"] || $PURLi[0] == "";
include($myfolder."/UI/html_libraries.php");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<?php
include($myfolder."/UI/html.php");
ob_flush();
ob_end_clean();
?>