import React from 'react';
import {
	Table,
} from "react-bootstrap";
import { Link,Outlet } from "react-router-dom";

const MenuList = () => {
	return(
		<div className='menuList-wrap' style={{marginTop:"30px",}}>
			<div className="fs-3 fw-bold">깨봉앱 퍼블리싱</div>
			<Table bordered className="mt-2" style={{fontSize:"14px"}}>
				<colgroup><col width="80px" /><col /><col /><col /></colgroup>
				<thead>
					<tr>
						<th>번호</th>
						<th>파일명</th>
						<th>화면 내용</th>
						<th>비고</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>/pages/login</td>
						{/* <td><Link to=<Login />>로그인</Link></td> */}
					</tr>
				</tbody>
			</Table>
			<Outlet />
		</div>
		
	);
};
export default MenuList;

