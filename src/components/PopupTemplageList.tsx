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

const PopupTemplateList = (opt) => {
	//Config.log("PopupTemplateList opt-->");
	//Config.log(opt);

	const [msgInfo, setMsgInfo] = useState({list:[], pageItems:[]});
	let currPage = 1;
	let totalCount = 0;

	useEffect( () => {
	});

	const selfClose = function() {
		opt.close(false);
	};

	let goPage = (pg) => {
		getList(pg);
	}

	const getList = function (pg) {
		currPage = pg;
		const frm = document.querySelector("#frmPopTemplageSearch");
		if(frm) {
			const formData = new FormData(frm);
			const data = Object.fromEntries(formData.entries());
			messageTemplate.getList({data:data, callback:function(json) {
				if(json.list) {
					totalCount = json.count;
					let items = CommonUI.pagenationItems({currPage:currPage, pageSize:10, totalRecords:totalCount, eventHandler:function(pg) {
						goPage(pg);
					}})
					setMsgInfo({list:json.list, pageItems:items});
				}
			}});
		}
	}

	const eventHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		let frm = document.querySelector("#frmPopTemplageSearch");
		console.log("act = " + act_v);
		if(ev.type == "click") {
			if(act_v == "close") {
				selfClose();
			}
			else if(act_v == "search") {
				getList(1);
			}
			else if(act_v == "selected") {
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
		<Modal show={opt.isShow} onHide={selfClose} centered className="">
			<Modal.Header closeButton>
				<Modal.Title>템플릿 불러오기</Modal.Title>
			</Modal.Header>
			<Modal.Body>
						{/* 검색 영역 */}
						<Form name="frmPopTemplageSearch" id="frmPopTemplageSearch" method="post">
							<Row className="search__form">
								<Col>
									<Row className="search__form-group">
										<Col lg="auto">
											<Form.Select aria-label="system" className="d-inline-block w-auto" name="search_key" id="search_key">
												<option value="title">제목</option>
												<option value="contents">본문</option>
											</Form.Select>
											<Form.Control type="text" name="search_val" id="search_val" className="d-inline-block w-auto ms-1" placeholder="" />
										</Col>
									</Row>
								</Col>
								<Col lg="2" className="text-end">
									<Button variant="outline-primary" data-act="search" onClick={eventHandle}>검색</Button>
								</Col>
							</Row>
						</Form>
						<div className="table__wrap mt-4">
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>등록일</th>
										<th scope='col'>제목</th>
										<th scope='col'>선택</th>
									</tr>
								</thead>
								<tbody>
									{
										msgInfo.list.length > 0 ?
										msgInfo.list.map( (item, index) =>
											<tr>
												<td>{item.reg_date_str}</td>
												<td>{item.title}</td>
												<td>
													<Button size="sm" data-id={index} data-act="selected" onClick={eventHandle} variant="outline-dark">선택</Button>
												</td>
											</tr>
										)
										: (<tr><td colSpan={3}>데이터가 없습니다.</td></tr>)
									}


								</tbody>
							</Table>
							<div className="table__pagination">
								<Pagination>{msgInfo.pageItems}</Pagination>
							</div>
						</div>
					</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" data-act="close" onClick={(ev) => eventHandle(ev)}>닫기</Button>
			</Modal.Footer>
		</Modal>


	);
};

export default PopupTemplateList;
