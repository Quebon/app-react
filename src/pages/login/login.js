import React, { useState } from 'react';
import {
	Form,
	Button,
	FloatingLabel,
} from "react-bootstrap";
import Auth from '../../common/Auth';
import {Popup, Alert} from '../../common/popup';
import imgLogo from './../../assets/images/logo.png';
import { useSelector } from "react-redux";

// function Login() {
const Login = () => {
	const [popup, setPopup] = useState({isOpen:false});
	const resultPopup = function(fg) {
		if(fg) {
			document.location.href = "/";
		}
		else {
			alert("로그인에 실패하였습니다.\n확인 후 재시도 해주세요.");
			//const popupData = {
			//	isOpen:true,
			//	title : "",
			//	message : "로그인에 실패하였습니다.<br />확인 후 재시도 해주세요.",
			//	closeF : setPopup
			//};
			//setPopup(popupData);
		}
	};
	const eventHandle = (ev) => {
		if(ev.type == "keydown") {
			if(ev.keyCode === 13) {
				goLogin();
				return false;
			}
			return true;
		}
		ev.preventDefault();
		goLogin();
	};

	const goLogin = () => {
		const frm = document.querySelector("#frmLogin");
		let fg = frm.checkValidity();

		if(!fg) {
			alert("아이디, 비밀번호를 입력하세요.");
			//const popupData = {
			//	isOpen:true,
			//	title : "",
			//	message : "아이디, 비밀번호를 입력하세요.",
			//	closeF : setPopup
			//};
			//setPopup(popupData);
			return;
		}
		const formData = new FormData(frm);
		const data = Object.fromEntries(formData.entries());
		console.log(data);

		Auth.login({data:data, callback:resultPopup});
	}

	return(
		<div className="login__wrap">
			<div className="login__wrap-inner">
				<div className="login__head">
					<img src={imgLogo} alt="" />
					<h1 className="mt-3">QueBon Push admin</h1>
					<p>시스템을 사용하기 위해서는 발급받은 아이디와 비밀번호를 입력해 주세요</p>
				</div>
				<Form name="frmLogin" id="frmLogin" className="m-auto">
					<FloatingLabel
						label="아이디"
						className="mb-3"
					>
						<Form.Control type="text" id="login_id" name="login_id" placeholder="아이디를 입력하세요." required/>
					</FloatingLabel>
					<FloatingLabel 
						label="비밀번호"
						className="mb-5"
					>
						<Form.Control type="password" id="login_pw" name="login_pw" placeholder="비밀번호를 입력하세요." required onKeyDown={eventHandle}/>
					</FloatingLabel>
					<Button variant="primary" size="lg" type="button" onClick={eventHandle}>LOGIN</Button>
				</Form>
			</div>
			<Alert opt={popup}/>
		</div>
	);
};
export default Login;

