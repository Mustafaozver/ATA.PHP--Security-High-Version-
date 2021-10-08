<DIV id="ATA_contentarea" class="ATA_contentarea"><?php

if ($onthemainpage) {
	include($myfolder."/UI/Pages/ATAMain.php");
} else {
	if (file_exists($myfolder."/UI/Pages".$ata["URLsPs"]["path"].".php")) {
		include($myfolder."/UI/Pages".$ata["URLsPs"]["path"].".php");
	} else if (file_exists($myfolder."/UI/Pages".$ata["URLsPs"]["path"]."/index.php")) {
		include($myfolder."/UI/Pages".$ata["URLsPs"]["path"]."/index.php");
	} else {
		if (isset($ata["DBPage"]["ID"])) {
			include($myfolder."/UI/Pages/index.php");
		} else include($myfolder."/UI/Pages/Errors/404.php");
	}
}

?>

<BR/>
<BR/>
<i>
<?php
echo $loremipsum;

?>
</i>
<BR/>
<BR/>
</DIV>