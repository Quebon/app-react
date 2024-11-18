import React from 'react';
import {
	Container,
} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Login from '../pages/login/login';
// import Version from '../pages/version/Version';


const FullLayout = ({page}) => {
	return(
		<div class="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				{page}
				{
				/* <Routes>
					<Route path="/pages/login" element ={<Login/>}></Route >
					<Route  path="/pages/version" element={<Version/>}></Route >
				</Routes> */
				}
				<Outlet />
			</Container>
		</div>
	);
};
export default FullLayout;