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
} from "react-bootstrap";
import account from '../../common/Account';

const AdminAdd = () => {
	const {seq} = useParams();
	console.log("data_key=" + seq);
	const [validated, setValidated] = useState(false);
	const [info, setInfo] = useState(null);

	useEffect(() => {getInfo();}, []);

	const frm = document.querySelector("#frmInput");
	const eventHandle = (ev) => {
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);


		if(act_v == "list") {
			document.location.href = "/admin"
		}
		else if(act_v == "reset") {
			window.history.back();
		}
		else if(act_v == "save") {
			if (validation() === false) {
				alert("모든 정보를 규칙에 맞게 입력해야 저장 가능합니다.");
			}else{
				const formData = new FormData(frm);
				const data = Object.fromEntries(formData.entries());
				console.log(data);
				if(seq > 0) {
					data["seq"] = seq;
					account.modifyUser({data:data, callback:response});
				}else {
					account.addUser({data:data, callback:response});
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
			account.getInfo({data:data, callback:(result)=>{ 
				if(result.info) {
					setInfo(result.info);
					if(result.info.user_level == 'A') {
						document.querySelector("#user_level").selectedIndex = 1;
					}
					else if(result.info.user_level == 'O') {
						document.querySelector("#user_level").selectedIndex = 2;
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
					document.location.href = "/admin/view/" + seq;
				}
				else {
					document.location.href = "/admin/view/" + obj.data.seq;
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
		const frm = document.querySelector("#frmInput");
		if(seq <= 0) {
			const userIdRegex = /^[A-Za-z0-9+]{5,20}$/;
			if (!userIdRegex.test(frm.login_id.value)) return false;
		}

		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		if (!passwordRegex.test(frm.login_pw.value)) return false;

		const userNameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{1,30}$/;
		if (!userNameRegex.test(frm.user_name.value)) return false;

		const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
		if (!emailRegex.test(frm.email.value)) return false;

		var phoneRegex = /^[0-9]{3,11}$/; 
		if (!phoneRegex.test(frm.phone.value)) return false;

		if(frm.user_level.selectedIndex == 0) return false;

		return true;
    }

	return(
		<div className="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				<div className="main__header">
					<h2 className="main__header-title">{seq > 0?'운영자 수정':'운영자 등록'}</h2>	
				</div>
				<div className="table__wrap mt-4">
					<form noValidate validated={validated}  name="frmInput" id="frmInput">
					<Table bordered responsive className="table__view">
						<tbody>
							{ info ? 
							<tr>
								<th scope='row'>아이디</th>
								<td className="text-start">
									{info ? info.login_id:''}
								</td>
							</tr>
							:
							<tr>
								<th scope='row'>아이디</th>
								<td className="text-start">
									<Form.Control type="text" maxLength={"20"}
									placeholder="아이디를 입력하세요." name="login_id" id="login_id" required/>
									<small className="text-secondary-emphasis">(영문, 숫자, 특수문자 20자 이내)</small>
								</td>
							</tr>
							}
							<tr>
								<th scope='row'>비밀번호</th>
								<td className="text-start">
									<Form.Control type="password" maxLength={"10"} placeholder="비밀번호를 입력하세요." name="login_pw" id="login_pw" required />
									<small className="text-secondary-emphasis">(영문, 특수문자 10자 이내)</small>
								</td>
							</tr>
							<tr>
								<th scope='row'>성명</th>
								<td className="text-start">
									<Form.Control type="text" maxLength={"30"} placeholder="성명을 입력하세요." name="user_name" id="user_name" required defaultValue={info?info.user_name:''} />
									<small className="text-secondary-emphasis">(한글, 영문, 특수문자 30자 이내)</small>
								</td>
							</tr>
							<tr>
								<th scope='row'>이메일</th>
								<td className="text-start">
									<Form.Control type="email" maxLength={"30"} placeholder="이메일을 입력하세요." name="email" id="email" defaultValue={info?info.email:''}/>
									<small className="text-secondary-emphasis">(영문, “@”, “.” 30자 이내 제한)</small>
								</td>
							</tr>
							<tr>
								<th scope='row'>연락처</th>
								<td className="text-start">
									<Form.Control type="tel" maxLength={"11"} placeholder="연락처를 입력하세요." name="phone" id="phone" required defaultValue={info?info.phone:''}/>
									<small className="text-secondary-emphasis">(“-” 제외, 숫자 11자 이내)</small>
								</td>
							</tr>
							<tr>
								<th scope='row'>권한</th>
								<td className="text-start">
									<Form.Select aria-label="" name="user_level" id="user_level">
										<option value="">권한을 선택하세요.</option>
										<option value="A">어드민</option>
										<option value="O">운영자</option>
									</Form.Select>
								</td>
							</tr>
							{isNaN(seq) ? null:
							<tr>
								<th scope='row'>등록일</th>
								<td className="text-start">2024-01-01 12:34</td>
							</tr>}
						</tbody>
					</Table>
					<Row className="table__button">
						<Col>
							<Button variant="secondary" data-act="list" onClick={eventHandle}>목록</Button>
						</Col>
						<Col className="text-end">
							<Button variant="secondary" data-act="reset" onClick={eventHandle}>취소</Button>
							<Button variant="primary ms-2" data-act="save" onClick={eventHandle}>저장</Button>
						</Col>
					</Row>
					</form>
				</div>
			</Container>
			
		</div>
	);
};
export default AdminAdd;

