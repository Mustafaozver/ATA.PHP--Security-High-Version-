////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Prototypes Version 2.0
	
*/
if (typeof ATA === "undefined") throw new Error("ATA.JS is needed for this library");
// Object
Object.ATA = ATA;

// Array
Array.ATA = ATA;
Object.assign(Array.prototype,{
	GetMax:function(){
		return Math.max.apply(null,this);
	},
	GetMin:function(){
		return Math.min.apply(null,this);
	},
	Get:function(n){
		return this[n-0];
	},
	Set:function(n,value){
		this[n] = value;
	},
	GetFirst:function(){
		return this[0];
	},
	GetLast:function(){
		return this[this.length-1];
	},
	AddtoEnd:function(value){
		this.push(value);
	},
	AddtoBegin:function(value){
		this.unshift(value);
	},
	ToSum:function(){
		return this.reduce(function(a,b){return a+b},0);
	},
	Avarage:function(){
		if (this.length > 0) return this.ToSum()/this.length;
		return 0;
	},
	
	Derivative:function(){
		var lkey = this.Avarage();
		return this.map(function(item,index){
			var ret_ = item-lkey;
			lkey = item;
			return ret_;
		});
	},
	Correlation:function(arr){
		var prom_x = this.Avarage();
		var prom_y = arr.Avarage();
		return (this.map(function(e, i, r){
			return r = {x:e, y:arr[i]};
		}).reduce(function(s, a){
			return s + a.x * a.y;
		},0)-this.length*prom_x*prom_y)/((Math.sqrt(this.reduce(function(s, a){
			return(s + a * a)
		},0)-this.length*prom_x*prom_x))*(Math.sqrt(arr.reduce(function(s, a){
			return(s + a * a)
		},0)-this.length*prom_y*prom_y)));
	},
	Clone:function(){
		var newobj = [];
		for (var i=0;i<this.length;i++) newobj.push(this[i].Clone());
		return newobj;
	},
	GetType:function(){
		return "Array";
	},
	ATA:ATA
});

for (var key1 in Array) {
	for (var key2 in Array) {
		Array[key1][key2] = null;
	}
}

// String
String.ATA = ATA;
String.HEX = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
String.LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
String.LETTERS_TR_UPPER = ["Ç","Ð","Ý","Ö","Þ","Ü"];
String.LETTERS_TR_LOWER = ["ç","ð","ý","ö","þ","ü"];
Object.assign(String.prototype,{
	Clone:false,
	GetType:function(){
		return "String";
	},
	GetCode:function(){
		var arr = [];
		for (var i=0;i<this.length;i++) arr.push(this.charCodeAt(i));
		return arr;
	},
	ToHex:function(){
		var arr = this.GetCode();
		for (var i=0;i<arr.length;i++) {
			var A1 = arr[i] % 16;
			var A16 = Math.floor(arr[i] / 16);
			arr[i] = String.HEX[A16] + String.HEX[A1];
		}
		return arr.join("");
	},
	ToAscii:function() {
		var text = "";
		var that = this.toUpperCase();
		for (var i=0;i<this.length;i+=2) {
			var A1 = String.HEX.indexOf(that.charAt(i+1));
			var A16 = String.HEX.indexOf(that.charAt(i));
			if (A1 == -1 || A16 == -1) return false;
			text += String.fromCharCode(A16*16 + A1);
		}
		return text;
	},
	ATA:ATA
});

if (!String.prototype.trim) Object.assign(String.prototype,{ // for IE
	trim:function(){
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	}
});

for (var key1 in String) {
	for (var key2 in String) {
		String[key1][key2] = null;
	}
}

// Number
var numbericstep = 1;
Number.ATA = ATA;
Number.E = Math.E;
Number.Golden = Math.sqrt(5)/2 + 0.5;
Number.Pi = Math.PI;
Object.assign(Number.prototype,{
	Get:function(){
		return this.valueOf();
	},
	Clone:function(){
		return this.Get()-0;
	},
	sin:function(){return Math.sin(this.valueOf())},
	cos:function(){return Math.cos(this.valueOf())},
	tan:function(){return Math.tan(this.valueOf())},
	cot:function(){return 1/Math.tan(this.valueOf())},
	exp:function(x){return Math.exp(this.valueOf())},
	pow:function(x){return Math.pow(this.valueOf(),x)},
	log:function(x){
		if (x) return Math.log(this.valueOf())/Math.log(x);
		else return Math.log(this.valueOf());
	},
	
	ToScale:function(omet){
		switch (omet.toLowerCase()){
			case "0as-01":
				if (this == Infinity) return 1;
				return this.valueOf()/(numbericstep+this.valueOf());
			case "01-0as":
				if (this == 1) return Infinity;
				return numbericstep*this.valueOf()/(1-this.valueOf());
			default:
			case "esas-01":
				if (this.valueOf() < 0) return(0.5-(-this.valueOf()).ToScale("0as-01")/2);
				else return(0.5+this.valueOf().ToScale("0as-01")/2);
			case "01-esas":
				if (this.valueOf() < 0.5) return-(1-2*this.valueOf()).ToScale("01-0as");
				else return(2*this.valueOf()-1).ToScale("01-0as");
			case "esas-012":
				if (this == Infinity) return 1;
				else if (this == -Infinity) return 0;
				else return 1/(1+Math.exp(-this.valueOf()));
			case "01-esas2":
				if (this == 1) return Infinity;
				else if (this == 0) return -Infinity;
				else return ATA["LOG"](Math.E,this.valueOf()) - ATA["LOG"](Math.E,1-this.valueOf());
		}
	},
	GetType:function(){
		return "Number";
	},
	ATA:ATA
});

for (var key1 in Number) {
	for (var key2 in Number) {
		Number[key1][key2] = null;
	}
}

// Boolean
Boolean.ATA = ATA;
Boolean.And = function(args){
	for (var i=0;i<args.length;i++) if (args[i] == false) return false;
	return true;
};
Boolean.Or = function(args){
	for (var i=0;i<args.length;i++) if (args[i] == true) return true;
	return false;
};
Object.assign(Boolean.prototype,{
	toString:function(){
		if (this) return "1";
		else return "0";
	},
	And:function(){
		return(this && Boolean.And(arguments));
	},
	Or:function(){
		return(this || Boolean.Or(arguments));
	},
	GetType:function(){
		return "Boolean";
	},
	ATA:ATA
});

for (var key1 in Boolean) {
	for (var key2 in Boolean) {
		Boolean[key1][key2] = null;
	}
}

// Date
Date.ATA = ATA;
Object.assign(Date.prototype,{
	SetAlarm:function(func){
		setTimeout(func, this.GetTime() - (new Date()).getTime());
	},
	GetType:function(){
		return "Date";
	},
	ATA:ATA
});

for (var key1 in Date) {
	for (var key2 in Date) {
		Date[key1][key2] = null;
	}
}

// Function
Function.ATA = ATA;
Object.assign(Function.prototype,{
	Clone:function(){
		try {
		var that = this;
		var temp = function temporary(){return that.apply(this, arguments)};
		for(var key in this){
			if (this.hasOwnProperty(key)){
				temp[key] = this[key];
			}
		}
		return temp;
		} catch (e) {return null; }
	},
	GetType:function(){
		return "Function";
	},
	ATA:ATA
});

for (var key1 in Function) {
	for (var key2 in Function) {
		Function[key1][key2] = null;
	}
}

// Object

function CheckforObject(obj) {
	if (!obj) return false;
	if (obj === null) return false;
	if (obj.constructor) return ["Array","String","Number","Boolean","Date","Object","Function","Symbol","RegExp","Error"].indexOf(obj.constructor.name) > 0;
	return true;
}

function CheckforKey(key) {
	var keys = ["Array","String","Number","Boolean","Date","Object","Function","Symbol","RegExp","Error"];
	try {
		for (var i=0;i<keys.length;i++) {
			if (eval(keys[i]+".prototype." + key)) return true;
		}
	} catch (e) {}
	return false;
}

Object.assign(Object.prototype,{
	GetItem:function(oname){
		if (this[""+oname]) return this[""+oname];
		else if (typeof(oname) != "symbol"){
			if (this[oname]) return this[oname];
		}
	},
	Clone:function(){
		var newobj = {};
		for (var key in this) {
			if (newobj[""+key]) continue;
			else if (!CheckforObject(this[""+key])) continue;
			else if (CheckforKey(key)) continue;
			else if (key == "ATA") continue;
			else if (this[key].Clone) newobj[key] = this[key].Clone();
			else newobj[key] = this[key];
		}
		return newobj;
	},
	GetType:function(){
		return "Object";
	},
	ToStringify:function() {
		try {
			return JSON.stringify(this);
		} catch(e) {
			return "";
		}
	},
	isEqual:function(obj) {
		return this.ToStringify() == JSON.stringify(obj);
	},
	exec:function(){
		return null;
	}
});

for (var key1 in Object) {
	for (var key2 in Object) {
		Object[key1][key2] = null;
	}
}

// Symbol
Symbol.ATA = ATA;
Symbol.prototype._toSTR = Symbol.prototype.toString;
Object.assign(Symbol.prototype,{
	Get:function(){
		return this;
	},	
	valueOf:function(){
		return 0;
	},
	Clone:function(){
		return this;
	},
	toString:function(){
		var text = this._toSTR();
		return text.substr(7,text.length-8);
	},
	GetType:function(){
		return "Symbol";
	},
	ATA:ATA
});

for (var key1 in Symbol) {
	for (var key2 in Symbol) {
		Symbol[key1][key2] = null;
	}
}

// RegExp
RegExp.ATA = ATA;
Object.assign(RegExp.prototype,{
	GetType:function(){
		return "RegExp";
	},
	ATA:ATA
});

for (var key1 in RegExp) {
	for (var key2 in RegExp) {
		RegExp[key1][key2] = null;
	}
}

// Error
Error.ATA = ATA;
Object.assign(Error.prototype,{
	GetType:function(){
		return "Error";
	},
	ATA:ATA
});

for (var key1 in Error) {
	for (var key2 in Error) {
		Error[key1][key2] = null;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Generateds

////////////////////////////////////////////////////////////////////////////////////////////////////
// Setups
ATA.Setups.push(function(){
	if (!window.$) return; // for jquery
	Object.assign(Object.prototype,{
		exec:function(){
			return null;
		}
	});
	Object.assign(Function.prototype,{
		exec:function(){
			return null;
		}
	});
});