import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListPage } from './components/ListPage';
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
import AdminDetail from "./pages/admin/adminDetail";
import AdminEdit from "./pages/admin/adminEdit";
import AdminAdd from "./pages/admin/adminAdd";
import AppInfo from "./pages/appInfo/appInfo";
import AppInfoAdd from "./pages/appInfo/appInfoAdd";
import AppInfoDetail from "./pages/appInfo/appInfoDetail";
import Send from "./pages/send/send";
import Push from "./pages/push/push";
import Templete from "./pages/templete/templete";
import Popup from "./pages/popup";
import {
	Modal,
	Button
} from "react-bootstrap";


const App = () => {
	const [show, setShow] = useState(false);

	return (
		<>
		<Routes>
			<Route path="/" element={<Admin/>} />
			<Route path="/pub" element={<ListPage/>} />
			<Route path="/login" Component={Login} />
			<Route path="/admin" Component={Admin} />
			<Route path="/admin/view/:seq" Component={AdminDetail} />
			<Route path="/admin/edit/:seq" Component={AdminAdd} />
			<Route path="/admin/add" Component={AdminAdd} />
			<Route path="/app" Component={AppInfo} />
			<Route path="/app/add" Component={AppInfoAdd} />
			<Route path="/app/edit/:seq" Component={AppInfoAdd} />
			<Route path="/app/view/:seq" Component={AppInfoDetail} />
			<Route path="/send" Component={Send} />
			<Route path="/push" Component={Push} />
			<Route path="/templete" Component={Templete} />
			<Route path="/popup" Component={Popup} />
		</Routes>
		<Modal show={show} onHide={setShow} centered size="sm" className="normalType">
			<Modal.Header closeButton>
				<Modal.Title>Title 2222</Modal.Title>
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

		</>
	);
};

export default App;
