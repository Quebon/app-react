import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "./../../components/Header";
import {
	Container,
	Row,
	Col,
	Button,
	Table,	
} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import account from '../../common/Account';

const AdminDetail = () => {
	const navigate = useNavigate();
	const {seq} = useParams();
	const [info, setInfo] = useState(null);
	console.log("data_key=" + seq);

	useEffect(() => {getInfo();}, []);

	const eventHandle = (ev) => {
		ev.preventDefault();
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");
		console.log("act = " + act_v);

		if(act_v == "list") {
			document.location.href = "/admin"
		}
		else if(act_v == "modify") {
			document.location.href = "/admin/edit/" + seq;
		}
		else if(act_v == "resetPW") {
			if(window.confirm("임시 비밀번호를 발송하시겠습니까?")) {
			}
		}
		else if(act_v == "delete") {
			let seq_v = evo.getAttribute("data-id");
			if(window.confirm("삭제하시겠습니까?")) {
				const data = {"seq":seq};
				account.deleteUser({data:data, callback:response2});
			}
		}
	};	

	const getInfo = () => {
		const data = {"seq":seq};
		account.getInfo({data:data, callback:response});
	}

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

	const response2 = function(obj) {
		if(obj) {
			if(obj.seq > 0) {
				alert("삭제하였습니다.");
				document.location.href = "/admin";
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
					<h2 className="main__header-title">운영자 상세보기</h2>	
				</div>
				<div className="table__wrap mt-4">
					<Table bordered responsive className="table__view">
						<tbody>
							<tr>
								<th scope='row'>아이디</th>
								<td className="text-start">{info?info.login_id:''}</td>
							</tr>
							<tr>
								<th scope='row'>비밀번호</th>
								<td className="text-start">{info?'************':''}</td>
							</tr>
							<tr>
								<th scope='row'>성명</th>
								<td className="text-start">{info?info.user_name:''}</td>
							</tr>
							<tr>
								<th scope='row'>이메일</th>
								<td className="text-start">{info?info.email:''}</td>
							</tr>
							<tr>
								<th scope='row'>연락처</th>
								<td className="text-start">{info?info.phone:''}</td>
							</tr>
							<tr>
								<th scope='row'>권한</th>
								<td className="text-start">{info?(info.user_level == 'A'?"관리자":"운영자"):''}</td>
							</tr>
							<tr>
								<th scope='row'>등록일</th>
								<td className="text-start">{info?info.reg_date_str:''}</td>
							</tr>
							<tr>
								<th scope='row'>수정일</th>
								<td className="text-start">{info?info.update_date_str:''}</td>
							</tr>
						</tbody>
					</Table>
					<Row className="table__button">
						<Col xs="auto">
							<Button variant="secondary" data-act="list" onClick={eventHandle}>목록</Button>
						</Col>
						<Col className="text-end">
							<Button variant="secondary" data-act="delete" onClick={eventHandle}>아이디 삭제</Button>
							<Button variant="secondary ms-2 hide" data-act="resetPW" onClick={eventHandle}>임시 비밀번호 삭제</Button>
							<Button variant="primary ms-2" data-act="modify" onClick={eventHandle}>수정</Button>
						</Col>
					</Row>
				</div>
			</Container>
			
		</div>
	);
};
export default AdminDetail;

