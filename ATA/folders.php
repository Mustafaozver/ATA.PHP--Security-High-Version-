<html>
 <head>
  <style>
.header {
	font-size:1.5em;
}
.item {
	font-size:1.2em;
}
  </style>
 </head>
 <body>
  <h1><?php echo $_SERVER["REQUEST_URI"];?> Files</h1>
  <table>
   <tr class="header"><td>Name</td><td>Size</td></tr><?php
$folderurl = $myfolder."/UI".$_SERVER["REQUEST_URI"];
$folder = opendir($folderurl);
while (($file = readdir($folder)) !== false) {
	if ($file == "." || $file == "..") continue;
	?>
   <tr class="item"><td><?php echo $file ?></td><td><?php echo filesize($folderurl."/".$file); ?></td></tr><?php
}
closedir($folder);
?>
  </table>
 </body>
</html>