<?php
echo "lo";
/*
$_head->TITLE = "Dashboard - ATA.PHP";
$LINKdescription["content"] = "This is a page about me";
$LINKkeywords["content"] = "About, me";
$LINKtitle["content"] = "About Page";

AddExtraJSCode("$('.dashboard_border_containment').sortable({".
	"stop:function(){setTimeout(function(){var ord=[];"."$('.dashboard_border_containment dashboard_element').each(function() { ord.push($(this).id) });console.log(ord);},1);}".
"});");

$dashboardContainers = "";
$dashboardHeaders = "";
function AddDashboardContainer($body,$id="reg") {
	global $dashboardContainers;
	$dashboardContainers .= "".
	"<div class=\"col-md-3 col-5 dashboard_element\" id=\"dashboard_element_".$id."\">".
		"<div class=\"card\">".$body.
		"</div>".
	"</div>";
}

function AddDashboardHeader($body,$id="reg") {
	global $dashboardHeaders;
	$dashboardHeaders .= "".
	"<div class=\"col-sm-6 col-md-6 col-lg-2 mt-1 ml-1\">".
		"<div class=\"card bg-light\">".$body.
		"</div>".
	"</div>";
}

$url2 = $myfolder."/pages/sppage/";
$folder2 = opendir($url2);
while (($file2 = readdir($folder2)) !== false) {
	if (file_exists($url2.$file2."/dashboard.php")) include($url2.$file2."/dashboard.php");
}
closedir($folder2);


	/*AddDashboardContainer("".
		"<img class=\"card-img-top\" src=\"https://www.w3schools.com/bootstrap4/img_avatar3.png\" alt=\"Card image\">".
		"<div class=\"card-body\">".
			"<h4 class=\"card-title\">John Doe</h4>".
			"<p class=\"card-text\">Some example text.</p>".
			"<a href=\"#\" class=\"btn btn-primary\">See Profile</a>".
		"</div>"
	);*/



?>