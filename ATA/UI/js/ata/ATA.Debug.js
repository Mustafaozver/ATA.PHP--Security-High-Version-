////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Debugging Library Version 1.0
	
*/
if (typeof ATA === "undefined") throw new Error("ATA.JS is needed for this library");


/*
		log:	[Function],
		debug:	[Function],
		info:	[Function],
		dir:	[Function],
		dirxml:	[Function],
		warn:	[Function],
		error:	[Function],
		assert:	[Function],
		count:	[Function],
		countReset:	[Function],
		table:	[Function],
		time:	[Function],
		timeLog:	[Function],
		timeEnd:	[Function],
		group:	[Function],
		groupCollapsed:	[Function],
		groupEnd:	[Function],
		clear:	[Function],
		trace:	[Function],
		indentLevel:	0,
		Symbol(isConsoleInstance)
*/

var tempF = console.log;

ATA.alert = function(mode,args) {
	switch((""+args).toUpperCase()) {
		default:
		case "LOG":
		case "ALERT":
		case "WARN":
		case "ERROR":
		case "ASSERT":
		case "DEBUG":
			tempF(args);
		break;
	}
};

if (!ATA.isMobile) Object.assign(console,{
	log:function() {
		ATA.alert("LOG",arguments);
	},
	warn:function() {
		ATA.alert("WARN",arguments);
	},
	error:function() {
		ATA.alert("ERROR",arguments);
	},
	assert:function() {
		ATA.alert("ASSERT",arguments);
	},
	debug:function() {
		ATA.alert("DEBUG",arguments);
	},
});