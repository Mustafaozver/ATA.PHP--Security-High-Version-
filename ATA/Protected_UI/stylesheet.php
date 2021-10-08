<?php

use MatthiasMullie\Minify;
require_once(__DIR__."/minify/src/Minify.php");
require_once(__DIR__."/minify/src/CSS.php");
//require_once(__DIR__."/minify/src/JS.php");
//require_once(__DIR__."/minify/src/Exception.php");
require_once(__DIR__.'/path-converter/src/ConverterInterface.php');
require_once(__DIR__."/path-converter/src/Converter.php");
$sourcePath = __DIR__."/stylesheet.css";
$minifier = new Minify\CSS($sourcePath);
echo $minifier->minify();
?>