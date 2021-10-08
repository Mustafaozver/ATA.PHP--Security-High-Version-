<?php
if (count($PURLi) > 1) {
	$query = "Select * From Routers Where ID=\"".$PURLi[1]."\"";
	echo $query;
}
ob_flush();
ob_end_clean();
?>