////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Compatibility Pack for Deno Version 1.0
	
*/

ATA.Root.Global = false;
ATA.Root.Location = Deno.cwd();
ATA.Root.Params = {
	Deno:Deno,
	window:window
};

ATA.Exit = function() {
	Deno.close();
};