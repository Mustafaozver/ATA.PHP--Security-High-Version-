////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	ATA Compatibility Pack for Asynchronous Functions Version 1.0
	
*/
if (typeof ATA === "undefined") throw new Error("ATA.JS is needed for this library");
if (!ATA.isAsync) throw new Error("This library is only for Asynchronous systems.");

Object.assign(ATA,{
	waitUntil:async function(if_, eval_,time_=25) {
		var promise = new Promise(function(resolve, reject) {
			var f_temp = function() {
				if (eval(if_)) {
					delete f_temp;
					resolve();
				} else {
					setTimeout(f_temp,time_);
				}
			};
			f_temp();
		}).then(function() {
			return eval(eval_);
		});
		promise = await promise;
		return promise;
	},
	Delay:async function(time) { // this should be used with "await"
		var promise = new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve();
			}, time);
		}).then(function() {
			return true;
		});
		promise = await promise;
		return promise;
	}
});

ATA.Setups.push(function(){
	if (!ATA.isBrowser) return;
	if (typeof $ === 'undefined') return;
	if ($(".modalwindow").length == 0) return;
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
		$("#modalwindow modal-content").focus();
		$('#modalwindow').on('hidden',function() {
			ATA.modalWindow_setresult(false);
		});
		await this.waitUntil("ATA.modalWindow_flag","ATA.modalWindow_flag = false;");
		return this.modalWindow_result;
	};
});