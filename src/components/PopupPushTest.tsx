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
import Config from '../common/config.js';
import pushInput from '../common/PushInput.js';
import {CommonUI} from '../common/commonUI.js';


const PopupPushTest = (opt) => {
	//Config.log("PopupPushTest opt-->");
	//Config.log(opt);

	const [open, setOpen] = useState(false);
	const [selectedList, setSelectedList] = useState([]);
	const [userList, setUserList] = useState([]);
	const [pageList, setPageList] = useState({currPage:1, totalRecords:0, pageItems:[]});



	useEffect( () => {
		Config.log("refresh 1");
	}, [selectedList, userList]);

	const selfClose = function() {
		setUserList([]);
		setSelectedList([]);
		opt.close(false);
		//opt.isShow = false;
	};


	const load = (pg) => {
		pageList.currPage = pg - 1 + 1;
		let data = {};
		const frm = document.querySelector("#frmPopupUserSearch");
		if(frm) {
			const formData = new FormData(frm);
			data = Object.fromEntries(formData.entries());
		}
		data["page"] = pg - 1 + 1;
		data["pageSize"] = 10;
		pushInput.getSearchUserList({data:data, callback:function(json) {
			if(json.list) {
				pageList.totalRecords = json.count;
				let items = CommonUI.pagenationItems({currPage:pageList.currPage, totalRecords:pageList.totalRecords, eventHandler:function(pg) {
					goPage(pg);
				}});
				pageList.pageItems = items;
				setUserList(json.list);
			}
		}});
	}

	const goPage = (pageNum) => {
		load(pageNum);
	}


	const eventHandle = (ev: React.ChangeEvent<HTMLInputElement>) => {
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);
		if(act_v == "search") {
			load(1);
		}
		else if(act_v == "close") {
			//isShow = false;
			selfClose();
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
				setSelectedList( selectedList.concat(item) );
				Config.log("add");
			}
		}
		else if(act_v == "remove") {
			let idx =  Number(evo.getAttribute("data-index")) ;
			let data = [...selectedList];
			data.splice(idx, 1);
			setSelectedList(data);
		}
		else if(act_v == "goTest") {
			Config.log("test send go!!");
			let data = opt.data.sendInfo;
			data.set("limit_night", "N");
			data.set("source_path", "test");
			data.set("target_type", "E");
			data.set("userList", JSON.stringify(selectedList));
			//data["userList"] = selectedList;
			Config.log(data);
			pushInput.addPushQueue({
				data:data,
				callback:function(json) {
					Config.log(json);
					if(json.seq > 0) {
						alert("발송이 성공하였습니다.");
					}
					else {
						alert("발송에 실패하였습니다.\n다시 시도해주세요.");
					}
				}
			});

		}
	};


	return (
		<Modal show={opt.isShow} onHide={selfClose} centered className="" size="lg">
			<Modal.Header closeButton>
				<Modal.Title>테스트 발송</Modal.Title>
			</Modal.Header>
			<Modal.Body>
						<Form name="frmPopupUserSearch" id="frmPopupUserSearch">
							<Row className="search__form">
								<Col>
									<Row className="search__form-group">
										<Col lg="auto">
											<Form.Select aria-label="system" className="d-inline-block w-auto" name="search_key" id="search_key">
												<option value="name">성명</option>
												<option value="user_id">회원 ID</option>
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
							<div className="select__list mb-3">
								{
									selectedList.map( (item, index) => {
										return (
											<span className="select__list-item">{item.name}({item.email}) <Button size="sm" data-index={index} key={index} variant="" data-act="remove" onClick={eventHandle}><RiCloseLine /></Button></span>
										);
									})
								}
							</div>
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>No</th>
										<th scope='col'>회원ID</th>
										<th scope='col'>성명</th>
										<th scope='col'>전화번호</th>
										<th scope='col'>플랫폼</th>
										<th scope='col'></th>
									</tr>
								</thead>
								<tbody>
									{
										userList.length > 0 ?
										userList.map((item, index) =>
											<tr>
												<td>{index + 1}</td>
												<td>{item.email}</td>
												<td>{item.name}</td>
												<td>{item.mobile}</td>
												<td>{item.platform}</td>
												<td>
													<Button size="sm" variant="outline-dark" key={index} data-index={index} data-act="selected" onClick={eventHandle}>선택</Button>
												</td>
											</tr>
										)
										: (<tr><td colSpan={6}>데이터가 없습니다.</td></tr>)
									}
								</tbody>
							</Table>
							<div className="table__pagination">
								<Pagination>{pageList.pageItems}</Pagination>
							</div>
						</div>
					</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" data-act="close"  onClick={() => opt.close(false)}>취소</Button>
				<Button variant="primary" data-act="goTest" onClick={eventHandle}>테스트 발송</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default PopupPushTest;
