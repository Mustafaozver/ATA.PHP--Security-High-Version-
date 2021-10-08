<?php
$html_ui = Array();
$html_ui2 = Array();
$html_ui["FA_icon"] = function($type) {
	return "<I class=\"fa fa-".$type."\"></I>";
};

$html_ui["BS_btn"] = function($innerHTML, $classnames) {
	return "<BUTTON type=\"button\" class=\"btn ".$classnames."\">".$innerHTML."</BUTTON>";
};

$html_ui["BS_badge"] = function($innerHTML, $type) {
	return "<SPAN class=\"badge badge-".$type."\">".$innerHTML."</SPAN>";
};

$html_ui2["BS_card"] = function($title,$img,$innerHTML,$innerHTML2) {
	return "".
	"<div class=\"col-md-12\">".
		"<div class=\"row\">".
			"<div class=\"col-md-12\">".
				"<div class=\"card\">".
					(count($img)>0?"<img class=\"card-img-top\" src=\"".$img."\">":"").
					(count($title)>0?"<h5 class=\"card-header\">".$title."</h5>":"").
					"<div class=\"card-body\">".
						"<p class=\"card-text\">".$innerHTML."</p>".
					"</div>".
					(count($innerHTML2)>0?"<div class=\"card-footer\">".$innerHTML2."</div>":"").
				"</div>".
			"</div>".
		"</div>".
	"</div>";
};

$html_ui["BS_alert"] = function($title, $innerHTML, $type) {
	return "<div class=\"alert alert-".$type."\"><h5 class=\"alert-title\">".$title."</h5>".$innerHTML."</div>";
};

?>