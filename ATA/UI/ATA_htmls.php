<DIV class="modal" tabindex="-1" id="modalwindow" role="dialog">
	<DIV class="modal-dialog" role="document">
		<DIV class="modal-content">
			<DIV class="modal-header">
				<H5 class="modal-title">Modal title</H5>
				<BUTTON type="BUTTON" class="close" data-dismiss="modal" aria-label="Close" onclick="ATA.modalWindow_setresult(false);"><SPAN aria-hidden="true">&times;</SPAN></BUTTON>
			</DIV>
			<DIV class="modal-body"></DIV>
			<DIV class="modal-footer">
				<BUTTON id="modalWindow_NOButton" style="display:none;" type="BUTTON" class="btn btn-primary" onclick="ATA.modalWindow_setresult('NO');">NO</BUTTON>
				<BUTTON id="modalWindow_YESButton" style="display:none;" type="BUTTON" class="btn btn-primary" onclick="ATA.modalWindow_setresult('YES');">YES</BUTTON>
				<BUTTON id="modalWindow_OKButton" style="display:none;" type="BUTTON" class="btn btn-primary" onclick="ATA.modalWindow_setresult('OK');">OK</BUTTON>
				<BUTTON id="modalWindow_CloseButton" style="display:none;" type="BUTTON" class="btn btn-secondary" data-dismiss="modal" onclick="ATA.modalWindow_setresult(false);">Close</BUTTON>
			</DIV>
		</DIV>
	</DIV>
</DIV>
<DIV style="position:fixed;bottom:20px;right:20px;" class="toast mt-3">
	<DIV class="toast-header">Toast Title</DIV>
	<DIV class="toast-body">Toast Content</DIV>
</DIV>