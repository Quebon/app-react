import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
import app from '../../common/App';
import Config from '../../common/config.js';
import FileUpload from '../../components/FileUpload.tsx';


const AppInfoAdd = () => {
	const {seq} = useParams();

	const [validated, setValidated] = useState(false);
	const [info, setInfo] = useState({app_icon_filename:""});
	const [regInfo, setRegInfo] = useState("");

	useEffect(() => {
		if(seq > 0) {
			getInfo();
		}
		else {
			const today = new Date();
			const date_v = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			setRegInfo(date_v);
		}
	}, []);
	const frm = document.querySelector("#frmInput");
	const eventHandle = (ev) => {
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);


		if(act_v == "list") {
			document.location.href = "/app"
		}
		else if(act_v == "cancel") {
			window.history.back();
		}
		else if(act_v == "addFile") {
			let fo = document.querySelector("#upFile");
			fo.click();
		}
		else if(act_v == "save") {
			if (validation() === false) {
				alert("모든 정보를 규칙에 맞게 입력해야 저장 가능합니다.");
			}else{
				const formData = new FormData(frm);
				const data = Object.fromEntries(formData.entries());
				console.log(data);
				if(seq > 0) {
					formData.append("seq", seq);
					app.modifyApp({data:formData, callback:response});
				}else {
					app.addApp({data:formData, callback:response});
				}
			}
		}
		else if(act_v == "delete") {
			if(window.confirm("삭제하시겠습니까?")) {
			}
		}
	};

	const getInfo = () => {
		if(seq > 0) {
			const data = {"seq":seq};
			app.getInfo({data:data, callback:(result)=>{ 
				if(result.info) {
					setInfo(result.info);
					setRegInfo(result.info.reg_date_str);
					const frm = document.querySelector("#frmInput");
					if(result.info.app_kind == "dev") {
						document.querySelector("#app_kind_dev").setAttribute("checked", "checked");
					}
					else if(result.info.app_kind == "pub") {
						document.querySelector("#app_kind_pub").setAttribute("checked", "checked");
					}
				}
			}
		});
		}
	}

	const response = function(obj) {
		if(obj) {
			if(obj.seq > 0) {
				alert("저장했습니다.");
				if(seq > 0) {
					document.location.href = "/app/view/" + seq;
				}
				else {
					document.location.href = "/app/view/" + obj.data.seq;
				}
			}
			else {
				alert("이미 사용중인 아이디입니다.\n다른 아이디를 사용해 주세요.");
			}
		}
		else {
			alert("저장에 실패했습니다.\n다시 시도해주세요.");
		}
	};

	const validation = () => {
		let frm = document.querySelector("#frmInput");

		const userNameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{1,50}$/;
		if (!userNameRegex.test(frm.app_name.value)) return false;

		const regex2 =  /^(?=.{1,50}$).*/
		if (!regex2.test(frm.app_id.value)) return false;

		var opt1 = document.querySelector("#app_kind_dev");
		var opt2 = document.querySelector("#app_kind_pub");

		if(opt1.checked == false && opt2.checked == false) {
			return false;
		}
		return true;
    }

	return(
		<div className="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				<div className="main__header">
					<h2 className="main__header-title">앱 등록</h2>	
				</div>
				<div className="table__wrap mt-4">
					<form noValidate validated={validated}  name="frmInput" id="frmInput">
					<Table bordered responsive className="table__view">
						<tbody>
							<tr>
								<th scope='row'>등록일</th>
								<td className="text-start">{regInfo}</td>
							</tr>
							<tr>
								<th scope='row'>작성자</th>
								<td className="text-start">{localStorage.getItem("user_name")}({localStorage.getItem("login_id")})</td>
							</tr>
							<tr>
								<th scope='row'>앱 이름</th>
								<td className="text-start">
									<Form.Control type="text" name="app_name" maxLength={50} id="app_name" defaultValue={info?info.app_name:''} placeholder="앱 이름을 입력하세요." />
								</td>
							</tr>
							<tr>
								<th scope='row'>앱 ID</th>
								<td className="text-start">
									<Form.Control type="text" name="app_id" id="app_id" defaultValue={info?info.app_id:''} placeholder="앱 ID를 입력하세요." />
								</td>
							</tr>
							<tr>
								<th scope='row'>앱 구분</th>
								<td className="text-start">
									<div key="inline-radio">
										<Form.Check
											inline
											label="개발용"
											name="app_kind"
											type="radio"
											id="app_kind_dev"
											value="dev"
										/>
										<Form.Check
											inline
											label="배포용"
											name="app_kind"
											type="radio"
											value="pub"
											id="app_kind_pub"
										/>
									</div>
									<small className="text-secondary-emphasis">※ iOS는 개발용과 배포용의 IOS가 분리되어 있기어 ‘개발용' 등록된 앱은 앱 푸시 발송 안됨 </small>
								</td>
							</tr>
							<tr>
								<th scope='row'>앱 설명</th>
								<td className="text-start">
									<Form.Control type="text" name="app_desc" maxLength={500} id="app_desc" defaultValue={info?info.app_desc:''} placeholder="설명을 입력하세요." />
								</td>
							</tr>
							<tr>
								<th scope='row'>FCM Auth 인증파일(private key json)</th>
								<td className="text-start">
									<input type="file" name="authkey" id="authkey"/>
									{info.authkey_json ? info.authkey_json:''}
								</td>
							</tr>
							<tr>
								<th scope='row'>앱 아이콘</th>
								<td className="text-start">
									<Row className="fileup__ui">
										<Col className="col-auto">
											<FileUpload maxFileSize={1} inputName={"upFile"}></FileUpload>
										</Col>
{
	(info.app_icon_filename != "") ?
		<figure className="figure" data-id="upfile_1">
			<img width={80} height={80} src={Config.getFileBasePath + "/Files/app/" + info.app_icon_filename}/>
		</figure>
		: ""
}
										<Col className="col-auto">
											<Button variant="outline-dark" size="sm" data-act="addFile" onClick={eventHandle}>
												<RiUploadLine /> 파일 첨부
											</Button>
											<Button variant="outline-dark ms-2" size="sm">
												<RiDeleteBinLine /> 삭제
											</Button>
										</Col>
										<Col className="col-auto">
											<small className="text-secondary-emphasis">※ size : 512px  X 512px, PNG, JPG , 1MB이하</small>
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
							<Button variant="secondary" data-act="cancel" onClick={eventHandle}>취소</Button>
							<Button variant="primary ms-2" data-act="save" onClick={eventHandle}>저장</Button>
						</Col>
					</Row>
					</form>
				</div>
			</Container>
			
		</div>
	);
};
export default AppInfoAdd;

