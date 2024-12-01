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
import messageTemplate from '../common/MessageTemplate.js';
import {CommonUI} from '../common/commonUI.js';

const PopupTemplateView = (opt) => {
	//Config.log("PopupTemplateView opt-->");
	//Config.log(opt);

	const [msgInfo, setMsgInfo] = useState(opt.data);

	useEffect( () => {
	});

	const selfClose = function() {
		opt.close(false);
	};

	const eventHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		let frm = document.querySelector("#frmPopTemplage");
		console.log("act = " + act_v);
		if(ev.type == "click") {
			if(act_v == "close") {
				selfClose();
			}
			else if(act_v == "save") {
				getList(1);
			}
			else if(act_v == "delete") {
				let pos = evo.getAttribute("data-id");
				const item = msgInfo.list[pos];
				Config.log(item);
				opt.callback(item);
				selfClose();
			}
		}
		else if(ev.type == "change") {
		}
	};

	return (
		<Modal show={opt.isShow} onHide={selfClose} centered size="">
			<Modal.Header closeButton>
				<Modal.Title>템플릿 정보</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="table__view">
					<Table bordered responsive className="table__view">
						<tbody>
							<tr>
								<th scope='row'>등록일</th>
								<td className="text-start">2024-09-01 13:30</td>
							</tr>
							<tr>
								<th scope='row'>제목</th>
								<td className="text-start">
									<Form.Control name="title" id="title" value="튜터링 학생 휴회 알림"></Form.Control>
								</td>
							</tr>
							<tr>
								<th scope='row'>본문</th>
								<td className="text-start">
									<Form.Control as="textarea" name="content" id="content" rows={10}></Form.Control>
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setTempleteModal(false)}>삭제</Button>
				<Button variant="secondary" onClick={() => setTempleteModal(false)}>취소</Button>
				<Button variant="primary" onClick={() => setTempleteModal(false)}>수정</Button>
			</Modal.Footer>
		</Modal>
	

	);
};

export default PopupTemplateView;
