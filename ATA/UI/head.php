<?php
$ata["DBPage"] = $DB->ReadRows("Pages", "URL='".$ata["URLsPs"]["path"]."'");
?>
<HEAD>
<META genetator="ATA.PHP V3" />
<META charset="UTF-8" />
<META http-equiv="Content-Type" content="text/html; charset=windows-1254" />
<META http-equiv="Content-Type" content="text/html; charset=iso-8859-9" />
<META http-equiv="Content-Type" content="text/html; charset=x-mac-turkish" />
<META name="viewport" content="width=device-width, initial-scale=1" />
<LINK rel="canonical" href="localhost" />
<LINK rel="shortcut icon" href="/favicon.ico" />
<LINK title="RSS" rel="alternate" type="application/rss+xml" href="/rss" />
<LINK name="title" content="ATA.PHP V3.0" />
<LINK name="description" content="a system based on ATA.PHP V3.0" />
<LINK name="keywords" content="ATA.PHP, V3.0, ATA.JS" />
<LINK name="author" content="Marcus Mustafa OZVER" />
<LINK name="owner" content="Marcus Mustafa OZVER" />
<LINK name="copyright" content="(C) 2020" />
<LINK rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,700,600,300" />
<LINK rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
<LINK rel="stylesheet" type="text/css" href="/css/bootstrap-grid.min.css" />
<LINK rel="stylesheet" type="text/css" href="/css/bootstrap-reboot.min.css" />
<LINK rel="stylesheet" type="text/css" href="/css/font-awesome.min.css" />
<LINK rel="stylesheet" type="text/css" href="/css/css.css" />
<STYLE>
<?php
include($myfolder."/Protected_UI/stylesheet.php");
?>
</STYLE>
<SCRIPT type="text/javascript" src="/js/ata/index.js"></SCRIPT>
<SCRIPT type="text/javascript" src="/js/jquery.min.js"></SCRIPT>
<SCRIPT type="text/javascript" src="/js/jquery.form.js"></SCRIPT>
<SCRIPT type="text/javascript" src="/js/jquery-ui.js"></SCRIPT>
<SCRIPT type="text/javascript" src="/js/bootstrap.min.js"></SCRIPT>
<SCRIPT type="text/javascript" src="/js/bootstrap.bundle.min.js"></SCRIPT>
<SCRIPT type="text/javascript" src="/js/Chart.min.js"></SCRIPT>
<SCRIPT type="text/javascript">
<?php
foreach($html_ui as $key=>$value) {
	echo "function ".$key."(){".
		"var args=[];".
		"for (var i=0;i<arguments.length;i++)args.push(arguments[i]);".
		"return \"".(implode("\"+args.splice(0,1)+\"",explode("ATA_ATA",addslashes($value("ATA_ATA","ATA_ATA","ATA_ATA","ATA_ATA")))))."\"".
	"};";
}
echo ";";
include($myfolder."/Protected_UI/javascript.php");
?>
</SCRIPT>
<TITLE></TITLE></HEAD>