import React, { useEffect, useState, useLayoutEffect } from 'react';
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
	InputGroup,
	Pagination,
} from "react-bootstrap";
import { 
	RiUploadLine ,
	RiDeleteBinLine,
	RiCloseLine,
	RiUpload2Line,
} from "react-icons/ri";
import Config from '../common/config.js';
import pushInput from '../common/PushInput.js';
import {CommonUI} from '../common/commonUI.js';


const PopupSearchPushTarget = (opt) => {
	//Config.log("PopupSearchPushTarget opt-->");
	//Config.log(opt);

	const [userList, setUserList] = useState([]);

	useEffect( () => {
		Config.log("refresh 1");
		reqList(1);
		//const json =  pushInput.getPushTargetList({data:{}});
	}, []);


	const selfClose = function() {
		opt.close(false);
	};


	const reqList = async (pg) => {
		const resp =  pushInput.getPushTargetList({data:{}});
		Config.log("getPushTargetList response=>");
		resp.then( (data) => setUserList(data));
	}


	const eventHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);
		if(act_v == "select") {
			var key = evo.getAttribute("data-index");
			Config.log("key=" + key);
			let uItem = userList[key];
			if(uItem.contentList) {
				let data = uItem.contentList;
				const user_ids = data.map(item => item.userId).join(', ');
				Config.log(user_ids);
				opt.callback({list:user_ids, count:data.length});
				selfClose();
			}
		}
		else if(act_v == "close") {
			//isShow = false;
			selfClose();
		}
	};


	return (
		<Modal show={opt.isShow} onHide={selfClose} centered className="" size="lg">
			<Modal.Header closeButton>
				<Modal.Title>조건검색 대상자 불러오기</Modal.Title>
			</Modal.Header>
			<Modal.Body>
						{/* 검색 영역 */}
						<Form name="frmPopTemplate" id="frmPopTemplate" className="hide">
							<Row className="search__form">
								<Col>
									<Row className="search__form-group">
										<Col lg="auto">
											<InputGroup className="custom_datePicker">
												<InputGroup.Text className="form-label me-2">등록일</InputGroup.Text>
												<div className="mq-type">
													<Form.Control type="date" name="start_date" id="start_date" className="d-inline w-auto" />
													<InputGroup.Text>-</InputGroup.Text>
													<Form.Control type="date" name="end_date" id="end_date" className="d-inline w-auto" />
												</div>
											</InputGroup>
										</Col>
										<Col lg="auto">
											<Form.Select aria-label="system" className="d-inline-block w-auto" name="search_key" id="search_key">
												<option value="">세그먼트 그룹명</option>
											</Form.Select>
										</Col>
									</Row>
								</Col>
								<Col lg="2" className="text-end">
									<Button variant="outline-primary" data-act="popupTemplateSearch" onClick={eventHandle}>검색</Button>
								</Col>
							</Row>
						</Form>
						<div className="table__wrap mt-4">
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>No</th>
										<th scope='col'>세그먼트 그룹명</th>
										<th scope='col'>발송대상자</th>
										<th scope='col'>등록자</th>
										<th scope='col'>등록일</th>
										<th scope='col'></th>
									</tr>
								</thead>
								<tbody>
									{
										userList.map( (item, index) =>
											<tr>
												<td>{index - 0 + 1}</td>
												<td>{(item.name != null)?item.name:''} </td>
												<td>{item.contentList.length.toLocaleString()}</td>
												<td>{item.register}</td>
												<td>{item.registerAt}</td>
												<td>
													<Button size="sm" variant="outline-dark" data-index={index} data-act="select" onClick={eventHandle}>선택</Button>
												</td>
											</tr>

										)
									}
								</tbody>
							</Table>
							<div className="table__pagination hide">
								<Pagination>
									<Pagination.Prev />
									<Pagination.Item active>{1}</Pagination.Item>
									<Pagination.Item>{2}</Pagination.Item>
									<Pagination.Item>{3}</Pagination.Item>
									<Pagination.Next />
								</Pagination>
							</div>
						</div>
					</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={() => selfClose()}>닫기</Button>
			</Modal.Footer>
		</Modal>

	);
};

export default PopupSearchPushTarget;
