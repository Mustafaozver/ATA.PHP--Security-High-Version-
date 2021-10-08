require("./ata/index");

ATA.Loops.push(function(t) {
	console.log(t, ATA.About());
});
ATA.Setup();
