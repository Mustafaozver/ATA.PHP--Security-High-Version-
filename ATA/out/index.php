<?php
if (count($PURLi) > 1) include($myfolder."/out/".$PURLi[1]."/index.php");
ob_flush();
ob_end_clean();
?>