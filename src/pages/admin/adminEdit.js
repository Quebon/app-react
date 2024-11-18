import React from 'react';
import Header from "./../../components/Header";
import {
	Container,
	Row,
	Col,
	Button,
	Table,
	Form,
} from "react-bootstrap";

const AdminEdit = () => {
	return(
		<div className="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				<div className="main__header">
					<h2 className="main__header-title">운영자 수정</h2>	
				</div>
				<div className="table__wrap mt-4">
					<Table bordered responsive className="table__view">
						<tbody>
							<tr>
								<th scope='row'>아이디</th>
								<td className="text-start">Hong gil-dong</td>
							</tr>
							<tr>
								<th scope='row'>비밀번호</th>
								<td className="text-start">
									<Form.Control type="password" placeholder="비밀번호를 입력하세요." />
									<small className="text-secondary-emphasis">(영문, 특수문자 10자 이내)</small>
								</td>
							</tr>
							<tr>
								<th scope='row'>성명</th>
								<td className="text-start">
									<Form.Control type="text" value="홍길동" />
								</td>
							</tr>
							<tr>
								<th scope='row'>이메일</th>
								<td className="text-start">
									<Form.Control type="email" value="gil-dong@gmail.com" />
								</td>
							</tr>
							<tr>
								<th scope='row'>연락처</th>
								<td className="text-start">
									<Form.Control type="tel" value="010-1234-5678" />
								</td>
							</tr>
							<tr>
								<th scope='row'>권한</th>
								<td className="text-start">
									<Form.Select aria-label="">
										<option value="0">권한을 선택하세요.</option>
										<option value="1">어드민</option>
										<option value="2">운영자</option>
									</Form.Select>
								</td>
							</tr>
							<tr>
								<th scope='row'>등록일</th>
								<td className="text-start">2024-01-01 12:34</td>
							</tr>
						</tbody>
					</Table>
					<Row className="table__button">
						<Col>
							<Button variant="secondary">목록</Button>
						</Col>
						<Col className="text-end">
							<Button variant="secondary">취소</Button>
							<Button variant="primary ms-2">저장</Button>
						</Col>
					</Row>
				</div>
			</Container>
			
		</div>
	);
};
export default AdminEdit;

