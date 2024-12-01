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

const PopupPushPreview = (opt) => {
	//Config.log("PopupPushPreview opt-->");
	//Config.log(opt);

	const [info, setInfo] = useState(opt.data.sendInfo || {});

	useEffect( () => {
		if(opt.data.sendInfo) {
			setInfo(opt.data.sendInfo);
		}
	});

	const selfClose = function() {
		opt.close(false);
	};

	const eventHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		let frm = document.querySelector("#frmPopupExcelUpload");
		console.log("act = " + act_v);
		if(ev.type == "click") {
			if(act_v == "close") {
				selfClose();
			}
		}
		else if(ev.type == "change") {
		}
	};

	return (
		<Modal show={opt.isShow} onHide={selfClose} centered size="sm">
			<Modal.Header closeButton>
			<Modal.Title>미리보기</Modal.Title>
			</Modal.Header>
			<Modal.Body>
						<Tabs
							defaultActiveKey="home"
							transition={false}
							id="noanim-tab-example"
							className="mb-3 justify-content-center"
						>
							<Tab eventKey="home" title="Android">
								<div className="preview-box">
									{ (info.title != null) ? <div className="title">{info.title}</div> : ""}
									<div className="body">
										{ (info.emtitle != null) ? <div className="smtitle">{info.emtitle}</div> : ""}
										<div className="content">
											{ (info.content != null) ? info.content : ""}
											{ (info.webview_url != null) ? <iframe src={info.webview_url}></iframe> : ""}
											<div className="buttons">
												{(info.link_name_1 != null && info.link_name_1 != "")? <button className="btn btn-primary">{info.link_name_1}</button> : ""}
												{(info.link_name_2 != null && info.link_name_2 != "")? <button className="btn btn-primary">{info.link_name_2}</button> : ""}
												{(info.link_name_3 != null && info.link_name_3 != "")? <button className="btn btn-primary">{info.link_name_3}</button> : ""}
											</div>
										</div>
									</div>
								</div>
							</Tab>
							<Tab eventKey="profile" title="IOS">
								<div className="preview-box">

								{ (info.title != null) ? <div className="title">{info.title}</div> : ""}
									<div className="body">
										{ (info.emtitle != null) ? <div className="smtitle">{info.emtitle}</div> : ""}
										<div className="content">
											{ (info.content != null) ? info.content : ""}
											{ (info.webview_url != null) ? <iframe src={info.webview_url}></iframe> : ""}
											<div className="buttons">
												{(info.link_name_1 != null && info.link_name_1 != "")? <button className="btn btn-primary">{info.link_name_1}</button> : ""}
												{(info.link_name_2 != null && info.link_name_2 != "")? <button className="btn btn-primary">{info.link_name_2}</button> : ""}
												{(info.link_name_3 != null && info.link_name_3 != "")? <button className="btn btn-primary">{info.link_name_3}</button> : ""}
											</div>
										</div>
									</div>

								</div>
							</Tab>
						</Tabs>
					</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" data-act="close" onClick={(ev) => eventHandle(ev)}>닫기</Button>
			</Modal.Footer>
		</Modal>			
	);
};

export default PopupPushPreview;
