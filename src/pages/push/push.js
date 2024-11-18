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
} from "react-bootstrap";
import Img1x1 from './../../assets/images/temp_appIcon.png';
import Img3x2 from './../../assets/images/img_3x2.png';
import { 
	RiUploadLine ,
	RiDeleteBinLine,
} from "react-icons/ri";

import Config from '../../common/config.js';
import {Link} from "react-router-dom";
import app from '../../common/App';
import sender from '../../common/Sender';
import pushStat from '../../common/Sender';
import {CommonUI} from '../../common/commonUI';

const Push = () => {
	const {seq} = useParams();
	const [today, setToday] = useState("");

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
				<Tabs defaultActiveKey="pushMsg" id="" className="custom__tab">
					<Tab eventKey="pushMsg" title="푸시 메시지">
						<div className="main__header">
							<h2 className="main__header-title">푸시 메시지</h2>	
						</div>
						<div className="table__wrap mt-4">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>앱 선택</th>
										<td className="text-start">
											<Form.Select aria-label="">
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
											<Form.Select aria-label="">
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
													name="group1"
													type="radio"
													id="inline-radio-1"
													checked
												/>
												<Form.Check
													inline
													label="광고 메시지"
													name="group1"
													type="radio"
													id="inline-radio-2"
												/>
											</div>
											<small className="text-secondary-emphasis">※ 광고메시지는 푸시 메시지명, 제목에 “(광고)” 표시, 광고수신 동의자 발송, 야간시간(20:00~08:00) 전송 제한</small>
										</td>
									</tr>
									<tr>
										<th scope='row'>푸시 메시지명</th>
										<td className="text-start">
											<Form.Control type="text" placeholder="메시지명을 입력하세요. 100자 제한" />
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
														name="group2"
														type="radio"
														id="inline-radio-2-1"
														checked
													/>
													<Form.Select aria-label="" className="d-inline-block">
														<option value="1">전체 앱 사용자</option>
														<option value="2">Android OS 전체</option>
														<option value="3">Android OS 비로그인</option>
														<option value="">Android OS 로그인</option>
														<option value="">IOS 전체</option>
														<option value="">IOS 비로그인</option>
														<option value="">IOS 로그인</option>
													</Form.Select>
												</Col>
												<Col>
													<Form.Check
														inline
														label="엑셀 파일 업로드"
														name="group2"
														type="radio"
														id="inline-radio-2-2"
													/>
													<Button variant="outline-dark" size="sm"><RiUploadLine /> 파일 첨부</Button>
												</Col>
												<Col>
													<Form.Check
														inline
														label="조건 검색"
														name="group2"
														type="radio"
														id="inline-radio-2-3"
													/>
													<Button variant="outline-dark" size="sm">대상자 불러오기</Button>
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
								<Button variant="dark" size="sm">템플릿에 저장</Button>
								<Button variant="dark ms-2" size="sm">미리보기</Button>
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
												<Button variant="outline-dark ms-2" size="sm">불러오기</Button>
											</div>
										</td>
									</tr>
									<tr>
										<th scope='row'>제목</th>
										<td className="text-start">
											<Form.Control type="text" placeholder="최대 50자 입력 가능합니다." />
										</td>
									</tr>
									<tr>
										<th scope='row'>본문</th>
										<td className="text-start">
											<Form.Control as="textarea" rows={5} placeholder="본문 내용을 입력하세요. &#10;광고 메시지 주의사항 &#10;1. 업체명 혹은 서비스명을 표기 또는 기본 이미지의 회사로고 유지 &#10;2.제목(본문) 앞 '(광고)'를 반드시 표기 &#10;3.'(수신거부:메뉴>설정)' 필수 표기" />
											<Form.Group className="mt-2">
												<Form.Check
													label="체크를 해제하면 푸시메시지에서 본문은 전송되지 않습니다. 본문  유효성 검사를 하지 않습니다. "
													name=""
													type="checkbox"
													id=""
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
										<th scope='row'>기본 이미지</th>
										<td className="text-start">
											<Row className="fileup__ui">
												<Col className="col-auto">
													<Figure>
														<Figure.Image
															width={80}
															height={80}
															alt="80x80"
															src={Img1x1}
														/>
													</Figure>
												</Col>
												<Col className="col-auto">
													<Button variant="outline-dark" size="sm">
														<RiUploadLine /> 파일 첨부
													</Button>
													<Button variant="outline-dark ms-2" size="sm">
														<RiDeleteBinLine /> 삭제
													</Button>
												</Col>
												<Col className="col-auto">
													<small className="text-secondary-emphasis">※ 1:1, 1024px X 1024px, png/jpg, 1MB 이하</small>
												</Col>
											</Row>
										</td>
									</tr>
									<tr>
										<th scope='row'>본문 이미지</th>
										<td className="text-start">
											<Row className="fileup__ui">
												<Col className="col-auto">
													<Figure>
														<Figure.Image
															width={160}
															height={106}
															alt="160x106"
															src={Img3x2}
														/>
													</Figure>
												</Col>
												<Col className="col-auto">
													<Button variant="outline-dark" size="sm">
														<RiUploadLine /> 파일 첨부
													</Button>
													<Button variant="outline-dark ms-2" size="sm">
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
															<Form.Control size="sm" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
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
															<Form.Control size="sm" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
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
															<Form.Control size="sm" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
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
														name="group4"
														type="radio"
														id="inline-radio-4-1"
														checked
													/>
												</Form.Group>
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="예약 발송"
														name="group4"
														type="radio"
														id="inline-radio-4-2"
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
														name="group5"
														type="radio"
														id="inline-radio-5-1"
														checked
													/>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Check
														inline
														label="제한 시간 해제"
														name="group5"
														type="radio"
														id="inline-radio-5-2"
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
													<Form.Select aria-label="">
														<option value="0">지연 시간 선택</option>
														<option value="1">1분</option>
														<option value="2">10분</option>
														<option value="3">20분</option>
														<option value="4">30분</option>
													</Form.Select>
												</Form.Group>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="">
														<option value="0">분할 단위 선택</option>
														<option value="1">100건</option>
														<option value="2">1000건</option>
														<option value="3">10000건</option>
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
						{/* //버튼 영역 */}
					</Tab>



					<Tab eventKey="welcomeMsg" title="이미지 메시지">
						<div className="main__header">
							<h2 className="main__header-title">이미지 메시지</h2>	
						</div>
						<div className="table__wrap mt-4">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>앱 선택</th>
										<td className="text-start">
											<Form.Select aria-label="">
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
										<td className="text-start">2024-09-01</td>
									</tr>
									<tr>
										<th scope='row'>발송자 선택</th>
										<td className="text-start">
											<Form.Select aria-label="">
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
													name="group6"
													type="radio"
													id="inline-radio-6-1"
													checked
												/>
												<Form.Check
													inline
													label="광고 메시지"
													name="group1"
													type="radio"
													id="inline-radio-6-2"
												/>
											</div>
											<small className="text-secondary-emphasis">※ 광고메시지는 푸시 메시지명, 제목에 “(광고)” 표시, 광고수신 동의자 발송, 야간시간(20:00~08:00) 전송 제한</small>
										</td>
									</tr>
									<tr>
										<th scope='row'>푸시 메시지명</th>
										<td className="text-start">
											<Form.Control type="text" placeholder="메시지명을 입력하세요. 100자 제한" />
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
											<Form.Select aria-label="" className="d-inline-block w-auto">
												<option value="1">전체 앱 사용자</option>
												<option value="2">Android OS 전체</option>
												<option value="3">Android OS 비로그인</option>
												<option value="4">Android OS 로그인</option>
												<option value="5">IOS 전체</option>
												<option value="6">IOS 비로그인</option>
												<option value="7">IOS 로그인</option>
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
								<Button variant="dark ms-2" size="sm">미리보기</Button>
							</div>
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>제목</th>
										<td className="text-start">
											<Form.Control type="text" placeholder="최대 50자 입력 가능합니다." />
										</td>
									</tr>
									<tr>
										<th scope='row'>부제목</th>
										<td className="text-start">
											<Form.Control type="text" placeholder="최대 50자 입력 가능합니다." />
										</td>
									</tr>
									<tr>
										<th scope='row'>웹뷰 링크</th>
										<td className="text-start">
											<Row className="align-items-center">
												<Form.Group as={Col} lg={7}>
													<Form.Control placeholder="URL을 입력하세요. 영문, 특수문자 200자 제한" />
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
														name="group7"
														type="radio"
														id="inline-radio-7-1"
														checked
													/>
												</Form.Group>
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="예약 발송"
														name="group7"
														type="radio"
														id="inline-radio-7-2"
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
														label="야간 광고 전송제한  20:00 ~ 08:00"
														name="group8"
														type="radio"
														id="inline-radio-8-1"
														checked
													/>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Check
														inline
														label="제한 시간 해제"
														name="group5"
														type="radio"
														id="inline-radio-8-2"
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
													<Form.Select aria-label="">
														<option value="1">지연 시간 선택</option>
													</Form.Select>
												</Form.Group>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="">
														<option value="1">분할 단위 선택</option>
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
						{/* //버튼 영역 */}
					</Tab>
				</Tabs>	
			</Container>
			
		</div>
	);
};
export default Push;

