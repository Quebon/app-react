import React, { useEffect, useState } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	Table,
	Form,
	Figure,
	Tabs,
	Tab,
	Modal,
	Pagination,
} from "react-bootstrap";
import { 
	RiUploadLine ,
	RiDeleteBinLine,
	RiCloseLine,
	RiUpload2Line,
} from "react-icons/ri";
import axios from 'axios';
import Config from '../common/config.js';
import pushInput from '../common/PushInput.js';
import {CommonUI} from '../common/commonUI.js';


//export interface PopupPushTestProps {
//	isShow?:boolean;
//}

//const PopupPushTest: React.FunctionComponent<PopupPushTestProps> = ({
//	isShow
//}) => {

const PopupPushExcelUpload = (opt) => {
	//let options = opt;
	//Config.log("opt-->");
	Config.log(opt);
	const [excelCount, setExcelCount] = useState(0);
	const [fileInfo, setFileInfo] = useState(null);

	const selfClose = function() {
		setFileInfo(null);
		opt.close(false);
	};

	const eventHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		let frm = document.querySelector("#frmPopupExcelUpload");
		console.log("act = " + act_v);
		if(ev.type == "click") {
			if(act_v == "fileUp") {
				frm.upExcel.click();
			}
			else if(act_v == "close") {
				selfClose();
			}
			else if(act_v == "accept") {
				opt.callback(fileInfo);
				opt.close(false);
			}
		}
		else if(ev.type == "change") {
			if(act_v == "upExcel") {
				let files = Array.from(frm.upExcel.files);
				if (files) {
					const formData = new FormData();
					files.map((file) => {
						formData.append("files", file);
					});
					axios.post(Config.host_api + '/push/excelUpload', formData, {headers:Config.httpHeader}, {withCredentials:true})
					.then((res) => {
						Config.log("upload result");
						console.log(res.data.body);
						setExcelCount(res.data.body.data.count);
						setFileInfo(res.data.body.data);
					}).catch((err) => {
						setExcelCount(0);
						setFileInfo(null);
						console.error(err);
					});

				}
			}
		}
	};

	const eventHandle2 = (ev) => {
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);
		if(act_v == "search") {
			load(1);
		}
		else if(act_v == "selected") {
			var key = evo.getAttribute("data-index");
			Config.log("Key=" + key);
			let item = userList[key];
			let isDup = false;
			selectedList.forEach( (it) => {
				if(it.user_id == item.user_id) {
					isDup = true;
				}
			});
			if(isDup == false) {
				let items = selectedList;
				items.push(item);
				//selectedList.join(items);
				setSelectedList(items);
				Config.log("add");
			}
		}
		else if(act_v == "remove") {
			var key = evo.getAttribute("data-index");
			Config.log("Key=" + key);
			const items = selectedList;
			items.splice(key, 1);
			setSelectedList(items);
		}
		else if(act_v == "goTest") {
			Config.log("test send go!!");
		}

	}


	return (
		<Modal show={opt.isShow} onHide={selfClose} centered size="sm">
		<Modal.Header closeButton>
		<Modal.Title>엑셀 파일 업로드</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<form name="frmPopupExcelUpload" id="frmPopupExcelUpload">
				{
					fileInfo != null ?
						<div className="bg-box text-center">
							총 발송 대상자 <strong>{excelCount}</strong>명
						</div>
					:""
				}
				<div className="text-center mt-4 mb-4">
					발송 대상자 엑셀을 업로드해주세요.<br />
					<input type="file" name="upExcel" id="upExcel" className="hide" data-act="upExcel" onChange={eventHandle}/>
					<Button variant="secondary mt-3 mb-3" data-act="fileUp" onClick={eventHandle}><RiUpload2Line /> 파일 업로드</Button><br />
					{
						fileInfo != null ?
							<div className="text-start d-flex justify-content-center text-secondary">
								&middot; 첨부 : {fileInfo.filename}<br />
								&middot; 샘플 : 엑셀파일 양식 [다운로드]
							</div>
						:
							<div className="text-start d-flex justify-content-center text-secondary">
								&middot; 샘플 : 엑셀파일 양식 [다운로드]
							</div>
					}
				</div>
			</form>
		</Modal.Body>
		<Modal.Footer>
		<Button variant="secondary" data-act="close" onClick={eventHandle}>취소</Button>
		{
			fileInfo != null ?
				<Button variant="primary" data-act="accept" onClick={eventHandle}>대상자 확정</Button>
			: ""
		}
		</Modal.Footer>
	</Modal>
	);
};

export default PopupPushExcelUpload;
