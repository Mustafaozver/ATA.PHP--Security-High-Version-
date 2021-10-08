/*

 ATA.js V5.0 Beta

*/

if (typeof ATA === "undefined") if (eval) eval("if (typeof this !== 'undefined') this.ATA = new Object();");
if (typeof ATA === "undefined") if (typeof window !== "undefined") window.ATA = new Object();
if (typeof ATA === "undefined") if (typeof global !== "undefined") global.ATA = new Object();
if (typeof ATA === "undefined") if (typeof process !== "undefined") process.ATA = new Object();
if (typeof ATA === "undefined") if (typeof Object !== "undefined") Object.ATA = new Object();

Object.assign(ATA,{
	// Parameters
	loopTime:1000,
	timeoutCheck:null,
	Setups:[],
	Loops:[],
	isDebug:false,
	// Detections
	isBrowser:(typeof window !== "undefined") && (typeof Deno === "undefined"),
	isDeno:(typeof Deno !== "undefined"),
	isNode:(typeof process !== "undefined"),
	isAsync:(typeof Promise !== "undefined"),
	isMobile:false,
	// Objections
	Register:{
		Set:function(name,value){
			this[this.GetSymbolSingular(name)] = value;
		},
		Get:function(name){
			return this[this.GetSymbolSingular(name)];
		},
		GetKeySingular:function(sym){
			return Symbol.keyFor(sym);
		},
		GetSymbolSingular:function(name){
			return Symbol.for(""+name);
		}
	},
	Libraries:{
		Base:".",
		Needs:[],
		Extendeds:{},
		Extend:function(name){
			this.Extendeds[name] = ATA.Include(this.Base + "/ATA." + name + ".js");
			return this.Extendeds[name];
		}
	},
	Timer:{
		time:(new Date()).getTime(),
		getTime:function() {
			return ((new Date()).getTime() - this.time)/1000;
		},
		reset:function() {
			this.time = (new Date()).getTime();
		}
	},
	
	// Functions
	CheckSystem:function() { // Check system
		if (this.Setups.length > 0) {
			this.Setup();
			return;
		}
		this.Loop();
		this.timeoutCheck = setTimeout(function(){ATA.CheckSystem()},this.loopTime);
	},
	Setup:function() { // Setup function
		for (var i=0;i<this.Setups.length;i++) {
			try {
				this.Setups[i]();
			} catch (e) {
				console.warn(e,this.Setups[i],i);
			}
		}
		this.Setups = [];
		this.CheckSystem();
	},
	Loop:function() {
		var newdate = new Date();
		for (var i=0;i<this.Loops.length;i++) {
			try {
				this.Loops[i](newdate);
			} catch (e) {
				console.warn(e);
			}
		}
	},
	Include:function(url) {
		try {
			if (this.isBrowser) {
				var script = document.createElement("SCRIPT");
				script.src = "" + url;
				document.head.append(script);
				return script;
			} else if (this.isNode) {
				return require("" + url);
			} else if (this.isDeno) {
				var decoder = new TextDecoder("utf-8");
				var codes = decoder.decode(Deno.readFileSync("" + url));
				return eval(codes);
			}
		} catch (e) {
			return e;
		}
	},
	// Finalizing
	About:function() {
		return this.Description + " V" + this.Version.join(".") + (this.Built?(" "+this.Built):"") + " (ID:" + this.ID + ") " + this.CopyRight + (this.Modifier?(" "+this.Modifier):"");
	},
	
	Description:"ATA.JS",
	CopyRight:"Copyright (C) 2020",
	ID:"XEXAMPLE",
	Version:[5,0,0,0],
	Built:"Beta",
	startTime:new Date(),
	Root:{
		Global:null,
		Location:"",
		Params:{}
	}
});

// Definitions
if (ATA.isBrowser) {
	var scripts = document.getElementsByTagName("SCRIPT");
	var thisScript = scripts[scripts.length - 1].src.split("/");
	thisScript[thisScript.length-1] = "";
	ATA.Libraries.Base = thisScript.join("/");
	ATA.Libraries.Extend("Browser");
}
if (ATA.isNode) ATA.Libraries.Extend("Node");
if (ATA.isDeno) ATA.Libraries.Extend("Deno");
if (ATA.isAsync) ATA.Libraries.Extend("Async");
if (ATA.isMobile) ATA.Libraries.Extend("Mobile");


if (ATA.isDebug) ATA.Libraries.Extend("Debug");
if (ATA.isNode) {
	ATA.Root.Params = {
		exports:exports,
		require:require,
		module:module,
		__filename:__filename,
		__dirname:__dirname,
		process:process
	};
}

// Adapting
if (ATA.isNode) module.exports = ATA;
//if (ATA.isDeno) ; unknown

// Libraries
ATA.Libraries.Extend("Prototype");

// Announcing
ATA.Setups.push(function() {
	//ATA.Libraries.Needs.push();
	for (var i=0;i<ATA.Libraries.Needs.length;i++) ATA.Libraries.Extend(ATA.Libraries.Needs[i]);
	console.log(ATA.About());
});