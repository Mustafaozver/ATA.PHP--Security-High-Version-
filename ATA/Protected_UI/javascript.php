<?php

//echo "alert(\"". addslashes(__DIR__) ."\");";
use MatthiasMullie\Minify;
require_once(__DIR__."/minify/src/Minify.php");
require_once(__DIR__."/minify/src/JS.php");
require_once(__DIR__."/minify/src/Exception.php");

try {
	$content = file_get_contents(__DIR__."/javascript.js");
    $minifier = new Minify\JS($content);
    echo $minifier->minify();
} catch (Exception $e) {
	echo "console.log(\"System not\");";
}

?>