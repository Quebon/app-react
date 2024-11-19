import React, { useState, useEffect } from 'react';
import Header from "./../../components/Header";
import {
	Container,
	Row,
	Col,
	Button,
	Table,
	Pagination,
	Form,
	InputGroup,
	Tab,
	Tabs,
	Figure,
	Modal,
} from "react-bootstrap";
import { 
	RiUploadLine ,
	RiDeleteBinLine,
	RiCloseLine,
	RiUpload2Line,
} from "react-icons/ri";
import Config from '../../common/config.js';
import FileUpload from '../../components/FileUpload.tsx';
import {Link} from "react-router-dom";
import messageTemplate from '../../common/MessageTemplate';
import sender from '../../common/Sender';
import {CommonUI} from '../../common/commonUI';
import Image from './../../assets/images/temp_appIcon.png';
import appIcon from './../../assets/images/temp_appIcon.png';

const Templete = () => {
	const [templateInfo, setTemplateInfo] = useState(  {currPage:1, totalRecords:0, pageItems:[]} );
	const [senderInfo, setSenderInfo] = useState(  {currPage:1, totalRecords:0, pageItems:[]} );

	const [templateItem, setTemplateItem] = useState( {seq:0, title:"", contents:"", reg_date_str:""} );
	const [senderItem, setSenderItem] = useState( {title:"발송자 추가", seq:0, sender_id:"", sender_name:"", filename:"", reg_date_str:""} );


	const [templateList, setTemplateList] = useState([]);
	const [senderList, setSenderList] = useState([]);

	const [templeteModal, setTempleteModal] = useState(false);
	const [senderAddModal, setSenderAddModal] = useState(false);

	useEffect(() => {
		getTemplateList(1);
		getSenderList(1);
	}, []);

	const eventHandle = (ev) => {
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);

		let frm2 = document.querySelector("#frmSender");


		if(act_v == "search") {
			getTemplateList(1);
		}
		else if(act_v == "add") {
			document.location.href = "/admin/add";
		}
		else if(act_v == "modify") {
			let seq_v = evo.getAttribute("data-id");
			setSenderAddModal(true);
		}
		else if(act_v == "delete") {
			let seq_v = evo.getAttribute("data-id");
			if(window.confirm("삭제하시겠습니까?")) {
				const data = {"seq":seq_v};
				//msgTemplate.deleteInfo({data:data, callback:response2});
			}
		}
		else if(act_v == "addSender") {
			const today = new Date();
			const date_v = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			senderItem.reg_date_str = date_v;
			setSenderItem({seq:0, title:"", contents:"", filename:"", reg_date_str:""});
			setSenderAddModal(true);
		}
		else if(act_v == "senderModify") {
			let pos_i = evo.getAttribute("data-idx");
			setSenderItem(senderList[pos_i]);
			setSenderAddModal(true);
		}
		else if(act_v == "senderDelete") {
			let seq_v = evo.getAttribute("data-id");
			if(window.confirm("삭제하시겠습니까?")) {
				const data = {"seq":seq_v};
				sender.deleteInfo({data:data, callback:respSenderDelete});
			}
		}
		else if(act_v == "senderFileSelect") {
			let fo = document.querySelector("#upFile");
			fo.click();
		}
		else if(act_v == "senderFileClear") {
			let o = frm2.querySelector("[data-id='upfile_1']");
			if(o) {
				o.parentNode.removeChild(o);
			}
			let fo = document.querySelector("#upFile");
			fo.value = "";
		}
		else if(act_v == "senderSave") {
			if(frm2.sender_id.value == "") {
				alert("모든 정보를 규칙에 맞게 입력해야 저장 가능합니다.");
				return;
			}
			if(frm2.sender_name.value == "") {
				alert("모든 정보를 규칙에 맞게 입력해야 저장 가능합니다.");
				return;
			}
			const formData = new FormData(frm2);
			const data = Object.fromEntries(formData.entries());
			console.log(data);
			if(senderItem.seq > 0) {
				formData.append("seq", senderItem.seq);
				sender.updateInfo({data:formData, callback:respSenderSave});
			}else {
				sender.addInfo({data:formData, callback:respSenderSave});
			}
		}
	};

	const goPage = (pageNum) => {
		console.log("page=" + pageNum);
		getTemplateList(pageNum);
	}

	const getTemplateList = (pg) => {
		templateInfo.currPage = pg;
		const frm = document.querySelector("#frmSearch");
		const formData = new FormData(frm);
		const data = Object.fromEntries(formData.entries());
		data["page"] = pg - 1 + 1;
		data["pageSize"] = 10;
		messageTemplate.getList({data:data, callback:respTemplate});
	}

	const respTemplate = function(obj) {
		if(obj) {
			if(obj.list) {
				setTemplateList(obj.list);
				templateInfo.totalRecords = obj.count;

				let items = CommonUI.pagenationItems({currPage:templateInfo.currPage, totalRecords:templateInfo.totalRecords, eventHandler:goPage})
				templateInfo.pageItems = items;
				console.log(items);
			}
			else {
				setTemplateList([]);
				templateInfo.pageItems = [];
			}
		}
		else {
			setTemplateList([]);
			templateInfo.pageItems = [];
		}
	};

	const goSenderPage = (pageNum) => {
		console.log("page=" + pageNum);
		getSenderList(pageNum);
	}

	const getSenderList = (pg) => {
		senderInfo.currPage = pg - 1 + 1;
		let data = {};
		data["page"] = senderInfo.currPage;
		data["pageSize"] = 10;
		sender.getList({data:data, callback:respSender});
	}

	const respSender = function(obj) {
		if(obj) {
			if(obj.list) {
				setSenderList(obj.list);
				senderInfo.totalRecords = obj.count;

				let items = CommonUI.pagenationItems({currPage:senderInfo.currPage, totalRecords:senderInfo.totalRecords, eventHandler:goSenderPage})
				senderInfo.pageItems = items;
				console.log(items);
			}
			else {
				setSenderList([]);
				senderInfo.pageItems = [];
			}
		}
		else {
			setSenderList([]);
			senderInfo.pageItems = [];
		}
	};

	const respSenderSave = function(obj) {
		if(obj.seq > 0) {
			alert("저장하였습니다.");
			getSenderList(1);
			setSenderAddModal(false);
		}
		else {
			alert("저장에 실패하였습니다.\n다시 시도해주세요.");
		}
	};

	const respSenderDelete = function(obj) {
		if(obj.seq > 0) {
			alert("삭제하였습니다.");
			getSenderList(senderInfo.currPage);
		}
		else {
			alert("삭제에 실패하였습니다.\n다시 시도해주세요.");
		}
	};

	return(
		<div className="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				<Tabs defaultActiveKey="templeteManager" id="" className="custom__tab">
					<Tab eventKey="templeteManager" title="템플릿 관리">
						<div className="main__header">
							<h2 className="main__header-title">템플릿 관리</h2>	
						</div>
						{/* 검색 영역 */}
						<Form id="frmSearch" name="frmSearch">
							<Row className="search__form">
								<Col>
									<Row className="search__form-group">
										<Col lg="auto">
											<Form.Select name="search_key" id="search_key" aria-label="system" className="d-inline-block w-auto">
												<option value="1">제목</option>
												<option value="2">본문</option>
											</Form.Select>
											<Form.Control type="text" name="search_val" id="search_val" className="d-inline-block w-auto ms-1" placeholder="" />
										</Col>
									</Row>
								</Col>
								<Col lg="1" className="text-end">
									<Button variant="outline-primary" data-act="search" onClick={eventHandle}>검색</Button>
								</Col>
							</Row>
						</Form>
						<div className="table__wrap mt-4">
							<Row className="table__head">
								<Col>
									<span><strong>{templateInfo.totalRecords}</strong>건</span>
								</Col>
								<Col className="text-end"></Col>
							</Row>
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>등록일</th>
										<th scope='col'>제목</th>
										<th scope='col'>본문</th>
										<th scope='col'>삭제</th>
									</tr>
								</thead>
								<tbody>
								{
									templateList.length > 0 ?
									templateList.map( (item, index) =>
										<tr>
											<td>{item.reg_date_str}</td>
											<td className="text-start">{item.title}</td>
											<td className="text-start">{item.contents}</td>
											<td>
												<Button size="sm" variant="outline-dark" data-act="senderDelete" data-id={item.seq} onClick={eventHandle}>삭제</Button>
											</td>
										</tr>
									)
									: (<tr><td colSpan={4}>데이터가 없습니다.</td></tr>)
								}
								</tbody>
							</Table>
							<div className="table__pagination">
								<Pagination>{templateInfo.pageItems}</Pagination>
							</div>
						</div>
					</Tab>
					<Tab eventKey="senderManager" title="발송자 관리">
						<div className="main__header">
							<h2 className="main__header-title">발송자 관리</h2>	
						</div>
						<div className="table__wrap mt-4">
							<Row className="table__head">
								<Col>
									<span><strong>{senderInfo.totalRecords}</strong>건</span>
								</Col>
								<Col className="text-end">
									<Button data-act="addSender" onClick={eventHandle}>발송자 추가</Button>
								</Col>
							</Row>
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>No</th>
										<th scope='col'>등록일</th>
										<th scope='col'>발송자 ID</th>
										<th scope='col'>발송자명</th>
										<th scope="col">등록자</th>
										<th scope="col">이미지</th>
										<th scope="col">편집</th>
									</tr>
								</thead>
								<tbody>
									{
										senderList.length > 0 ?
										senderList.map( (item, index) =>
											<tr>
												<td>{index + 1}</td>
												<td>{item.reg_date_str}</td>
												<td>{item.sender_id}</td>
												<td>{item.sender_name}</td>
												<td>{item.reg_user_id}</td>
												<td>
													{
														item.filename ? 
														<img width={80} height={80} src={Config.getFileBasePath + "/Files/sender/" + item.filename}/>
														:null
													}
												</td>
												<td>
													<Button size="sm" variant="outline-dark" data-act="senderModify" data-idx={index} data-id={item.seq} onClick={eventHandle}>수정</Button>
													<Button size="sm" variant="outline-dark ms-2" data-act="senderDelete" data-id={item.seq} onClick={eventHandle}>삭제</Button>
												</td>
											</tr>
										)
										: (<tr><td colSpan={7}>데이터가 없습니다.</td></tr>)
									}
								</tbody>
							</Table>
							<div className="table__pagination">
								<Pagination>{senderInfo.pageItems}</Pagination>
							</div>
						</div>
					</Tab>
				</Tabs>
			</Container>



			{/* 템플릿 정보 */}
			<Modal show={templeteModal} onHide={setTempleteModal} centered size="">
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
												<Form.Control value="튜터링 학생 휴회 알림"></Form.Control>
											</td>
										</tr>
										<tr>
											<th scope='row'>본문</th>
											<td className="text-start">
												<Form.Control as="textarea" rows={10}></Form.Control>
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

			{/* 발신자 정보 */}
			<Modal show={senderAddModal} onHide={setSenderAddModal} centered size="">
				<form name="frmSender" id="frmSender">
				<Modal.Header closeButton>
					<Modal.Title>{senderItem.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="table__view">
						<Table bordered responsive className="table__view">
							<tbody>
								<tr>
									<th scope='row'>등록일</th>
									<td className="text-start">{senderItem.reg_date_str}</td>
								</tr>
								<tr>
									<th scope='row'>발송자 ID</th>
									<td className="text-start">
										<Form.Control placeholder="발송자ID를 입력하세요" name="sender_id" id="sender_id" defaultValue={senderItem.sender_id}></Form.Control>
									</td>
								</tr>
								<tr>
									<th scope='row'>발송자명</th>
									<td className="text-start">
										<Form.Control placeholder="발송자명을 입력하세요" name="sender_name" id="sender_name" defaultValue={senderItem.sender_name}></Form.Control>
									</td>
								</tr>
								<tr>
									<th scope='row'>기본 이미지</th>
									<td className="text-start">
										<Row className="fileup__ui">
											<Col className='col-auto'>
												<FileUpload maxFileSize={1} inputName={"upFile"}></FileUpload>
											</Col>
{
	 (senderItem.filename != "") ?
		<figure className="figure" data-id="upfile_1">
			<img width={80} height={80} src={Config.getFileBasePath + "/Files/sender/" + senderItem.filename}/>
		</figure>
		: ""
}
											<Col className="col-auto">
												<Button variant="outline-dark" size="sm" data-act="senderFileSelect" onClick={eventHandle}>
													<RiUploadLine /> 파일 첨부
												</Button>
												<Button variant="outline-dark ms-2" size="sm" data-act="senderFileClear" onClick={eventHandle}>
													<RiDeleteBinLine /> 삭제
												</Button>
											</Col>
											<Col className="col-auto">
												<small className="text-secondary-emphasis">※ size : 512px  X 512px, PNG, JPG , 1MB이하</small>
											</Col>
										</Row>
									</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={() => setSenderAddModal(false)}>취소</Button>
							<Button variant="primary" data-act="senderSave" onClick={eventHandle}>저장</Button>
				</Modal.Footer>
				</form>
			</Modal>

		</div>
	);
};
export default Templete;

