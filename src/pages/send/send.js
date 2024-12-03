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
	ButtonGroup,
	ToggleButton,
} from "react-bootstrap";
// import { useState } from 'react';
import { RiCircleFill } from "react-icons/ri";
import {Link} from "react-router-dom";
import Config from '../../common/config.js';
import app from '../../common/App';
import pushStat from '../../common/PushStat.js';
import {CommonUI} from '../../common/commonUI';

const Send = () => {
	const [mode, setMode] = useState("history");
	const [pushHistoryInfo, setPushHistoryInfo] = useState(  {currPage:1, totalRecords:0, pageItems:[]} );
	const [pushTalkInfo, setPushTalkInfo] = useState(  {currPage:1, totalRecords:0, pageItems:[]} );
	const [pushDailyInfo, setPushDailyInfo] = useState(  {currPage:1, totalRecords:0, pageItems:[]} );

	const [appList, setAppList] = useState([]);
	const [historyList, setHistoryList] = useState({list:[], sum:{count_total:0, count_deny:0, count_success:0, count_fail:0, count_ing:0, count_ready:0, count_recv:0, count_open:0}});
	const [talkList, setTalkList] =useState({list:[], sum:{count_total:0, count_deny:0, count_success:0, count_fail:0, count_ing:0, count_ready:0, count_recv:0, count_open:0}});
	const [dailyList, setDailyList] = useState([]);

	const [pushStatus1, setPushStatus1] = useState("total");
	const [pushStatus2, setPushStatus2] = useState("total");

	let selectedStatus1 = "total";
	let selectedStatus2 = "total";

	useEffect(() => {
		getAppList();
	}, []);

	const eventHandle = (ev) => {
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);

		if(act_v == "historySearch") {
			getHistoryList(1);
		}
		else if(act_v == "talkSearch") {
			getTalkList(1);
		}
		else if(act_v == "dailySearch") {
			getDailyList(1);
		}
		else if(act_v == "filter1") {
			let f_v = evo.getAttribute("data-id");
			selectedStatus1 = f_v;
			setPushStatus1(selectedStatus1);
			Config.log("f_v=" + f_v);
			getHistoryList(1);
		}
		else if(act_v == "filter2") {
			let f_v = evo.getAttribute("data-id");
			selectedStatus2 = f_v;
			setPushStatus2(selectedStatus2);
			Config.log("f_v=" + f_v);
			getTalkList(1);
		}
		else if(act_v == "downloadHistory") {
			let fm = document.querySelector("#frmSearch_1");
			if(pushStatus1 == "total") {
				fm.pushStatus.value = "";
			}
			else {
				fm.pushStatus.value = pushStatus1;
			}
			fm.action = Config.host_api + "/push/downloadExcelPushHistoryList";
			fm.submit();
		}
		else if(act_v == "downloadTalk") {
			let fm = document.querySelector("#frmSearch_2");
			if(pushStatus2 == "total") {
				fm.pushStatus.value = "";
			}
			else {
				fm.pushStatus.value = pushStatus2;
			}
			fm.action = Config.host_api + "/push/downloadExcelPushHistoryList2";
			fm.submit();
		}
		else if(act_v == "downloadDaily") {
			let fm = document.querySelector("#frmSearch_3");
			fm.action = Config.host_api + "/push/downloadExcelPushDailyList";
			fm.submit();
		}
	};	

	
	const goPage = (pageNum, mode) => {
		console.log("page=" + pageNum);
		if(mode == "history") {
			getHistoryList(pageNum);
		}
		else if(mode == "talk") {
			getTalkList(pageNum);
		}
		else if(mode == "daily") {
			getDailyList(pageNum);
		}
	}

	const getAppList = () => {
		const data = {};
		app.getList({data:data, callback:function(json) {
			if(json.list) {
				setAppList(json.list);
				getHistoryList(1);
				getTalkList(1);
				getDailyList(1);
			}
		}});
	}

	const getHistoryList = (pg) => {
		pushHistoryInfo.currPage = pg;
		const frm = document.querySelector("#frmSearch_1");
		const formData = new FormData(frm);
		const data = Object.fromEntries(formData.entries());
		if(selectedStatus1 != "total") {
			data["pushStatus"] = selectedStatus1;
		}
		data["page"] = pg - 1 + 1;
		data["pageSize"] = 20;
		pushStat.getHistoryList({data:data, callback:respHistoryList});
	}

	const getTalkList = (pg) => {
		pushTalkInfo.currPage = pg;
		const frm = document.querySelector("#frmSearch_2");
		const formData = new FormData(frm);
		const data = Object.fromEntries(formData.entries());
		if(selectedStatus2 != "total") {
			data["pushStatus"] = selectedStatus2;
		}
		data["page"] = pg - 1 + 1;
		data["pageSize"] = 20;
		pushStat.getHistoryList2({data:data, callback:respTalkList});
	}

	const getDailyList = (pg) => {
		pushHistoryInfo.currPage = pg;
		const frm = document.querySelector("#frmSearch_3");
		const formData = new FormData(frm);
		const data = Object.fromEntries(formData.entries());
		data["page"] = pg - 1 + 1;
		data["pageSize"] = 20;
		pushStat.getDailyList({data:data, callback:respDailyList});
	}

	const respHistoryList = function(obj) {
		if(obj.list) {
			if(obj.sum == null) {
				obj.sum = {count_total:0, count_deny:0, count_success:0, count_fail:0, count_ing:0, count_ready:0, count_recv:0, count_open:0};
			}
			setHistoryList({list:obj.list, sum:obj.sum});
			pushHistoryInfo.totalRecords = obj.count;
			let items = CommonUI.pagenationItems({currPage:pushHistoryInfo.currPage, pageSize:20, totalRecords:pushHistoryInfo.totalRecords, eventHandler:function(pg) {
				goPage(pg, "history");
			}})
			setPushHistoryInfo({currPage:pushHistoryInfo.currPage, totalRecords:pushHistoryInfo.totalRecords, pageItems:items});

		}
		else {
			setHistoryList({list:[], sum:{count_total:0, count_success:0, count_fail:0, count_ing:0, count_ready:0, count_recv:0, count_open:0}});
			pushHistoryInfo.totalRecords = 0;
		}
	};

	const respTalkList = function(obj) {
		if(obj != null && obj.list) {
			if(obj.sum == null) {
				obj.sum = {count_total:0, count_deny:0, count_success:0, count_fail:0, count_ing:0, count_ready:0, count_recv:0, count_open:0};
			}
			setTalkList({list:obj.list, sum:obj.sum});
			pushTalkInfo.totalRecords = obj.count;
			let items = CommonUI.pagenationItems({currPage:pushTalkInfo.currPage, pageSize:20, totalRecords:pushTalkInfo.totalRecords, eventHandler:function(pg) {
				goPage(pg, "talk");
			}});
			pushTalkInfo.pageItems = items;
			//setPushTalkInfo({currPage:pushTalkInfo.currPage, totalRecords:pushTalkInfo.totalRecords, pageItems:items});
		}
		else {
			setTalkList({list:[], sum:{count_total:0, count_success:0, count_fail:0, count_ing:0, count_ready:0, count_recv:0, count_open:0}});
			pushTalkInfo.totalRecords = 0;
		}
	};

	const respDailyList = function(obj) {
		if(obj.list) {
			setDailyList(obj.list);
			pushDailyInfo.totalRecords = obj.count;
			let items = CommonUI.pagenationItems({currPage:pushDailyInfo.currPage, pageSize:20, totalRecords:pushDailyInfo.totalRecords, eventHandler:function(pg) {
				goPage(pg, "daily");
			}});
			pushDailyInfo.pageItems = items;
		}
		else {
			setDailyList([]);
			pushDailyInfo.totalRecords = 0;
		}
	};

	return(
		<div className="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				<Tabs defaultActiveKey="sendReport1" id="" className="custom__tab">

					<Tab eventKey="sendReport1" title="푸시 발송이력">
						<div className="main__header">
							<h2 className="main__header-title">푸시 발송이력</h2>	
						</div>
						{/* 발송 상태별 탭 */}
						<div className="send__status-wrap">
							<ButtonGroup className="mt-2 mb-4">
								<ToggleButton variant={pushStatus1 == "total"?"outline-dark active": "outline-dark"} value="1"  className="" data-act="filter1" data-id="total" onClick={eventHandle}>전체<span>({historyList.sum.count_total.toLocaleString()})</span></ToggleButton>
								<ToggleButton variant={pushStatus1 == "C"?"outline-primary active": "outline-primary"} value="3" className="" data-act="filter1" data-id="C" onClick={eventHandle}><RiCircleFill /> 발송 완료<span>({historyList.sum.count_success.toLocaleString()})</span></ToggleButton>
								<ToggleButton variant={pushStatus1 == "I"?"outline-warning active": "outline-warning"} value="4" className="" data-act="filter1" data-id="I" onClick={eventHandle}><RiCircleFill /> 발송 중<span>({historyList.sum.count_ing.toLocaleString()})</span></ToggleButton>
								<ToggleButton variant={pushStatus1 == "R"?"outline-success active": "outline-success"} value="5" className="" data-act="filter1" data-id="R" onClick={eventHandle}><RiCircleFill /> 발송 예약<span>({historyList.sum.count_ready.toLocaleString()})</span></ToggleButton>
								<ToggleButton variant={pushStatus1 == "F"?"outline-danger active": "outline-danger"} value="6" className="" data-act="filter1" data-id="F" onClick={eventHandle}><RiCircleFill /> 발송 실패<span>({historyList.sum.count_fail.toLocaleString()})</span></ToggleButton>
							</ButtonGroup>
						</div>
						{/* 검색 영역 */}
						<Form name="frmSearch_1" id="frmSearch_1" method="post" >
							<input type="hidden" name="pushStatus" id="pushStatus" value=""/>
							<Row className="search__form">
								<Col>
									<Row className="search__form-group">
										<Col lg="auto">
											<Form.Select aria-label="" name="app_id" id="app_id">
												<option value="">전체</option>
												{
													appList.map((item, index) =>
														<option value={item.app_id}>{item.app_name}</option>
													)
												}
											</Form.Select>
										</Col>
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
											<Form.Select aria-label="system" name="source_path" id="source_path">
												<option value="system_test">전체</option>
												<option value="system">푸시</option>
												<option value="test">테스트</option>
											</Form.Select>
										</Col>
										<Col lg="auto">
											<Form.Select aria-label="system" name="target_type" id="target_type">
												<option value="">전체 푸시 </option>
												<option value="A">디바이스</option>
												<option value="E">엑셀</option>
												<option value="S">조건검색</option>
											</Form.Select>
										</Col>
										<Col lg="auto">
											<Form.Select aria-label="system" name="status" id="status">
												<option value="">전체</option>
												<option value="D">수신비동의</option>
												<option value="C">전송성공</option>
												<option value="I">발송중</option>
												<option value="F">전송실패</option>
												<option value="R">수신</option>
												<option value="O">오픈</option>
											</Form.Select>
										</Col>
										<Col lg="auto">
											<Form.Select aria-label="system" className="d-inline-block w-auto" name="search_key" id="search_key">
												<option value="title">제목</option>
												<option value="contents">내용</option>
											</Form.Select>
											<Form.Control type="text" name="search_val" id="search_val" className="d-inline-block w-auto ms-1" placeholder="" />
										</Col>
									</Row>
								</Col>
								<Col lg="1" className="text-end">
									<Button variant="outline-primary" data-act="historySearch" onClick={eventHandle}>검색</Button>
								</Col>
							</Row>
						</Form>
						<div className="table__wrap mt-4">
							<Row className="table__head">
								<Col>
									<span><strong>{pushHistoryInfo.totalRecords.toLocaleString()}</strong>건</span>
								</Col>
								<Col className="text-end">
									<Button type="button" data-act="downloadHistory" onClick={eventHandle}>엑셀 다운로드</Button>
								</Col>
							</Row>
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>ID</th>
										<th scope='col'>발송(예약)일시</th>
										<th scope='col'>앱이름</th>
										<th scope='col'>싱태</th>
										<th scope='col'>소스</th>
										<th scope='col'>대상</th>
										<th scope='col'>메시지</th>
										<th scope='col'>발송대상</th>
										<th scope='col'>수신비동의</th>
										<th scope='col'>전송성공</th>
										<th scope='col'>전송실패</th>
										<th scope='col'>앱수신</th>
										<th scope='col'>오픈</th>
									</tr>
								</thead>
								<tbody>
									{
										historyList.list.length > 0 ?
										historyList.list.map( (item, index) =>
											<tr>
												<td>{item.seq}</td>
												<td>{item.send_date_str?item.send_date_str:item.reserve_date_str}</td>
												<td>{item.app_name}</td>
												<span className={"send__status " + Config.getPushStatuCss(item.status)}><RiCircleFill />{Config.getPushStatuName(item.status)}</span>
												<td>{item.source_path == 'test'?'테스트':'푸시'}</td>
												<td>{item.source_path == 'test'?'-':Config.getTargetName(item.target_type)}</td>
												<td className="text-start"><div className="text-truncate " >{item.push_label}</div></td>
												<td>{item.count_total.toLocaleString()}</td>
												<td>{item.count_deny.toLocaleString()}</td>
												<td>{item.count_success.toLocaleString()}</td>
												<td>{item.count_fail.toLocaleString()}</td>
												<td>{item.count_success.toLocaleString()}</td>
												<td>{item.count_open.toLocaleString()}</td>
											</tr>
										)
										: (<tr><td colSpan={13}>데이터가 없습니다.</td></tr>)
									}

								</tbody>
							</Table>
							<div className="table__pagination">
								<Pagination>{pushHistoryInfo.pageItems}</Pagination>
							</div>
						</div>
					</Tab>


					<Tab eventKey="serverReport2" title="서버연동 발송이력">
						<div className="main__header">
							<h2 className="main__header-title">서버연동 발송이력</h2>	
						</div>
						{/* 발송 상태별 탭 */}
						<div className="send__status-wrap">
							<ButtonGroup className="mt-2 mb-4 ">
							<ToggleButton variant={pushStatus2 == "total"?"outline-dark active": "outline-dark"} value="1"  className="" data-act="filter2" data-id="total" onClick={eventHandle}>전체<span>({talkList.sum.count_total.toLocaleString()})</span></ToggleButton>
								<ToggleButton variant={pushStatus2 == "C"?"outline-primary active": "outline-primary"} value="3" className="" data-act="filter2" data-id="C" onClick={eventHandle}><RiCircleFill /> 발송 완료<span>({talkList.sum.count_success.toLocaleString()})</span></ToggleButton>
								<ToggleButton variant={pushStatus2 == "I"?"outline-warning active": "outline-warning"} value="4" className="" data-act="filter2" data-id="I" onClick={eventHandle}><RiCircleFill /> 발송 중<span>({talkList.sum.count_ing.toLocaleString()})</span></ToggleButton>
								<ToggleButton variant={pushStatus2 == "R"?"outline-success active": "outline-success"} value="5" className="" data-act="filter2" data-id="R" onClick={eventHandle}><RiCircleFill /> 발송 예약<span>({talkList.sum.count_ready.toLocaleString()})</span></ToggleButton>
								<ToggleButton variant={pushStatus2 == "F"?"outline-danger active": "outline-danger"} value="6" className="" data-act="filter2" data-id="F" onClick={eventHandle}><RiCircleFill /> 발송 실패<span>({talkList.sum.count_fail.toLocaleString()})</span></ToggleButton>
							</ButtonGroup>
						</div>
						{/* 검색 영역 */}
						<Form name="frmSearch_2" id="frmSearch_2" method="post">
							<input type="hidden" name="pushStatus" id="pushStatus" value=""/>
							<Row className="search__form">
								<Col>
									<Row className="search__form-group">
										<Col lg="auto">
											<Form.Select aria-label="" name="app_id" id="app_id">
												<option value="">전체</option>
												{
													appList.map((item, index) =>
														<option value={item.app_id}>{item.app_name}</option>
													)
												}
											</Form.Select>
										</Col>
										<Col lg="auto">
											<InputGroup className="custom_datePicker">
												<InputGroup.Text className="form-label me-2">발송일</InputGroup.Text>
												<div className="mq-type">
													<Form.Control type="date" name="start_date" id="start_date" className="d-inline w-auto" />
													<InputGroup.Text>-</InputGroup.Text>
													<Form.Control type="date" name="end_date" id="end_date" className="d-inline w-auto" />
												</div>
											</InputGroup>
										</Col>
										<Col lg="auto">
											<Form.Select aria-label="system" name="source_path" id="source_path">
												<option value="not_system">전체</option>
												<option value="talk">알림톡</option>
												<option value="sms">문자</option>
											</Form.Select>
										</Col>
										<Col lg="auto">
											<Form.Select aria-label="system" name="status" id="status">
												<option value="">전체</option>
												<option value="D">수신비동의</option>
												<option value="C">전송성공</option>
												<option value="I">발송중</option>
												<option value="F">전송실패</option>
												<option value="R">수신</option>
												<option value="O">오픈</option>
											</Form.Select>
										</Col>
										<Col lg="auto">
											<Form.Select aria-label="system" className="d-inline-block w-auto" name="search_key" id="search_key">
												<option value="title">제목</option>
												<option value="contents">내용</option>
											</Form.Select>
											<Form.Control type="text" name="search_val" id="search_val" className="d-inline-block w-auto ms-1" placeholder="" />
										</Col>
									</Row>
								</Col>
								<Col lg="1" className="text-end">
									<Button variant="outline-primary" data-act="talkSearch" onClick={eventHandle}>검색</Button>
								</Col>
							</Row>
						</Form>
						<div className="table__wrap mt-4">
							<Row className="table__head">
								<Col>
									<span><strong>{pushTalkInfo.totalRecords.toLocaleString()}</strong>건</span>
								</Col>
								<Col className="text-end">
									<Button type="button" data-act="downloadTalk" onClick={eventHandle}>엑셀 다운로드</Button>
								</Col>
							</Row>
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>ID</th>
										<th scope='col'>발송(예약)일시</th>
										<th scope='col'>앱이름</th>
										<th scope='col'>싱태</th>
										<th scope='col'>소스</th>
										<th scope='col'>대상</th>
										<th scope='col'>메시지</th>
										<th scope='col'>발송대상</th>
										<th scope='col'>수신비동의</th>
										<th scope='col'>전송성공</th>
										<th scope='col'>전송실패</th>
										<th scope='col'>앱수신</th>
										<th scope='col'>오픈</th>
									</tr>
								</thead>
								<tbody>
								{
										talkList.list.length > 0 ?
										talkList.list.map( (item, index) =>
											<tr>
												<td>{item.seq}</td>
												<td>{item.send_date_str?item.send_date_str:item.reserve_date_str}</td>
												<td>{item.app_name}</td>
												<span className={"send__status " + Config.getPushStatuCss(item.status)}><RiCircleFill />{Config.getPushStatuName(item.status)}</span>
												<td>{Config.getSourcePathName(item.source_path)}</td>
												<td>{item.name}({item.email})</td>
												<td className="text-start"><div className="text-truncate " >{item.title}</div></td>
												<td>{item.count_total.toLocaleString()}</td>
												<td>{item.count_deny.toLocaleString()}</td>
												<td>{item.count_success.toLocaleString()}</td>
												<td>{item.count_fail.toLocaleString()}</td>
												<td>{item.count_success.toLocaleString()}</td>
												<td>{item.count_open.toLocaleString()}</td>
											</tr>
										)
										: (<tr><td colSpan={13}>데이터가 없습니다.</td></tr>)
									}
								</tbody>
							</Table>
							<div className="table__pagination">
								<Pagination>{pushTalkInfo.pageItems}</Pagination>
							</div>
						</div>
					</Tab>


					<Tab eventKey="sendDayReport" title="일별 발송이력">
						<div className="main__header">
							<h2 className="main__header-title">일별 발송이력</h2>	
						</div>
						{/* 검색 영역 */}
						<Form name="frmSearch_3" id="frmSearch_3" method="post">
							<Row className="search__form">
								<Col>
									<Row className="search__form-group">
										<Col lg="auto">
											<Form.Select aria-label="" name="app_id" id="app_id">
												<option value="">전체</option>
												{
													appList.map((item, index) =>
														<option value={item.app_id}>{item.app_name}</option>
													)
												}
											</Form.Select>
										</Col>
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
											<Form.Select aria-label="system" name="source_path" id="source_path">
												<option value="">전체</option>
												<option value="system">푸시</option>
												<option value="talk">알림톡</option>
												<option value="sms">문자</option>
												<option value="test">테스트</option>
											</Form.Select>
										</Col>
									</Row>
								</Col>
								<Col lg="1" className="text-end">
									<Button variant="outline-primary" data-act="dailySearch" onClick={eventHandle}>검색</Button>
								</Col>
							</Row>
						</Form>
						
						<div className="table__wrap mt-4">
							<Row className="table__head">
								<Col>
									<span><strong>{pushDailyInfo.totalRecords.toLocaleString()}</strong>건</span>
								</Col>
								<Col className="text-end">
									<Button type="button" data-act="downloadDaily" onClick={eventHandle}>엑셀 다운로드</Button>
								</Col>
							</Row>
							<Table bordered responsive>
								<thead>
									<tr>
										<th scope='col'>발송 일자</th>
										<th scope='col'>앱이름</th>
										<th scope='col'>소스</th>
										<th scope='col'>총 발송건수</th>
										<th scope='col'>성공 합계</th>
										<th scope='col'>(AOS)</th>
										<th scope='col'>(IOS)</th>
										<th scope='col'>실패 합계</th>
										<th scope='col'>(AOS)</th>
										<th scope='col'>(ISO)</th>
									</tr>
								</thead>
								<tbody>
									{
										dailyList.length > 0 ?
										dailyList.map( (item, index) =>
											<tr>
												<td>{item.send_ymd}</td>
												<td>{item.app_name}</td>
												<td>{Config.getSourcePathName(item.source_path)}</td>
												<td>{item.count_total.toLocaleString()}</td>
												<td>{item.count_success.toLocaleString()}</td>
												<td>{item.count_success_aos.toLocaleString()}</td>
												<td>{item.count_success_ios.toLocaleString()}</td>
												<td>{item.count_fail.toLocaleString()}</td>
												<td>{item.count_fail_aos.toLocaleString()}</td>
												<td>{item.count_fail_ios.toLocaleString()}</td>
											</tr>
										)
										: (<tr><td colSpan={10}>데이터가 없습니다.</td></tr>)
									}
								</tbody>
							</Table>
							<div className="table__pagination">
								<Pagination>{pushDailyInfo.pageItems}</Pagination>
							</div>
						</div>
					</Tab>
				</Tabs>
			</Container>
		</div>
	);
};
export default Send;

