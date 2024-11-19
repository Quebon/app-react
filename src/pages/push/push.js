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
import pushStat from '../../common/Sender';
import {CommonUI} from '../../common/commonUI';

const Push = () => {
	const {seq} = useParams();
	const [today, setToday] = useState("");

	const [pushModal, setPushModal] = useState(false);
	const [templateModal, setTemplateModal] = useState(false);

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
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);

		let frm2 = document.querySelector("#frmSender");


		if(act_v == "search") {
			//getTemplateList(1);
		}
		else if(act_v == "add") {
			document.location.href = "/admin/add";
		}
	};	


	return(
		<div className="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				<Tabs defaultActiveKey="welcomeMsg" id="" className="custom__tab">
					<Tab eventKey="pushMsg" title="푸시 메시지">
						<form name="frmPushMsg" id="frmPushMsg">
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
													inline
													label="일반 메시지"
													name="message_type"
													type="radio"
													id="message_type_1"
													defaultValue={"info"}
													checked
												/>
												<Form.Check
													inline
													label="광고 메시지"
													name="message_type"
													type="radio"
													defaultValue={"ad"}
													id="message_type_2"
												/>
											</div>
											<small className="text-secondary-emphasis">※ 광고메시지는 푸시 메시지명, 제목에 “(광고)” 표시, 광고수신 동의자 발송, 야간시간(20:00~08:00) 전송 제한</small>
										</td>
									</tr>
									<tr>
										<th scope='row'>푸시 메시지명</th>
										<td className="text-start">
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
											<div className="mb-2">총 발송대상 : 0명</div>
											<Row key="inline-radio" xs="auto">
												<Col className="d-flex align-items-center">
													<Form.Check
														inline
														name="target_type"
														type="radio"
														id="target_type_1"
														defaultValue={"A"}
														checked
													/>
													<Form.Select aria-label="" className="d-inline-block" data-act="target-device" onChange={eventHandle}>
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
														defaultValue={"E"}
														id="target_type_2"
													/>
													<Button variant="outline-dark" size="sm" data-act="add_excel" onClick={eventHandle}><RiUploadLine /> 파일 첨부</Button>
												</Col>
												<Col>
													<Form.Check
														inline
														label="조건 검색"
														name="target_type"
														defaultValue={"S"}
														type="radio"
														id="target_type_3"
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
												<Form.Control type="text" className="w-auto d-inline-block" />
												<Button variant="outline-dark ms-2" size="sm" data-act="openTemplage" onClick={eventHandle}>불러오기</Button>
											</div>
										</td>
									</tr>
									<tr>
										<th scope='row'>제목</th>
										<td className="text-start">
											<Form.Control type="text" name="title" id="title" placeholder="최대 50자 입력 가능합니다." maxLength={50}/>
										</td>
									</tr>
									<tr>
										<th scope='row'>본문</th>
										<td className="text-start">
											<Form.Control as="textarea" rows={5} placeholder="본문 내용을 입력하세요. &#10;광고 메시지 주의사항 &#10;1. 업체명 혹은 서비스명을 표기 또는 기본 이미지의 회사로고 유지 &#10;2.제목(본문) 앞 '(광고)'를 반드시 표기 &#10;3.'(수신거부:메뉴>설정)' 필수 표기" />
											<Form.Group className="mt-2">
												<Form.Check
													label="체크를 해제하면 푸시메시지에서 본문은 전송되지 않습니다. 본문  유효성 검사를 하지 않습니다. "
													name="contents"
													type="checkbox"
													id="contents"
													maxLength={500}
													checked
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
														defaultValue={"D"}
														checked
													/>
												</Form.Group>
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="예약 발송"
														name="send_type"
														type="radio"
														defaultValue={"R"}
														id="send_type_2"
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
														defaultValue={"Y"}
														id="limit_night_1"
														checked
													/>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Check
														inline
														defaultValue={"N"}
														label="제한 시간 해제"
														name="limit_night"
														type="radio"
														id="limit_night_2"
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
														<option value="">지연 시간 선택</option>
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
								<Button variant="primary ms-2" data-act="save" onClick={eventHandle}>푸시 발송</Button>
							</Col>
						</Row>
						{/* //버튼 영역 */}
						</form>
					</Tab>



					<Tab eventKey="welcomeMsg" title="이미지 메시지">
						<form name="frmWelcomeMsg" id="frmWelcomeMsg">
						<div className="main__header">
							<h2 className="main__header-title">이미지 메시지</h2>	
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
													id="message_type_1"
													defaultValue={"info"}
													checked
												/>
												<Form.Check
													inline
													label="광고 메시지"
													name="message_type"
													type="radio"
													defaultValue={"ad"}
													id="message_type_2"
												/>
											</div>
											<small className="text-secondary-emphasis">※ 광고메시지는 푸시 메시지명, 제목에 “(광고)” 표시, 광고수신 동의자 발송, 야간시간(20:00~08:00) 전송 제한</small>
										</td>
									</tr>
									<tr>
										<th scope='row'>푸시 메시지명</th>
										<td className="text-start">
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
											<div className="mb-2">총 발송대상 : 0명</div>
											<Form.Select aria-label="" className="d-inline-block" data-act="target-device" onChange={eventHandle}>
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
										<td className="text-start">
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
														id="send_type_1"
														defaultValue={"D"}
														checked
													/>
												</Form.Group>
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="예약 발송"
														name="send_type"
														type="radio"
														defaultValue={"R"}
														id="send_type_2"
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
														defaultValue={"Y"}
														id="limit_night_1"
														checked
													/>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Check
														inline
														defaultValue={"N"}
														label="제한 시간 해제"
														name="limit_night"
														type="radio"
														id="limit_night_2"
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
														<option value="">지연 시간 선택</option>
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
								<Button variant="secondary">초기화</Button>
							</Col>
							<Col className="text-end">
								<Button variant="secondary">테스트 발송</Button>
								<Button variant="primary ms-2">푸시 발송</Button>
							</Col>
						</Row>
						</form>
						{/* //버튼 영역 */}
					</Tab>
				</Tabs>	
			</Container>



			{/* 템플릿 선택 팝업 */}
			<Modal show={pushModal} onHide={setPushModal} centered className="">
				<Modal.Header closeButton>
					<Modal.Title>테스트 발송</Modal.Title>
				</Modal.Header>
				<Modal.Body>
							{/* 검색 영역 */}
							<Form name="frmPopTest" id="frmPopTest">
								<Row className="search__form">
									<Col>
										<Row className="search__form-group">
											<Col lg="auto">
												<Form.Select aria-label="system" className="d-inline-block w-auto" name="search_key" id="search_key">
													<option value="name">성명</option>
													<option value="user_id">회원ID</option>
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
					<Button variant="secondary" onClick={() => setPushModal(false)}>취소</Button>
					<Button variant="primary" onClick={() => setPushModal(false)}>테스트 발송</Button>
				</Modal.Footer>
			</Modal>


			{/* 템플릿 선택 팝업 */}
			<Modal show={templateModal} onHide={setTemplateModal} centered className="">
				<Modal.Header closeButton>
					<Modal.Title>템플릿 불러오기</Modal.Title>
				</Modal.Header>
				<Modal.Body>
							{/* 검색 영역 */}
							<Form name="frmPopTemplate" id="frmPopTemplate">
								<Row className="search__form">
									<Col>
										<Row className="search__form-group">
											<Col lg="auto">
												<Form.Select aria-label="system" className="d-inline-block w-auto" name="search_key" id="search_key">
													<option value="title">제목</option>
													<option value="contents">내용</option>
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
					<Button variant="secondary" onClick={() => setPushModal(false)}>취소</Button>
					<Button variant="primary" onClick={() => setPushModal(false)}>테스트 발송</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
export default Push;

