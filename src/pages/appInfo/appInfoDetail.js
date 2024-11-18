import React, { useEffect, useState } from 'react';
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
} from "react-bootstrap";
import appIcon from './../../assets/images/temp_appIcon.png';
import { 
	RiUploadLine ,
	RiDeleteBinLine,
} from "react-icons/ri";
import Config from '../../common/config.js';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import app from '../../common/App';

const AppInfoDetail = () => {
	const navigate = useNavigate();
	const {seq} = useParams();
	const [info, setInfo] = useState({});

		useEffect(() => {getInfo();}, []);

	const eventHandle = (ev) => {
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);

		if(act_v == "list") {
			document.location.href = "/app"
		}
		else if(act_v == "modify") {
			document.location.href = "/app/edit/" + seq;
		}
		else if(act_v == "delete") {
			let seq_v = evo.getAttribute("data-id");
			if(window.confirm("삭제하시겠습니까?")) {
				const data = {"seq":seq};
				app.deleteApp({data:data, callback:function(obj) {
					if(obj.seq > 0) {
						alert("삭제하였습니다.");
						document.location.href = "/app";
					} else {
						alert("삭제에 실패하였습니다.\n다시 시도해주세요.");
					}
				}});
			}
		}
	};	

	const getInfo = () => {
		const data = {"seq":seq};
		app.getInfo({data:data, callback:response});
	};

	const response = function(obj) {
		if(obj) {
			if(obj.info) {
				setInfo(obj.info);
			}
			else {
				alert("잘못된 접근입니다.");
				navigate(-1);
			}
		}
		else {
			alert("잘못된 접근입니다.");
			navigate(-1);
		}
	};

	return(
		<div className="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				<div className="main__header">
					<h2 className="main__header-title">앱 상세</h2>	
				</div>
				<div className="table__wrap">
					<Table bordered responsive className="table__view">
						<tbody>
							<tr>
								<th scope='row'>등록일</th>
								<td className="text-start">{info.reg_date_str}</td>
							</tr>
							<tr>
								<th scope='row'>작성자</th>
								<td className="text-start">{info.user_name + "(" + info.user_id + ")"}</td>
							</tr>
							<tr>
								<th scope='row'>수정일</th>
								<td className="text-start">{info.update_date_str} ({info.update_user_name + ", " + info.update_user_id})</td>
							</tr>
							<tr>
								<th scope='row'>앱 이름</th>
								<td className="text-start">{info.app_name}</td>
							</tr>
							<tr>
								<th scope='row'>앱 ID</th>
								<td className="text-start">{info.app_id}</td>
							</tr>
							<tr>
								<th scope='row'>앱 구분</th>
								<td className="text-start">
									{info.app_kind == 'dev'?'개발용':'배포용'}
									<small className="text-secondary-emphasis ms-3">※ iOS는 개발용과 배포용의 IOS가 분리되어 있기어 ‘개발용' 등록된 앱은 앱 푸시 발송 안됨 </small>
								</td>
							</tr>
							<tr>
								<th scope='row'>앱 설명</th>
								<td className="text-start">{info.app_desc}</td>
							</tr>
							<tr>
								<th scope='row'>FCM Auth 인증파일(private key json)</th>
								<td className="text-start">
									{info.authkey_json ? info.authkey_json:''}
								</td>
							</tr>
							<tr>
								<th scope='row'>앱 아이콘</th>
								<td className="text-start">
									<Row className="fileup__ui">
										<Col className="col-auto">
										{
											info.app_icon_filename ?
											<Figure>
												<Figure.Image
													width={80}
													height={80}
													src={Config.getFileBasePath + "/Files/app/" + info.app_icon_filename}
												/>
											</Figure>
											:null
										}
										</Col>
									</Row>
								</td>
							</tr>
						</tbody>
					</Table>
					<Row className="table__button">
						<Col>
							<Button variant="secondary" data-act="list" onClick={eventHandle}>목록</Button>
						</Col>
						<Col className="text-end">
							<Button variant="secondary" data-act="delete" onClick={eventHandle}>삭제</Button>
							<Button variant="primary ms-2" data-act="modify" onClick={eventHandle}>수정</Button>
						</Col>
					</Row>
				</div>

				<div className="main__header mt-5 hide">
					<h2 className="main__header-title">플랫폼</h2>	
				</div>
				<div className="table__wrap hide">
					<Table bordered responsive className="table__view">
						<tbody>
							<tr>
								<th scope='row' rowSpan="4">Android OS</th>
								<th scope='row'>비공개키(json파일)</th>
								<td className="text-start">
									<Button variant="outline-dark" size="sm">
										<RiUploadLine /> 파일 첨부
									</Button>
									<small className="text-secondary-emphasis ms-3">※ 비공개키(json파일)를 등록하세요.</small>
								</td>
							</tr>
							<tr>
								<th scope='row'>패키지명</th>
								<td className="text-start">
									<Form.Control type="text" placeholder="패키지 명을 입력하세요." />
								</td>
							</tr>
							<tr>
								<th scope='row'>Type</th>
								<td className="text-start">비공개키를 등록하면 표시됩니다.</td>
							</tr>
							<tr>
								<th scope='row'>Project ID</th>
								<td className="text-start">비공개키를 등록하면 표시됩니다.</td>
							</tr>
						</tbody>
					</Table>
					<Row className="table__button">
						<Col className="text-end">
							<Button variant="secondary">초기화</Button>
							<Button variant="primary ms-2">저장</Button>
						</Col>
					</Row>
				</div>
				<div className="table__wrap mt-3 hide">
					<Table bordered responsive className="table__view">
						<tbody>
							<tr>
								<th scope='row' rowSpan="4">IOS</th>
								<th scope='row'>.P8 파일</th>
								<td className="text-start">
									<Button variant="outline-dark" size="sm">
										<RiUploadLine /> 파일 첨부
									</Button>
									<small className="text-secondary-emphasis ms-3">※ p8 파일을 등록하세요. 등록 후 적용시간이 소요됩니다.</small>
								</td>
							</tr>
							<tr>
								<th scope='row'>Key ID</th>
								<td className="text-start">
									<Form.Control type="text" placeholder="Key ID를 등록하세요." />
								</td>
							</tr>
							<tr>
								<th scope='row'>Team ID</th>
								<td className="text-start">
									<Form.Control type="text" placeholder="Team ID를 등록하세요." />
								</td>
							</tr>
							<tr>
								<th scope='row'>Bundle ID</th>
								<td className="text-start">
									<Form.Control type="text" placeholder="Bundle ID를 등록하세요." />
								</td>
							</tr>
						</tbody>
					</Table>
					<Row className="table__button">
						<Col className="text-end">
							<Button variant="secondary">초기화</Button>
							<Button variant="primary ms-2">저장</Button>
						</Col>
					</Row>
				</div>
			</Container>
			
		</div>
	);
};
export default AppInfoDetail;

