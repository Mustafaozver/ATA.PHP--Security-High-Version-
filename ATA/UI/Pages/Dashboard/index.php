<SCRIPT>
ATA.Modules = {};
</SCRIPT><?php
/*
$ ReadRows("Dash", "ID='".$_SESSION["ID"]."'");
*/

$Dashboardurl = $myfolder."/Protected_UI/Pages/Dashboard";
$Dashboardfolder = opendir($Dashboardurl);
while (($file = readdir($Dashboardfolder)) !== false) {
	if ($file == "." || $file == "..") continue;
	$Dashboardfolderurl = $Dashboardurl."/".$file;
	if (!is_dir($Dashboardfolderurl)) continue;
	if (file_exists($Dashboardfolderurl."/manifest.json")) $DashBoardManifests = new Manifest($Dashboardfolderurl."/manifest.json");
	else continue;
	if ($DashBoardManifests->ReadValue("Dashboard")) $DashBoardManifests->IncludeFile("Dashboard");
}
closedir($Dashboardfolder);
?>