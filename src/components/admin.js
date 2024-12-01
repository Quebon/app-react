import React, { useState, useEffect } from 'react';
import Header from "./../../components/Header";
import {
	Container,
	Row,
	Col,
	Button,
	Pagination,
	Table,
	Form,
	InputGroup,
	Tab,
	Tabs,
} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Popup, Alert} from '../../common/popup';
import account from '../../common/Account';
import {CommonUI} from '../../common/commonUI';

const Admin = () => {
	const listInfo = {currPage:1, totalPage:0};
	const logInfo = {currPage:1, totalPage:0};

	const [itemList, setItemList] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const [pageItems, setPageItems] = useState([]);
	const [cnt, setCnt] = useState(1);


	const [logList, setLogList] = useState([]);
	const [itemLogList, setItemLogList] = useState([]);
	const [pageLogItems, setPageLogItems] = useState([]);
	const [totalLogCount, setTotalLogCount] = useState(0);

	const [totalItems, setTotalItems] = useState(0);
	const page = 1;

	const eventHandle = (ev) => {
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		Config.log("act = " + act_v);


		if(act_v == "search") {
			getList(1);
		}
		else if(act_v == "searchLog") {
			getLogList(1);
		}
		else if(act_v == "add") {
			document.location.href = "/admin/add";
		}
		else if(act_v == "modify") {
			let seq_v = evo.getAttribute("data-id");
			document.location.href = "/admin/edit/" + seq_v;
		}
		else if(act_v == "delete") {
			let seq_v = evo.getAttribute("data-id");
			if(window.confirm("삭제하시겠습니까?")) {
				const data = {"seq":seq_v};
				account.deleteUser({data:data, callback:response2});
			}
		}
	};

	const goPage = (pageNum) => {
		Config.log("page=" + pageNum);
		getList(pageNum);
	}

	const goLogPage = (pageNum) => {
		Config.log("page=" + pageNum);
		getLogList(pageNum);
	}

	const getList = (pg) => {
		listInfo.currPage = pg;
		const frm = document.querySelector("#frmSearch");
		const formData = new FormData(frm);
		const data = Object.fromEntries(formData.entries());
		data["page"] = pg - 1 + 1;
		data["pageSize"] = 10;
		account.getList({data:data, callback:response});
	}

	const getLogList = (pg) => {
		logInfo.currPage = pg;
		const frm = document.querySelector("#frmLogSearch");
		const formData = new FormData(frm);
		const data = Object.fromEntries(formData.entries());
		data["page"] = pg - 1 + 1;
		data["pageSize"] = 10;
		account.getLogList({data:data, callback:responseLog});
	}


	useEffect(() => {
		getList(1);
		getLogList(1);
	}, []);

	const responseLog = function(obj) {
		if(obj) {
			if(obj.list) {
				setItemLogList(obj.list);
				setTotalLogCount(obj.totCnt);
				let items2 = CommonUI.pagenationItems({currPage:logInfo.currPage, totalRecords:obj.totCnt, eventHandler:goLogPage})
				setPageLogItems(items2);
				Config.log(items2);
			}
			else {
				setItemLogList([]);
			}
		}
		else {
			setItemLogList([]);
		}
	};


	const response = function(obj) {
		if(obj) {
			if(obj.list) {
				setItemList(obj.list);
				setTotalCount(obj.totCnt);
				let items = CommonUI.pagenationItems({currPage:listInfo.currPage, totalRecords:obj.totCnt, eventHandler:goPage})
				setPageItems(items);
				Config.log(items);
			}
			else {
				setItemList([]);
			}
		}
		else {
			setItemList([]);
		}
	};

	const response2 = function(obj) {
		if(obj) {
			if(obj.seq > 0) {
				alert("삭제하였습니다.");
				getList(listInfo.currPage);
			}
			else {
				alert("삭제에 실패하였습니다.\n다시 시도해주세요.");
			}
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
				<Tabs defaultActiveKey="admin" id="" className="custom__tab">
					<Tab eventKey="admin" title="운영자 관리">
						<div className="main__header">
							<h2 className="main__header-title">운영자 관리</h2>	
						</div>
						{/* 검색 영역 */}
						<Form name="frmSearch" id="frmSearch">
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
											<Form.Group as="span" >
												<Form.Label column className="me-2">아이디</Form.Label>
												<Form.Control type="text" name="login_id" id="login_id" className="d-inline w-auto" />
											</Form.Group>
										</Col>
										<Col lg="auto">
											<Form.Group as="span" >
												<Form.Label column className="me-2">성명</Form.Label>
												<Form.Control type="text" name="user_name" id="user_name" className="d-inline w-auto" />
											</Form.Group>
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
									<span><strong>{totalCount.toLocaleString()}</strong>건</span>
								</Col>
								<Col className="text-end">
									<Button data-act="add" onClick={eventHandle}>운영자 등록</Button>
								</Col>
							</Row>
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>No</th>
										<th scope='col'>등록일</th>
										<th scope='col'>아이디</th>
										<th scope='col'>성명</th>
										<th scope='col'>이메일</th>
										<th scope='col'>권한</th>
										<th scope='col'>편집</th>
									</tr>
								</thead>
								<tbody>
									{
										itemList.length > 0 ?
										itemList.map( (item, index) =>
											<tr>
												<td>{index + 1}</td>
												<td>{item.reg_date_str}</td>
												<td><Link to={"/admin/view/" + item.seq}>{item.login_id}</Link></td>
												<td><Link to={"/admin/view/" + item.seq}>{item.user_name}</Link></td>
												<td>{item.email}</td>
												<td>{(item.user_level=="A")?"어드민":"운영자"} </td>
												<td>
													<Button size="sm" variant="outline-dark" data-act="modify" data-id={item.seq} onClick={eventHandle}>수정</Button>
													<Button size="sm" variant="outline-dark ms-2" data-act="delete" data-id={item.seq} onClick={eventHandle}>삭제</Button>
												</td>
											</tr>
										)
										: (<tr><td colSpan={7}>데이터가 없습니다.</td></tr>)
									}
								</tbody>
							</Table>
							<div className="table__pagination">
								<Pagination>{pageItems}</Pagination>
								{/*<Pagination>
									<Pagination.Prev />
									<Pagination.Item active>{1}</Pagination.Item>
									<Pagination.Item>{2}</Pagination.Item>
									<Pagination.Item>{3}</Pagination.Item>
									<Pagination.Item>{4}</Pagination.Item>
									<Pagination.Item>{5}</Pagination.Item>
									<Pagination.Next />
								</Pagination>*/}
							</div>
						</div>
					</Tab>
					<Tab eventKey="log" title="접속 로그">
						<div className="main__header">
							<h2 className="main__header-title">접속 로그</h2>	
						</div>
						{/* 검색 영역 */}
						<Form name="frmLogSearch" id="frmLogSearch">
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
											<Form.Group as="span" controlId="">
												<Form.Label column className="me-2">접속 아이디</Form.Label>
												<Form.Control type="text" name="user_id" id="user_id" className="d-inline w-auto" />
											</Form.Group>
										</Col>
										<Col lg="auto">
											<Form.Group as="span" controlId="">
												<Form.Label column className="me-2">성명</Form.Label>
												<Form.Control type="text" name="user_name" id="user_name" className="d-inline w-auto" />
											</Form.Group>
										</Col>
									</Row>
								</Col>
								<Col lg="1" className="text-end">
									<Button variant="outline-primary" data-act="searchLog" onClick={eventHandle}>검색</Button>
								</Col>
							</Row>
						</Form>
						
						<div className="table__wrap mt-4">
							<Row className="table__head">
								<Col>
									<span><strong>{totalLogCount.toLocaleString()}</strong>건</span>
								</Col>
								<Col className="text-end">
									
								</Col>
							</Row>
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>No</th>
										<th scope='col'>접속 일시</th>
										<th scope='col'>접속 아이디</th>
										<th scope='col'>성명</th>
									</tr>
								</thead>
								<tbody>
								{
										itemLogList.length > 0 ?
										itemLogList.map( (item, index) =>

											<tr>
												<td>{index + 1}</td>
												<td>{item.access_date_str}</td>
												<td><Link to="/AdminDetail" target='page'>{item.user_id}</Link></td>
												<td><Link to="/AdminDetail" target='page'>{item.user_Name}</Link></td>
											</tr>
										)
										: (<tr><td colSpan={4}>데이터가 없습니다.</td></tr>)
									}

								</tbody>
							</Table>
							<div className="table__pagination">
								<Pagination>{pageLogItems}</Pagination>
							</div>
						</div>
					</Tab>
				</Tabs>
			
				
			</Container>
		</div>
	);
};
export default Admin;

