////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Foreign Sources Version for Browser 1.0
	ATA Compatibility Pack for Foreign Sources for Browser Version 1.0
	
*/
if (typeof ATA === "undefined") throw new Error("ATA.JS is needed for this library");
// Object

ATA.Foreign = {
	
};

var UIObject = function(tag,opt){
	if (tag) {
		this.UI = document.createElement(""+tag);
		if (opt) for (var key in opt) {
			this.UI.setAttribute(key,opt[key]);
		}
		document.body.appendChild(this.UI);
	}
	this.UI = null;
};

UIObject.ATA = ATA;
Object.assign(UIObject.prototype,{
	Clone:function(){
		var newobj = new UIObject();
		newobj.UI = this.UI;
		return newobj;
	},
	GetType:function(){
		return "UIObject";
	},
	ATA:ATA
});

// JQuery

if (window.$) {
	Function.prototype.r = null;
	ATA.modalWindow_flag = false;
	ATA.modalWindow_result = "OK";
	ATA.modalWindow_setresult = function(result) {
		$("#modalwindow").modal("hide");
		this.modalWindow_result = result;
		this.modalWindow_flag = true;
	};
	ATA.modalWindow = async function(title, body, opts) {
		this.modalWindow_flag = false;
		$("#modalwindow").modal("show");
		/*$("#modalwindow").draggable({
			cancel:"modal-body"
		});*/
		$("#modalwindow .modal-title").html(title);
		$("#modalwindow .modal-body").html(body);
		if (opts) {
			if (opts.SPc) {
				$("#modalwindow .modal-footer").hide();
				var body = "";
				for (var i=0;i<opts.SPc.length;i++) body += "<button class=\"btn btn-primary\" onclick=\"ATA.modalWindow_setresult('"+opts.SPc[i]+"');\">"+opts.SPc[i]+"</button>&nbsp;";
				$("#modalwindow .modal-body").html("<center>"+body+"</center>");
			} else $("#modalwindow .modal-footer").show();
			if (body.length == 0) $("#modalwindow .modal-body").hide();
			else $("#modalwindow .modal-body").show();
			if (opts.NO) $("#modalwindow #modalWindow_NOButton").show();
			else $("#modalwindow #modalWindow_NOButton").hide();
			if (opts.YES) $("#modalwindow #modalWindow_YESButton").show();
			else $("#modalwindow #modalWindow_YESButton").hide();
			if (opts.OK) $("#modalwindow #modalWindow_OKButton").show();
			else $("#modalwindow #modalWindow_OKButton").hide();
			if (opts.Close) {
				$("#modalwindow #modalWindow_CloseButton").show();
				$("#modalwindow .close").show();
			} else {
				$("#modalwindow #modalWindow_CloseButton").hide();
				$("#modalwindow .close").hide();
			}

		}
		await this.waitUntil("ATA.modalWindow_flag","ATA.modalWindow_flag = false;");
		return this.modalWindow_result;
	};
	ATA.PostData = function(oUrl,data) {
		var sendData = {};
		sendData.type = "POST";
		sendData.url = ""+oUrl+"";
		sendData.data = data;
		sendData.success = function(Data) {
			ATA.PostResponseMessage(JSON.parse(Data));
		};
		$.ajax(sendData);
	};
	ATA.ReadHttpData = async function(oUrl,data) {
		var rdata;
		var data = data?data:{};
		data.RUNTIME = "1";
		data.TargetID = this.id;
		var promise = new Promise(function(resolve, reject) {
			var sendData = {};
			sendData.type = "POST";
			sendData.url = ""+oUrl+"";
			sendData.data = data;
			sendData.success = function(Data) {
				rdata = JSON.parse(Data);
				ATA.PostResponseMessage(rdata);
				resolve();
			};
			$.ajax(sendData);
		}).then(function() {
			return rdata;
		});
		promise = await promise;
		return promise;
	};
	ATA.GetData = function(oUrl,data) {
		$.get(oUrl,data,function(Data) {
			ATA.PostResponseMessage(JSON.parse(Data));
		});
	};
	ATA.GoURL = function(oUrl) {
		$(location).attr('href',oUrl);
	};
	ATA.Flags = null;
	ATA.PostResponseMessage = function(data) {
		if (data.TargetID != this.id) return;
		if (data.Error) console.log(data.Error);
		if (data.Flags) this.Flags = data.Flags;
		if (data.Code) setTimeout(data.Code,0);
	};
}