// import { Navigate } from "react-router-dom";

import ListPage from './../components/ListPage';
import Login from "./../pages/login/login";
import Admin from "./../pages/admin/admin";
import AdminDetail from "./../pages/admin/adminDetail";
import { BrowserRouter,Routes, Route } from 'react-router-dom';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ListPage />} exact />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</BrowserRouter> 
	);
};

			
			
{/* <BrowserRouter>
	<Routes>
		<Route path="/" element={<ListPage />} exact />
		<Route path="/login" element={<Login />} />
		<Route path="/admin" element={<Admin />} />
	</Routes>
</BrowserRouter> */}

export default Router;

