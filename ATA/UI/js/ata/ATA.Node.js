////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Compatibility Pack for Node.JS Version 1.0
	
*/
if (typeof ATA === "undefined") throw new Error("ATA.JS is needed for this library");
if (!ATA.isNode) throw new Error("This library is only for Node.JS");

ATA.Root.Global = eval("this");
ATA.Root.Location = __dirname;

ATA.Exit = function() {
	process.exit();
};