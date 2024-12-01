import React,{ useState, useEffect } from 'react';
import {
	Nav,
	Navbar,
	Row,
	Col,
	Button,	
} from "react-bootstrap";
import Menuitems from "./data";
import {NavLink, Navigate, useNavigate} from 'react-router-dom';
import { 
	RiUserLine,
	RiMenuFill,
} from "react-icons/ri";
import Auth from '../common/Auth';
import {Popup, Alert} from '../common/popup';


import imgLogo from './../assets/images/logo_white.svg';

const Header = () => {
	const navigate = useNavigate();

	useEffect( () => {
		if(!Auth.isLogin()) {
			navigate("/login");
		}
	});
	//const navigate = Link();
	const isLogin = false;
	
	const [isOpen, setMenu] = useState(false);
	const toggleMenu = () => {
		setMenu(isOpen => !isOpen);
	}

	const [popup, setPopup] = useState({isOpen:false});
	const user_id = localStorage.getItem("login_id");
	const logoutResult = function(fg) {
		if(fg) {
		}
		else {
			const popupData = {
				isOpen:true,
				title : "",
				message : "로그아웃에 실패하였습니다.<br />확인 후 재시도 해주세요.",
				closeF : setPopup
			};
			setPopup(popupData);
		}
	};

	const eventHandle = (ev) => {
		Auth.logout({callback:logoutResult});
		console.log(ev);
	};


	return (
		<>
			<div className={isOpen ? "header__wrap show-menu" : "header__wrap hide-menu"}>
				<Row className="header__login" xs="auto">
					<Col>
						<Navbar.Brand href="/" className="fs-5 fw-bold">
							<img src={imgLogo} alt="" />
							<span className="logo-text">QueBon Push admin</span>
						</Navbar.Brand>
					</Col>
					<Col className="header__login-right">
						<div className="login-info"><RiUserLine className="svg-icon" /> {user_id}</div>
						<Button variant="outline-light ms-3" size="sm" data-act="logout" onClick={eventHandle}>로그아웃</Button>
						<Button variant="outline-light ms-2" className="menu-toggle" onClick={()=>toggleMenu()}>
							<RiMenuFill className="svg-icon" />
						</Button>
					</Col>
				</Row>
				<Navbar expand="lg" className="">
					<Nav className="gap-4" as="ul">
					{Menuitems.map((item,index) => (
						<Nav.Item as="li" key={item.id}>
							<NavLink className="nav-link" to={item.href}>{item.title}</NavLink>
						</Nav.Item>
					))}
					</Nav>
				</Navbar>
			</div>
			<Alert opt={popup}/>
		</>
	);
};

export default Header;
