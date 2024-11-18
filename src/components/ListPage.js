import React from 'react';
import {
	Container,
	Table,
} from "react-bootstrap";
import {Link} from "react-router-dom";

export const ListPage = () => {
	return(
		<div className="wrapper">
			<Container as="main" fluid>
				<div className="menuList__wrap" style={{marginTop:"30px",}}>
					<div className="fs-3 fw-bold mb-3">깨봉앱 퍼블리싱</div>
					<Table bordered className="mt-2" style={{fontSize:"13px",textAlign:"left"}}>
						<colgroup><col width="60px" /><col width="30%" /><col width="30%" /><col /></colgroup>
						<thead>
							<tr>
								<th className="bg-success text-white" style={{paddingBlock:"12px"}}>번호</th>
								<th className="bg-success text-white" style={{paddingBlock:"12px"}}>파일명</th>
								<th className="bg-success text-white" style={{paddingBlock:"12px"}}>화면 내용</th>
								<th className="bg-success text-white" style={{paddingBlock:"12px"}}>비고</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colSpan="4" className='fw-bold'>로그인</td>
							</tr>
							<tr>
								<td>1</td>
								<td><Link to="/login" target='page'>/pages/login</Link></td>
								<td>로그인</td>
								<td className="rmks"></td>
							</tr>
							<tr>
								<td colSpan="4" className='fw-bold'>운영자 관리</td>
							</tr>
							<tr>
								<td>1</td>
								<td><Link to="/Admin" target='page'>/pages/admin</Link></td>
								<td>운영자 관리</td>
								<td className="rmks">접속 로그 탭</td>
							</tr>
							<tr>
								<td>2</td>
								<td><Link to="/AdminDetail" target='page'>/pages/admin/admin/list</Link></td>
								<td>운영자 관리 / 검색,목록 / 상세보기</td>
								<td className="rmks">10.13<br/>타이틀 수정</td>
							</tr>
							<tr>
								<td>3</td>
								<td><Link to="/AdminEdit" target='page'>/pages/admin/admin/view</Link></td>
								<td>운영자 관리 / 검색,목록 / 상세보기 / 수정</td>
								<td className="rmks">10.13<br/>타이틀 수정</td>
							</tr>
							<tr>
								<td>4</td>
								<td><Link to="/AdminAdd" target='page'>/pages/admin/admin/add</Link></td>
								<td>운영자 관리 / 검색,목록 / 운영자 등록</td>
								<td className="rmks">10.13<br/>타이틀 수정</td>
							</tr>
							<tr>
								<td colSpan="4" className='fw-bold'>앱 정보 관리</td>
							</tr>
							<tr>
								<td>1</td>
								<td><Link to="/AppInfo" target='page'>/pages/appInfo/appInfo</Link></td>
								<td>앱 정보 관리</td>
								<td className="rmks"></td>
							</tr>
							<tr>
								<td>2</td>
								<td><Link to="/AppInfoAdd" target='page'>/pages/appInfo/appInfoAdd</Link></td>
								<td>앱 정보 관리 / 등록</td>
								<td className="rmks">10.13<br/>파일 첨부 아이콘 수정</td>
							</tr>
							<tr>
								<td>3</td>
								<td><Link to="/AppInfoDetail" target='page'>/pages/appInfo/appInfoDetail</Link></td>
								<td>앱 정보 관리 / 앱 상세보기 (플랫폼 등록 전)</td>
								<td className="rmks">10.13<br/>파일 첨부 아이콘 수정 / 삭제로 수정<br/>10.14<br/>초기화 버튼 추가</td>
							</tr>
							<tr>
								<td colSpan="4" className='fw-bold'>발송 관리</td>
							</tr>
							<tr>
								<td>1</td>
								<td><Link to="/Send" target='page'>/pages/send/send</Link></td>
								<td>발송 관리</td>
								<td className="rmks">일별 발송이력 탭<br/>10.13<br/>상태 영역 변경 / 서버연동 발송이력 탭 추가</td>
							</tr>
							<tr>
								<td colSpan="4" className='fw-bold'>푸시 발송</td>
							</tr>
							<tr>
								<td>1</td>
								<td><Link to="/Push" target='page'>/pages/push/push</Link></td>
								<td>푸시 발송</td>
								<td className="rmks">웰컴 메세지 탭<br/>10.13<br/>파일 첨부 아이콘 수정 / textarea placeholder 추가 / 링크 타이틀 추가 / 예약 발송 추가</td>
							</tr>
							<tr>
								<td colSpan="4" className='fw-bold'>템플릿/발송자 관리</td>
							</tr>
							<tr>
								<td>1</td>
								<td><Link to="/Templete" target='page'>/pages/templete/templete</Link></td>
								<td>템플릿 관리</td>
								<td className="rmks">발송자 관리 탭</td>
							</tr>
							<tr>
								<td colSpan="4" className='fw-bold'>팝업</td>
							</tr>
							<tr>
								<td>1</td>
								<td><Link to="/Popup" target='page'>/pages/popup</Link></td>
								<td>팝업 모음</td>
								<td className="rmks">10.13<br/>푸시 메시지 텍스트 수정<br/>10.15<br/>테스트 발송 버튼 수정 / 발송자 추가 업로드 버튼 아이콘 변경</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</Container>
		</div>
	);
};
export default ListPage;