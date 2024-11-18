import React, { useState, useEffect } from 'react';
import Header from "./../../components/Header";
import {
	Container,
	Row,
	Col,
	Button,
	Table,
	Pagination,
} from "react-bootstrap";
import {Link} from "react-router-dom";
import app from '../../common/App';
import {CommonUI} from '../../common/commonUI';

const AppInfo = () => {
	const [itemList, setItemList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [pageItems, setPageItems] = useState([]);
	const [cnt, setCnt] = useState(1);

	const eventHandle = (ev) => {
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);


		if(act_v == "add") {
			document.location.href = "/app/add";
		}
		else if(act_v == "modify") {
			let seq_v = evo.getAttribute("data-id");
			document.location.href = "/app/edit/" + seq_v;
		}
		else if(act_v == "delete") {
			let seq_v = evo.getAttribute("data-id");
			if(window.confirm("삭제하시겠습니까?")) {
				const data = {"seq":seq_v};
				app.deleteApp({data:data, callback:response2});
			}
		}
	};

	const goPage = (pageNum) => {
		console.log("page=" + pageNum);
		getList(pageNum);
	}

	const getList = (pg) => {
		setCurrentPage(pg);
		const data = {};
		data["page"] = pg - 1 + 1;
		data["pageSize"] = 10;
		app.getList({data:data, callback:response});
	}

	useEffect(() => {
		getList(1);
	}, []);

	const response = function(obj) {
		if(obj) {
			if(obj.list) {
				setItemList(obj.list);
				setTotalCount(obj.totCnt);
				let items = CommonUI.pagenationItems({currPage:currentPage, totalRecords:obj.totCnt, eventHandler:goPage})
				setPageItems(items);
				console.log(items);
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
				getList(currentPage);
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
				<div className="main__header">
					<h2 className="main__header-title">앱 정보 관리</h2>	
				</div>
				
				<div className="table__wrap mt-4">
					<Row className="table__head">
						<Col>
							<span><strong>{totalCount.toLocaleString()}</strong>건</span>
						</Col>
						<Col className="text-end">
							<Button data-act="add" onClick={eventHandle}>앱 정보 등록</Button>
						</Col>
					</Row>
					<Table bordered responsive>
						<thead>
							<tr>
								<th scope='col'>No</th>
								<th scope='col'>등록일</th>
								<th scope='col'>변경일</th>
								<th scope='col'>앱 이름</th>
								<th scope='col'>앱 ID</th>
								<th scope='col'>플랫폼</th>
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
										<td>{item.update_date_str}</td>
										<td><Link to={"/app/view/" + item.seq}>{item.app_name}</Link></td>
										<td><Link to={"/app/view/" + item.seq}>{item.app_id}</Link></td>
										<td>{item?(item.aos_package_name?'Android OS':''):''} {item?(item.ios_package_name?'iOS':''):''}</td>
										<td>
											<Button size="sm" variant="outline-dark" data-id={item.seq} data-act="modify" onClick={eventHandle}>수정</Button>
											<Button size="sm" variant="outline-dark ms-2" data-id={item.seq} data-act="delete" onClick={eventHandle}>삭제</Button>
										</td>
									</tr>
								)
								: (<tr><td colSpan={7}>데이터가 없습니다.</td></tr>)
							}

						</tbody>
					</Table>
					<div className="table__pagination">
						<Pagination>{pageItems}</Pagination>
					</div>
				</div>
			</Container>
		</div>
	);
};
export default AppInfo;

