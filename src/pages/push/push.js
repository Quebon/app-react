import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "./../../components/Header";
import {
	Container,
	Row,
	Col,
	Button,
	Table,
	Form,
	InputGroup,
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
import Img1x1 from './../../assets/images/temp_appIcon.png';
import Img3x2 from './../../assets/images/img_3x2.png';
import FileUpload from '../../components/FileUpload.tsx';
import Config from '../../common/config.js';
import {Link} from "react-router-dom";
import app from '../../common/App';
import sender from '../../common/Sender';
import pushStat from '../../common/PushStat.js';
import pushInput from '../../common/PushInput.js';
import {CommonUI} from '../../common/commonUI';

const Push = () => {
	const {seq} = useParams();
	const [today, setToday] = useState("");

	const [baseNode, setBaseNode] = useState({object:null , name:""});	// 푸시메세지, 웹뷰 메세지 구분

	const [targetType1, setTargetType1] = useState("A");
	const [targetType2, setTargetType2] = useState("A");
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [openTestModal, setOpenTestModal] = useState(false);
	const [templateModal, setTemplateModal] = useState(false);
	const [previewModal, setPreviewModal] = useState(false);
	const [filedownModal, setFiledownModal] = useState(false);
	const [checkContents, setCheckContents] = useState(true);

	const [messageType1, setMessageType1] = useState("info");
	const [messageType2, setMessageType2] = useState("info");

	const [sendType1, setSendType1] = useState("D");
	const [sendType2, setSendType2] = useState("D");

	const [limitNight1, setLimitNight1] = useState("Y");
	const [limitNight2, setLimitNight2] = useState("Y");


	const [appList, setAppList] = useState([]);
	const [senderList, setSenderList] = useState([]);


	useEffect(() => {
		if(seq > 0) {
			//getInfo();
		}
		else {
			const today = new Date();
			const date_v = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			setToday(date_v);
			//setRegInfo(date_v);
		}
		getAppList();
		getSenderList();
	}, []);

	const getAppList = () => {
		const data = {};
		app.getList({data:data, callback:function(json) {
			if(json.list) {
				setAppList(json.list);
			}
		}});
	}

	const getSenderList = () => {
		const data = {};
		sender.getList({data:data, callback:function(json) {
			if(json.list) {
				setSenderList(json.list);
			}
		}});
	}


	const eventHandle = (ev) => {
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");

		let base = CommonUI.findParentNode(evo, "form", null);
		if(base) {
			let id_v = base.getAttribute("data-id");
			setBaseNode({object:base, "name":id_v});
		}
		else {
			setBaseNode({object:null, name:""});
		}
		if(base)
			console.log("form id=" + base.id +  ", event=" + ev.type + ", act = " + act_v);
		else 
			console.log("form id=null" +  ", event=" + ev.type + ", act = " + act_v);

		if(ev.type == "click") {
			if(act_v == "search") {
				//getTemplateList(1);
			}
			else if(act_v == "openTemplage") {
				setTemplateModal(true);				
			}
			else if(act_v == "previewTemplate") {
				setPreviewModal(true);
			}
			else if(act_v == "add_excel") {
				if(base.id == "frmPushMsg") {
					setTargetType1("E");
				}
				else {
					setTargetType2("E");
				}
				setFiledownModal(true);
			}
			else if(act_v == "target_search") {
				if(base.id == "frmPushMsg") {
					setTargetType1("S");
				}
				else {
					setTargetType2("S");
				}
				setOpenSearchModal(true);
			}
			else if(act_v == "send_test") {
				setOpenTestModal(true);
			}
			else if(act_v == "send_save") {
				if(validation(base)) {
					const formData = new FormData(base);
					const data = Object.fromEntries(formData.entries());
					Config.log(data);
					Config.log("send");
					pushInput.addPushQueue({
						data:data,
						callback:function(json) {
							if(json.seq > 0) {
								alert("발송이 성공하였습니다.");
							}
							else {
								alert("발송에 실패하였습니다.\n다시 시도해주세요.");
							}
						}
					});
				}
				else {
					alert("모든 정보를 규칙에 맞게 입력해야 발송 가능합니다.");
				}
			}
			ev.preventDefault();
		}
		else if(ev.type == "change") {
			if(act_v == "target_device") {
				if(base.id == "frmPushMsg") {
					setTargetType1("A");
				}
				else {
					setTargetType2("A");
				}
				let senddata = {};
				if(evo.selectedIndex == 0) {
					let obj = baseNode.object.querySelector("#target_number");
					obj.innerHTML = "총 발송대상 : 0명";
					return;
				}
				senddata["target_device"] = evo.options[evo.selectedIndex].value;
				pushInput.getPushUserCount({
					data:senddata,
					callback:function(json) {
						if(baseNode.object) {
							let obj = baseNode.object.querySelector("#target_number");
							if(obj) {
								obj.innerHTML = "총 발송대상 : " + json.count + "명";
							}
						}
					}
				});
			}
			else if(act_v == "target_type") {
				if(base.id == "frmPushMsg") {
					setTargetType1(ev.target.value );
				}
				else {
					setTargetType2(ev.target.value);
				}
			}
			else if(act_v == "message_type") {
				//ev.persist();
				console.log(ev.target.value);
				if(base.id == "frmPushMsg") {
					setMessageType1(ev.target.value );
				}
				else {
					setMessageType2(ev.target.value);
				}
			}
			else if(act_v == "send_type") {
				//ev.persist();
				console.log(ev.target.value);
				if(base.id == "frmPushMsg") {
					setSendType1(ev.target.value );
				}
				else {
					setSendType2(ev.target.value);
				}
			}
			else if(act_v == "limit_night") {
				//ev.persist();
				console.log(ev.target.value);
				if(base.id == "frmPushMsg") {
					setLimitNight1(ev.target.value );
				}
				else {
					setLimitNight2(ev.target.value);
				}
			}
			else if(act_v == "check_contents") {
				//ev.persist();
				console.log(ev.target.value);
				if(base.id == "frmPushMsg") {
					setCheckContents(!checkContents );
				}
			}
			return true;
		}
		ev.preventDefault();
	};	

	const validation = (frm) => {
		if(frm == null) return false;

		if(!/^.{1,100}$/.test(frm.push_label.value))	return false;
		if(!/^.{1,50}$/.test(frm.title.value))	return false;
		console.log(frm.target_type.value);
		if(frm.target_type.value == "A") {
			if(frm.target_device.selectedIndex == 0) return false;
		}
		if(frm.id == "frmWelcomeMsg") {
			if(!/^.{1,50}$/.test(frm.emtitle.value))	return false;
			if(!/^.{1,200}$/.test(frm.webview_url.value))	return false;
			if(sendType2 == "R") {
				if(!/^.{1,10}$/.test(frm.reserve_date.value))	return false;
			}
		}
		else if(frm.id == "frmPushMsg") {
			if(sendType1 == "R") {
				if(!/^.{1,10}$/.test(frm.reserve_date.value))	return false;
			}
		}

		return true;
    }


	return(
		<div className="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				<Tabs defaultActiveKey="welcomeMsg" id="" className="custom__tab">

					<Tab eventKey="pushMsg" title="푸시 메시지">
						<form name="frmPushMsg" id="frmPushMsg" data-id="push">
						<input type="Hidden" name="source_path" id="source_path" value="system"/>
						<div className="main__header">
							<h2 className="main__header-title">푸시 메시지</h2>	
						</div>
						<div className="table__wrap mt-4">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>앱 선택</th>
										<td className="text-start">
											<Form.Select aria-label="" name="app_id" id="app_id">
												{
													appList.map((item, index) =>
														<option value={item.app_id}>{item.app_name}</option>
													)
												}
											</Form.Select>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* 발송정보 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">발송 정보</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>등록일</th>
										<td className="text-start">{today}</td>
									</tr>
									<tr>
										<th scope='row'>발송자 선택</th>
										<td className="text-start">
											<Form.Select aria-label="" name="sender_seq" id="sender_seq">
												{
													senderList.map((item, index) =>
														<option value={item.seq}>{item.sender_name}({item.sender_id})</option>
													)
												}
											</Form.Select>
										</td>
									</tr>
									<tr>
										<th scope='row'>앱 구분</th>
										<td className="text-start">
											<div key="inline-radio">
												<Form.Check
													onChange={eventHandle}
													data-act={"message_type"}
													inline
													label="일반 메시지"
													name="message_type"
													type="radio"
													id="message_type_1"
													value={"info"}
													checked={messageType1=="info"}
												/>
												<Form.Check
													onChange={eventHandle}
													data-act={"message_type"}
													inline
													label="광고 메시지"
													name="message_type"
													type="radio"
													value={"ad"}
													id="message_type_2"
													checked={messageType1=="ad"}
												/>
											</div>
											<small className="text-secondary-emphasis">※ 광고메시지는 푸시 메시지명, 제목에 “(광고)” 표시, 광고수신 동의자 발송, 야간시간(20:00~08:00) 전송 제한</small>
										</td>
									</tr>
									<tr>
										<th scope='row'>푸시 메시지명</th>
										<td className="text-start d-flex align-items-center">
										<strong className={"me-2" + (messageType1 == "info" ? " d-none":"")}>(광고)</strong>
										<Form.Control type="text" placeholder="메시지명을 입력하세요. 100자 제한" maxLength={100} name="push_label" id="push_label" />
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //발송정보 */}
						{/* 대상 선택 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">대상 선택</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>발송 대상</th>
										<td className="text-start">
											<div id="target_number" className="mb-2">총 발송대상 : 0명</div>
											<Row key="inline-radio" xs="auto">
												<Col className="d-flex align-items-center">
													<Form.Check
														inline
														name="target_type"
														type="radio"
														id="target_type_1"
														value={"A"}
														onChange={eventHandle}
														data-act="target_type"
														checked={targetType1 == "A"}
													/>
													<Form.Select aria-label="" className="d-inline-block" name="target_device" id="target_device" data-act="target_device" onChange={eventHandle}>
														<option value="">대상 선택</option>
														<option value="all">전체 앱 사용자</option>
														<option value="aos_all">Android OS 전체</option>
														<option value="aos_n">Android OS 비로그인</option>
														<option value="aos_y">Android OS 로그인</option>
														<option value="ios_all">IOS 전체</option>
														<option value="ios_n">IOS 비로그인</option>
														<option value="ios_y">IOS 로그인</option>
													</Form.Select>
												</Col>
												<Col>
													<input type="file" name="target_excel" id="target_excel" className="hide"/>
													<Form.Check
														inline
														label="엑셀 파일 업로드"
														name="target_type"
														type="radio"
														value={"E"}
														onChange={eventHandle}
														data-act="target_type"
														id="target_type_2"
														checked={targetType1 == "E"}
													/>
													<Button variant="outline-dark" size="sm" data-act="add_excel" onClick={eventHandle}><RiUploadLine /> 파일 첨부</Button>
												</Col>
												<Col>
													<Form.Check
														inline
														label="조건 검색"
														name="target_type"
														value={"S"}
														type="radio"
														id="target_type_3"
														onChange={eventHandle}
														data-act="target_type"
														checked={targetType1 == "S"}
													/>
													<Button variant="outline-dark" size="sm" data-act="target_search" onClick={eventHandle}>대상자 불러오기</Button>
												</Col>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //대상 선택 */}
						{/* 메시지 입력 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">메시지 입력</h3>
							<div className="sub__header-button">
								<Button variant="dark" size="sm" data-act="saveTemplage" onClick={eventHandle}>템플릿에 저장</Button>
								<Button variant="dark ms-2" size="sm" data-act="previewTemplate" onClick={eventHandle}>미리보기</Button>
							</div>
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>템플릿</th>
										<td className="text-start">
											<div>
												<Button variant="outline-dark ms-2" size="sm" data-act="openTemplage" onClick={eventHandle}>불러오기</Button>
											</div>
										</td>
									</tr>
									<tr>
										<th scope='row'>제목</th>
										<td className="text-start d-flex align-items-center">
											<strong className={"me-2" + (messageType1 == "info" ? " d-none":"")}>(광고)</strong>
											<Form.Control type="text" name="title" id="title" placeholder="최대 50자 입력 가능합니다." maxLength={50}/>
										</td>
									</tr>
									<tr>
										<th scope='row'>본문</th>
										<td className="text-start">
											<Form.Control as="textarea" rows={5} name="content" id="content" placeholder="본문 내용을 입력하세요. &#10;광고 메시지 주의사항 &#10;1. 업체명 혹은 서비스명을 표기 또는 기본 이미지의 회사로고 유지 &#10;2.제목(본문) 앞 '(광고)'를 반드시 표기 &#10;3.'(수신거부:메뉴>설정)' 필수 표기" />
											<Form.Group className="mt-2">
												<Form.Check
													label="체크를 해제하면 푸시메시지에서 본문은 전송되지 않습니다. 본문  유효성 검사를 하지 않습니다. "
													name="check_contents"
													type="checkbox"
													id="check_contents"
													value={"Y"}
													maxLength={500}
													onChange={eventHandle}
													data-act="check_contents"
													checked={checkContents == true}
												/>
											</Form.Group>
											<div className="text-end">0자/ 500자 </div>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //메시지 입력 */}
						{/* 메시지 첨부 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">메시지 첨부</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>본문 이미지</th>
										<td className="text-start">
											<Row className="fileup__ui">
												<Col className="col-auto">
													<FileUpload imageWidth={160} imageHeight={106} maxFileSize={1} inputName="image_push"></FileUpload>
												</Col>
												<Col className="col-auto">
													<Button variant="outline-dark" size="sm" data-act="attach_image_push" onClick={eventHandle}>
														<RiUploadLine /> 파일 첨부
													</Button>
													<Button variant="outline-dark ms-2" size="sm" data-act="remove_image_push" onClick={eventHandle}>
														<RiDeleteBinLine /> 삭제
													</Button>
												</Col>
												<Col className="col-auto">
													<small className="text-secondary-emphasis">※ 3:2, 1024px X 512px, png/jpg, 1MB 이하</small>
												</Col>
											</Row>
										</td>
									</tr>
									<tr>
										<th scope='row'>링크</th>
										<td className="text-start">
											<Row>
												<Col lg={1} className="align-content-center">첫번째 버튼</Col>
												<Col>
													<Row>
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_name_1" id="link_name_1" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_mobile_1" id="link_url_mobile_1" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_type_1" id="link_type_1" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_pc_1" id="link_url_pc_1" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
												</Col>
												<Col lg={1}><Button variant="outline-dark" size="sm">지우기</Button></Col>
											</Row>
											<Row className="mt-3">
												<Col lg={1} className="align-content-center">두번째 버튼</Col>
												<Col>
													<Row>
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_name_2" id="link_name_2" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_mobile_2" id="link_url_mobile_2" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_type_2" id="link_type_2" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_pc_2" id="link_url_pc_2" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
												</Col>
												<Col lg={1}><Button variant="outline-dark" size="sm">지우기</Button></Col>
											</Row>
											<Row className="mt-3">
												<Col lg={1} className="align-content-center">세번째 버튼</Col>
												<Col>
													<Row>
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_name_3" id="link_name_3" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_mobile_3" id="link_url_mobile_3" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_type_3" id="link_type_3" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_pc_3" id="link_url_pc_3" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
												</Col>
												<Col lg={1}><Button variant="outline-dark" size="sm">지우기</Button></Col>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
							
						</div>
						{/* //메시지 첨부 */}
						{/* 발송 설정 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">발송 설정</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>발송시간</th>
										<td className="text-start">
											<Row className="align-items-center" xs="auto">
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="즉시 발송"
														name="send_type"
														type="radio"
														id="send_type_1"
														value={"D"}
														data-act="send_type"
														onChange={eventHandle}
														checked={sendType1 == "D"}
													/>
												</Form.Group>
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="예약 발송"
														name="send_type"
														type="radio"
														value={"R"}
														data-act="send_type"
														onChange={eventHandle}
														id="send_type_2"
														checked={sendType1 == "R"}
													/>
													<Form.Control type="date" className="w-auto"></Form.Control>
												</Form.Group>
											</Row>
										</td>
									</tr>
									<tr>
										<th scope='row'>야간광고 전송제한</th>
										<td className="text-start">
											<Row className="align-items-center" xs="auto">
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="야간 광고 전송제한  20:00 ~ 08:00   "
														name="limit_night"
														type="radio"
														value={"Y"}
														id="limit_night_1"
														data-act="limit_night"
														onChange={eventHandle}
														checked={limitNight1 == "Y"}
													/>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Check
														inline
														value={"N"}
														label="제한 시간 해제"
														name="limit_night"
														type="radio"
														id="limit_night_2"
														data-act="limit_night"
														onChange={eventHandle}
														checked={limitNight1 == "N"}
													/>
												</Form.Group>
											</Row>
										</td>
									</tr>
									<tr>
										<th scope='row'>분할 발송</th>
										<td className="text-start">
											<Row>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="" name="send_part_min" id="send_part_min">
														<option value="0">지연 시간 선택</option>
														<option value="1">1분</option>
														<option value="10">10분</option>
														<option value="20">20분</option>
														<option value="30">30분</option>
													</Form.Select>
												</Form.Group>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="" name="send_part_size" id="send_part_size">
														<option value="0">분할 단위 선택</option>
														<option value="100">100건</option>
														<option value="1000">1000건</option>
														<option value="10000">10000건</option>
													</Form.Select>
												</Form.Group>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //발송 설정 */}
						{/* 버튼 영역 */}
						<Row className="table__button">
							<Col xs="auto">
								<Button variant="secondary" data-act="reset" onClick={eventHandle}>초기화</Button>
							</Col>
							<Col className="text-end">
								<Button variant="secondary" data-act="send_test" onClick={eventHandle}>테스트 발송</Button>
								<Button variant="primary ms-2" data-act="send_save" onClick={eventHandle}>푸시 발송</Button>
							</Col>
						</Row>
						{/* //버튼 영역 */}
						</form>
					</Tab>



					<Tab eventKey="welcomeMsg" title="웹뷰 메시지">
						<form name="frmWelcomeMsg" id="frmWelcomeMsg" data-id="welcome">
							<input type="hidden" name="source_path" id="source_path" value="system"/>
							<input type="Hidden" name="target_type" id="target_type" value={targetType2}/>
						<div className="main__header">
							<h2 className="main__header-title">웹뷰 메시지</h2>	
						</div>
						<div className="table__wrap mt-4">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>앱 선택</th>
										<td className="text-start">
											<Form.Select aria-label="" name="app_id" id="app_id">
												{
													appList.map((item, index) =>
														<option value={item.app_id}>{item.app_name}</option>
													)
												}
											</Form.Select>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* 발송정보 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">발송 정보</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>등록일</th>
										<td className="text-start">{today}</td>
									</tr>
									<tr>
										<th scope='row'>발송자 선택</th>
										<td className="text-start">
											<Form.Select aria-label="" name="sender_seq" id="sender_seq">
												{
													senderList.map((item, index) =>
														<option value={item.seq}>{item.sender_name}({item.sender_id})</option>
													)
												}
											</Form.Select>
										</td>
									</tr>
									<tr>
										<th scope='row'>앱 구분</th>
										<td className="text-start">
											<div key="inline-radio">
												<Form.Check
													inline
													label="일반 메시지"
													name="message_type"
													type="radio"
													id="message_type_11"
													value={"info"}
													data-act="message_type"
													onChange={eventHandle}
													checked={messageType2 == "info"}
												/>
												<Form.Check
													inline
													label="광고 메시지"
													name="message_type"
													type="radio"
													value={"ad"}
													data-act="message_type"
													onChange={eventHandle}
													id="message_type_12"
													checked={messageType2 == "ad"}
												/>
											</div>
											<small className="text-secondary-emphasis">※ 광고메시지는 푸시 메시지명, 제목에 “(광고)” 표시, 광고수신 동의자 발송, 야간시간(20:00~08:00) 전송 제한</small>
										</td>
									</tr>
									<tr>
										<th scope='row'>푸시 메시지명</th>
										<td className="text-start d-flex align-items-center">
											<strong className={"me-2" + (messageType2 == "info" ? " d-none":"")}>(광고)</strong>
											<Form.Control type="text" placeholder="메시지명을 입력하세요. 100자 제한" maxLength={100} name="push_label" id="push_label" />
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //발송정보 */}
						{/* 대상 선택 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">대상 선택</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>앱 구분</th>
										<td className="text-start">
											<div id="target_number" className="mb-2">총 발송대상 : 0명</div>
											<Form.Select aria-label="" name="target_device" id="target_device" className="d-inline-block" data-act="target_device" onChange={eventHandle}>
												<option value="">대상 선택</option>
												<option value="all">전체 앱 사용자</option>
												<option value="aos_all">Android OS 전체</option>
												<option value="aos_n">Android OS 비로그인</option>
												<option value="aos_y">Android OS 로그인</option>
												<option value="ios_all">IOS 전체</option>
												<option value="ios_n">IOS 비로그인</option>
												<option value="ios_y">IOS 로그인</option>
											</Form.Select>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //대상 선택 */}
						{/* 웰컴 메시지 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">메시지</h3>
							<div className="sub__header-button">
								<Button variant="dark ms-2" size="sm" data-act="previewTemplate" onClick={eventHandle}>미리보기</Button>
							</div>
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>제목</th>
										<td className="text-start d-flex align-items-center">
											<strong className={"me-2" + (messageType2 == "info" ? " d-none":"")}>(광고)</strong>
											<Form.Control type="text" placeholder="최대 50자 입력 가능합니다." name="title" id="title" />
										</td>
									</tr>
									<tr>
										<th scope='row'>부제목</th>
										<td className="text-start">
											<Form.Control type="text" placeholder="최대 50자 입력 가능합니다." name="emtitle" id="emtitle"/>
										</td>
									</tr>
									<tr>
										<th scope='row'>웹뷰 링크</th>
										<td className="text-start">
											<Row className="align-items-center">
												<Form.Group as={Col} lg={7}>
													<Form.Control placeholder="URL을 입력하세요. 영문, 특수문자 200자 제한" maxLength={200} name="webview_url" id="webview_url" />
												</Form.Group>
												<Form.Group as={Col}>
													<Button variant="outline-dark" size="sm">지우기</Button>
												</Form.Group>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //웰컴 메시지 */}
						{/* 발송 설정 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">발송 설정</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>발송시간</th>
										<td className="text-start">
											<Row className="align-items-center" xs="auto">
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="즉시 발송"
														name="send_type"
														type="radio"
														id="send_type_11"
														value={"D"}
														onChange={eventHandle}
														data-act="send_type"
														checked={sendType2 == "D"}
													/>
												</Form.Group>
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="예약 발송"
														name="send_type"
														type="radio"
														value={"R"}
														onChange={eventHandle}
														id="send_type_12"
														data-act="send_type"
														checked={sendType2 == "R"}
													/>
													<Form.Control type="date" name="reserve_date" id="reserve_date" className="w-auto"></Form.Control>
												</Form.Group>
											</Row>
										</td>
									</tr>
									<tr>
										<th scope='row'>야간광고 전송제한</th>
										<td className="text-start">
											<Row className="align-items-center" xs="auto">
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="야간 광고 전송제한  20:00 ~ 08:00   "
														name="limit_night"
														type="radio"
														value={"Y"}
														onChange={eventHandle}
														data-act="limit_night"
														id="limit_night_11"

														checked={limitNight2 == "Y"}
													/>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Check
														inline
														value={"N"}
														label="제한 시간 해제"
														name="limit_night"
														type="radio"
														id="limit_night_12"
														onChange={eventHandle}
														data-act="limit_night"
														checked={limitNight2 == "N"}
													/>
												</Form.Group>
											</Row>
										</td>
									</tr>
									<tr>
										<th scope='row'>분할 발송</th>
										<td className="text-start">
											<Row>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="" name="send_part_min" id="send_part_min">
														<option value="0">지연 시간 선택</option>
														<option value="1">1분</option>
														<option value="10">10분</option>
														<option value="20">20분</option>
														<option value="30">30분</option>
													</Form.Select>
												</Form.Group>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="" name="send_part_size" id="send_part_size">
														<option value="0">분할 단위 선택</option>
														<option value="100">100건</option>
														<option value="1000">1000건</option>
														<option value="10000">10000건</option>
													</Form.Select>
												</Form.Group>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //발송 설정 */}
						{/* 버튼 영역 */}
						<Row className="table__button">
							<Col xs="auto">
								<Button variant="secondary" data-act="reset" onClick={eventHandle}>초기화</Button>
							</Col>
							<Col className="text-end">
								<Button variant="secondary" data-act="send_test" onClick={eventHandle}>테스트 발송</Button>
								<Button variant="primary ms-2" data-act="send_save" onClick={eventHandle}>푸시 발송</Button>
							</Col>
						</Row>
						</form>
						{/* //버튼 영역 */}
					</Tab>
				</Tabs>	
			</Container>







			{/* 템플릿 선택 팝업 */}
			<Modal show={templateModal} onHide={setTemplateModal} centered className="">
				<Modal.Header closeButton>
					<Modal.Title>템플릿 불러오기</Modal.Title>
				</Modal.Header>
				<Modal.Body>
							{/* 검색 영역 */}
							<Form name="frmPopTest" id="frmPopTest">
								<Row className="search__form">
									<Col>
										<Row className="search__form-group">
											<Col lg="auto">
												<Form.Select aria-label="system" className="d-inline-block w-auto" name="search_key" id="search_key">
													<option value="title">제목</option>
													<option value="contents">본문</option>
												</Form.Select>
												<Form.Control type="text" className="d-inline-block w-auto ms-1" placeholder="" />
											</Col>
										</Row>
									</Col>
									<Col lg="2" className="text-end">
										<Button variant="outline-primary" data-act="test_search" onClick={eventHandle}>검색</Button>
									</Col>
								</Row>
							</Form>
							<div className="table__wrap mt-4">
								<Table bordered responsive>
									<thead>
										<tr>
											<th scope='col'>등록일</th>
											<th scope='col'>제목</th>
											<th scope='col'선택></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>2024-10-12</td>
											<td>메세지 타이틀</td>
											<td>
												<Button size="sm" variant="outline-dark">선택</Button>
											</td>
										</tr>
									</tbody>
								</Table>
								<div className="table__pagination">
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
					<Button variant="primary" onClick={() => setTemplateModal(false)}>닫기</Button>
				</Modal.Footer>
			</Modal>



			{/*조건검색 대상자  팝업 */}
			<Modal show={openSearchModal} onHide={setOpenSearchModal} centered className="" size="lg">
				<Modal.Header closeButton>
					<Modal.Title>조건검색 대상자 불러오기</Modal.Title>
				</Modal.Header>
				<Modal.Body>
							{/* 검색 영역 */}
							<Form name="frmPopTemplate" id="frmPopTemplate">
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
										<tr>
											<td>1</td>
											<td>킨더 주니어 </td>
											<td>600</td>
											<td>홍길동</td>
											<td>2022-11-23</td>
											<td>
												<Button size="sm" variant="outline-dark">선택</Button>
											</td>
										</tr>
									</tbody>
								</Table>
								<div className="table__pagination">
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
					<Button variant="primary" onClick={() => setOpenSearchModal(false)}>닫기</Button>
				</Modal.Footer>
			</Modal>



			{/* 테스트 발송 선택 팝업 */}
			<Modal show={openTestModal} onHide={setOpenTestModal} centered className="">
				<Modal.Header closeButton>
					<Modal.Title>테스트 발송</Modal.Title>
				</Modal.Header>
				<Modal.Body>
							{/* 검색 영역 */}
							<Form name="frmPopTemplate" id="frmPopTemplate">
								<Row className="search__form">
									<Col>
										<Row className="search__form-group">
											<Col lg="auto">
												<Form.Select aria-label="system" className="d-inline-block w-auto" name="search_key" id="search_key">
													<option value="name">성명</option>
													<option value="user_id">회원 ID</option>
												</Form.Select>
												<Form.Control type="text" className="d-inline-block w-auto ms-1" placeholder="" />
											</Col>
										</Row>
									</Col>
									<Col lg="2" className="text-end">
										<Button variant="outline-primary" data-act="popupTemplateSearch" onClick={eventHandle}>검색</Button>
									</Col>
								</Row>
							</Form>
							<div className="table__wrap mt-4">
								<div className="select__list mb-3">
									<span className="select__list-item">홍길동(Honggil) <Button size="sm" variant=""><RiCloseLine /></Button></span>
									<span className="select__list-item">김영철(KIMyeongchul) <Button size="sm" variant=""><RiCloseLine /></Button></span>
									<span className="select__list-item">홍길동(Hong-gil-dong) <Button size="sm" variant=""><RiCloseLine /></Button></span>
									<span className="select__list-item">김영철(KIMyeongchul)<Button size="sm" variant=""><RiCloseLine /></Button></span>
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
										<tr>
											<td>1</td>
											<td>Hong dil-dong1</td>
											<td>홍길동</td>
											<td>01012345678</td>
											<td>IOS</td>
											<td>
												<Button size="sm" variant="outline-dark">선택</Button>
											</td>
										</tr>
										<tr>
											<td>1</td>
											<td>Hong dil-dong1</td>
											<td>홍길동</td>
											<td>01012345678</td>
											<td>IOS</td>
											<td>
												<Button size="sm" variant="outline-dark">선택</Button>
											</td>
										</tr>
									</tbody>
								</Table>
								<div className="table__pagination">
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
					<Button variant="secondary" onClick={() => setOpenTestModal(false)}>취소</Button>
					<Button variant="primary" onClick={() => setOpenTestModal(false)}>테스트 발송</Button>
				</Modal.Footer>
			</Modal>

			{/* 미리보기 */}
      <Modal show={previewModal} onHide={setPreviewModal} centered size="sm">
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
								Android
							</div>
						</Tab>
						<Tab eventKey="profile" title="IOS">
							<div className="preview-box">
								IOS
							</div>
						</Tab>
					</Tabs>
				</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPreviewModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>			

			{/* 엑셀 파일 업로드 */}
			<Modal show={filedownModal} onHide={setFiledownModal} centered size="sm">
				<Modal.Header closeButton>
				<Modal.Title>엑셀 파일 업로드</Modal.Title>
				</Modal.Header>
				<Modal.Body>
							<div className="bg-box text-center hide">
								총 발송 대상자 <strong>1456</strong>명
							</div>
							<div className="text-center mt-4 mb-4">
								발송 대상자 엑셀을 업로드해주세요.<br />
								<input type="file" name="upExcel" id="upExcel" className="hide"/>
								<Button variant="secondary mt-3 mb-3"><RiUpload2Line /> 파일 업로드</Button><br />
								<div className="text-start d-flex justify-content-center text-secondary hide">
									&middot; 첨부 : 파일명.확장자 (1,123KB)<br />
									&middot; 샘플 : 엑셀파일 양식 [다운로드]
								</div>
							</div>
						</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={() => setFiledownModal(false)}>취소</Button>
				<Button variant="primary hide" onClick={() => setFiledownModal(false)}>대상자 확정</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
};
export default Push;

