////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Javascript Connection Library Version 1.0
	
*/
if (typeof ATA === "undefined") throw new Error("ATA.JS is needed for this library");

ATA.Http = {
	Methods:[
		"POST",
		"GET",
		"DELETE",
		"UPDATE",
		"PUT",
		"PATCH",
		"COPY",
		"OPTIONS",
		"LINK",
		"UNLINK",
		"PURGE",
		"LOCK",
		"UNLOCK",
		"PROPFIND",
		"VIEW"
	],
	Send:function(met,url,data,callback){
		met = this.Methods.indexOf(met.toUpperCase());
		var sendData = {};
		sendData.type = this.Methods[met>0?met:0];
		sendData.url = ""+url+"";
		sendData.data = data;
		sendData.success = function(Data) {
			callback(JSON.parse(Data));
			//ATA.PostResponseMessage(JSON.parse(Data));
		};
		$.ajax(sendData);
	}
};

