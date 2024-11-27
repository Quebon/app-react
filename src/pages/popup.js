import React, { useState } from 'react';
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
import appIcon from './../assets/images/temp_appIcon.png';

const Popup = () => {
	const [show, setShow] = useState(false);
	const [pushModal, setPushModal] = useState(false);
	const [filedownModal, setFiledownModal] = useState(false);
	const [viewModal, setViewModal] = useState(false);
	const [sendModal, setSendModal] = useState(false);
	const [sendFailModal, setSendFailModal] = useState(false);
	const [pushMsgModal, setPushMsgModal] = useState(false);
	const [pushMsg1Modal, setPushMsg1Modal] = useState(false);
	const [templeteModal, setTempleteModal] = useState(false);
	const [senderAddModal, setSenderAddModal] = useState(false);

	return(
		<div className="p-4">
			<h3 className="mb-4">팝업</h3>
			<Button variant="primary mb-2" onClick={() => setShow(true)}>일반 팝업</Button>
			<Button variant="primary ms-3 mb-2" onClick={() => setPushModal(true)}>푸시메세지 테스트 발송 팝업</Button>
			<Button variant="primary ms-3 mb-2" onClick={() => setViewModal(true)}>푸시메세지 미리보기 발송 팝업</Button>
			<Button variant="primary ms-3 mb-2" onClick={() => setFiledownModal(true)}>엑셀 파일 업로드</Button>
			<Button variant="primary ms-3 mb-2" onClick={() => setSendModal(true)}>발송 정보</Button>
			<Button variant="primary ms-3 mb-2" onClick={() => setSendFailModal(true)}>발송 실패 정보</Button>
			<Button variant="primary ms-3 mb-2" onClick={() => setPushMsgModal(true)}>푸시 메시지</Button>
			<Button variant="primary ms-3 mb-2" onClick={() => setPushMsg1Modal(true)}>푸시 메시지1</Button>
			<Button variant="primary ms-3 mb-2" onClick={() => setTempleteModal(true)}>템플릿 정보</Button>
			<Button variant="primary ms-3 mb-2" onClick={() => setSenderAddModal(true)}>발송자 추가</Button>
			
			{/* 일반 팝업 */}
      <Modal show={show} onHide={setShow} centered size="sm" className="normalType">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
					.P8파일을 변경하면 푸시 발송 후 등록된 토큰이 삭제될 수 있습니다.<br />
					반드시 유효한 파일인지 확인 후 <br />업로드 하세요.
				</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>취소</Button>
          <Button variant="primary" onClick={() => setShow(false)}>확인</Button>
        </Modal.Footer>
      </Modal>
			
			{/* 푸시메세지 테스트 발송 팝업 */}
      <Modal show={pushModal} onHide={setPushModal} centered className="">
        <Modal.Header closeButton>
          <Modal.Title>테스트 발송</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					{/* 검색 영역 */}
					<Form>
						<Row className="search__form">
							<Col>
								<Row className="search__form-group">
									<Col lg="auto">
										<Form.Select aria-label="system" className="d-inline-block w-auto">
											<option value="1">검색어</option>
											<option value="2">성명</option>
											<option value="3">회원ID</option>
										</Form.Select>
										<Form.Control type="text" className="d-inline-block w-auto ms-1" placeholder="" />
									</Col>
								</Row>
							</Col>
							<Col lg="2" className="text-end">
								<Button variant="outline-primary">검색</Button>
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
								<Pagination.Item>{4}</Pagination.Item>
								<Pagination.Item>{5}</Pagination.Item>
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
			
			{/* 엑셀 파일 업로드 */}
      <Modal show={filedownModal} onHide={setFiledownModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>엑셀 파일 업로드</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<div className="bg-box text-center">
						총 발송 대상자 <strong>1456</strong>명
					</div>
					<div className="text-center mt-4 mb-4">
						발송 대상자 엑셀을 업로드해주세요.<br />
						<Button variant="secondary mt-3 mb-3"><RiUpload2Line /> 파일 업로드</Button><br />
						<div className="text-start d-flex justify-content-center text-secondary">
							&middot; 첨부 : 파일명.확장자 (1,123KB)<br />
							&middot; 샘플 : 엑셀파일 양식 [다운로드]
						</div>
					</div>
				</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFiledownModal(false)}>취소</Button>
          <Button variant="primary" onClick={() => setFiledownModal(false)}>대상자 확정</Button>
        </Modal.Footer>
      </Modal>
			
			{/* 미리보기 */}
      <Modal show={viewModal} onHide={setViewModal} centered size="sm">
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
          <Button variant="secondary" onClick={() => setViewModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
			
			{/* 발송 실퍠 정보 */}
      <Modal show={sendFailModal} onHide={setSendFailModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>발송 실패 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<div className="table__view">
						<Table bordered responsive className="table__view">
							<tbody>
								<tr>
									<th scope='row'>발송 일시</th>
									<td className="text-start">2024-09-01 13:30</td>
								</tr>
								<tr>
									<th scope='row'>앱 이름(앱 ID)</th>
									<td className="text-start">깨봉수학 (quebon)</td>
								</tr>
								<tr>
									<th scope='row'>메시지</th>
									<td className="text-start">'인공지능수학 깨봉' 채널을 추가해 주셔서 감사합니다.</td>
								</tr>
								<tr>
									<th scope='row'>발송 성공</th>
									<td className="text-start">800/1000</td>
								</tr>
								<tr>
									<th scope='row'>발송 실패</th>
									<td className="text-start">200/1000</td>
								</tr>
							</tbody>
						</Table>
					</div>
					<div className="mt-2 text-end">
						<Button variant="dark" size="sm">리스트 다운로드</Button>
					</div>
					<div className="table__wrap mt-2">
						<Table bordered responsive>
							<thead>
								<tr>
									<th scope='col'>No</th>
									<th scope='col'>ID</th>
									<th scope='col'>성명</th>
									<th scope='col'>플랫폼</th>
									<th scope='col'>실패 사유</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Hong dil-dong1</td>
									<td>홍길동</td>
									<td>IOS 16</td>
									<td>Client Error. Maximum limit exceeded.</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hong dil-dong1</td>
									<td>홍길동</td>
									<td>Android 17</td>
									<td>Client Error. Maximum limit exceeded.</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hong dil-dong1</td>
									<td>홍길동</td>
									<td>IOS 16</td>
									<td>Client Error. Maximum limit exceeded.</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hong dil-dong1</td>
									<td>홍길동</td>
									<td>IOS 16</td>
									<td>Client Error. Maximum limit exceeded.</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hong dil-dong1</td>
									<td>홍길동</td>
									<td>IOS 16</td>
									<td>Client Error. Maximum limit exceeded.</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hong dil-dong1</td>
									<td>홍길동</td>
									<td>IOS 16</td>
									<td>Client Error. Maximum limit exceeded.</td>
								</tr>
							</tbody>
						</Table>
						<div className="table__pagination">
							<Pagination>
								<Pagination.Prev />
								<Pagination.Item active>{1}</Pagination.Item>
								<Pagination.Item>{2}</Pagination.Item>
								<Pagination.Item>{3}</Pagination.Item>
								<Pagination.Item>{4}</Pagination.Item>
								<Pagination.Item>{5}</Pagination.Item>
								<Pagination.Next />
							</Pagination>
						</div>
					</div>
				</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setSendFailModal(false)}>재발송</Button>
          <Button variant="secondary" onClick={() => setSendFailModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
			
			{/* 발송 정보 */}
      <Modal show={sendModal} onHide={setSendModal} centered size="">
        <Modal.Header closeButton>
          <Modal.Title>발송 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<div className="table__view">
						<Table bordered responsive className="table__view">
							<tbody>
								<tr>
									<th scope='row'>발송 일시</th>
									<td className="text-start">2024-09-01 13:30</td>
								</tr>
								<tr>
									<th scope='row'>앱 이름(앱 ID)</th>
									<td className="text-start">깨봉수학 (quebon)</td>
								</tr>
								<tr>
									<th scope='row'>메시지</th>
									<td className="text-start">'인공지능수학 깨봉' 채널을 추가해 주셔서 감사합니다.</td>
								</tr>
								<tr>
									<th scope='row'>발송 성공</th>
									<td className="text-start">800/1000</td>
								</tr>
								<tr>
									<th scope='row'>발송 실패</th>
									<td className="text-start">200/1000</td>
								</tr>
								<tr>
									<th scope='row'>실패 사유</th>
									<td className="text-start">Client Error. Maximum limit exceeded.</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSendModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
			
			{/* 푸시 메시지 */}
      <Modal show={pushMsgModal} onHide={setPushMsgModal} centered size="sm" className="">
        <Modal.Header closeButton>
          <Modal.Title>푸시 메시지</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<div className="text-center p-3">
						“가을맞이 이벤트를 알려드립니다.”<br />
						<br />
						<strong>현재 상태 : 발송 예약</strong>
					</div>
				</Modal.Body>
        <Modal.Footer>
					<Col>
						<Button variant="secondary" onClick={() => setPushMsgModal(false)}>삭제</Button>
					</Col>
					<Col className="text-end">
						<Button variant="primary" onClick={() => setPushMsgModal(false)}>수정</Button>
						<Button variant="secondary ms-2" onClick={() => setPushMsgModal(false)}>닫기</Button>
					</Col>
          
        </Modal.Footer>
      </Modal>
			
			{/* 푸시 메시지1 */}
      <Modal show={pushMsg1Modal} onHide={setPushMsg1Modal} centered size="sm" className="">
        <Modal.Header closeButton>
          <Modal.Title>푸시 메시지</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<div className="text-center p-3">
						“가을맞이 이벤트를 알려드립니다.”<br />
						<br />
						<strong>현재 상태 : 일시 정지</strong>
					</div>
				</Modal.Body>
        <Modal.Footer>
					<Col>
						<Button variant="secondary" onClick={() => setPushMsg1Modal(false)}>긴급 종료</Button>
						<Button variant="primary ms-2" onClick={() => setPushMsg1Modal(false)}>일시정지 해제</Button>
					</Col>
					<Col className="text-end" xs={3}>
						<Button variant="secondary" onClick={() => setPushMsg1Modal(false)}>닫기</Button>
					</Col>
          
        </Modal.Footer>
      </Modal>
			
			{/* 템플릿 정보 */}
      <Modal show={templeteModal} onHide={setTempleteModal} centered size="">
        <Modal.Header closeButton>
          <Modal.Title>템플릿 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<div className="table__view">
						<Table bordered responsive className="table__view">
							<tbody>
								<tr>
									<th scope='row'>등록일</th>
									<td className="text-start">2024-09-01 13:30</td>
								</tr>
								<tr>
									<th scope='row'>제목</th>
									<td className="text-start">
										<Form.Control value="튜터링 학생 휴회 알림"></Form.Control>
									</td>
								</tr>
								<tr>
									<th scope='row'>본문</th>
									<td className="text-start">
										<Form.Control as="textarea" rows={10}></Form.Control>
									</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setTempleteModal(false)}>삭제</Button>
					<Button variant="secondary" onClick={() => setTempleteModal(false)}>취소</Button>
					<Button variant="primary" onClick={() => setTempleteModal(false)}>수정</Button>
        </Modal.Footer>
      </Modal>
			
			{/* 발송자 추가 */}
      <Modal show={senderAddModal} onHide={setSenderAddModal} centered size="">
        <Modal.Header closeButton>
          <Modal.Title>발송자 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<div className="table__view">
						<Table bordered responsive className="table__view">
							<tbody>
								<tr>
									<th scope='row'>등록일</th>
									<td className="text-start">2024-09-01 13:30</td>
								</tr>
								<tr>
									<th scope='row'>발송자 ID</th>
									<td className="text-start">
										<Form.Control placeholder="발송자ID를 입력하세요"></Form.Control>
									</td>
								</tr>
								<tr>
									<th scope='row'>발송자명</th>
									<td className="text-start">
										<Form.Control placeholder="발송자명을 입력하세요"></Form.Control>
									</td>
								</tr>
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
														src={appIcon}
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
												<small className="text-secondary-emphasis">※ size : 512px  X 512px, PNG, JPG , 1MB이하</small>
											</Col>
										</Row>
									</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setTempleteModal(false)}>취소</Button>
					<Button variant="primary" onClick={() => setTempleteModal(false)}>저장</Button>
        </Modal.Footer>
      </Modal>
    </div>
	);
};
export default Popup;

