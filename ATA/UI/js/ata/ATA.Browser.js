////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Compatibility Pack for Browsers Version 1.0
	
*/
if (typeof ATA === "undefined") throw new Error("ATA.JS is needed for this library");

ATA.Root.Global = window;
ATA.Root.Params = {
	window:window,
	document:document,
	navigator:navigator
};
var url_ = window.location.href;
url_ = url_.split("/");
url_[url_.length - 1] = "";
ATA.Root.Location = url_.join("/");

var toMatchmobile = [/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i];
ATA.isMobile = toMatchmobile.some(function(toMatchmobile){return navigator.userAgent.match(toMatchmobile)});
ATA.Browser = {
	isOpera:(navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1,
	isChrome:navigator.userAgent.indexOf("Chrome") != -1,
	isSafari:navigator.userAgent.indexOf("Safari") != -1,
	isFirefox:navigator.userAgent.indexOf("Firefox") != -1,
	isIE:(navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true),
	isEdge:false,
	isBlink:false
};

ATA.ReadCookie = function(cookie, value) {
	var name = this.sessionName + "_" + cookie + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	this.WriteCookie(cookie, value);
	return value;
}

ATA.WriteCookie = function(cookie, value) {
	var d = new Date();
	d.setTime(d.getTime() + (24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = this.sessionName + "_" + cookie + "=" + value + ";" + expires + ";path=/";
};

if (!ATA.Browser.isIE && !!window.StyleMedia) {
	ATA.Browser.isIE = false;
	ATA.Browser.isEdge = true;
}

if ((ATA.Browser.isChrome || ATA.Browser.isOpera) && !!window.CSS) {
	ATA.Browser.isChrome = false;
	ATA.Browser.isOpera = false;
	ATA.Browser.isBlink = true;
}

ATA.Exit = function() {
	window.close();
};

ATA.Setups.push(function(){
	ATA.Libraries.Extend("ForeignSources");
});

// Prototypes

HTMLElement.ATA = ATA;
Object.assign(HTMLElement.prototype,{
	GetType:function(){
		return "HTMLElement";
	},
	GetJQuery:function(){
		return $(this);
	},
	ATA:ATA
});