import React, { useEffect } from 'react';
import axios from 'axios';
import Config from './config';

const Auth = {
	isLogin: () => {
		let obj = localStorage.getItem("qb_admin_session");
		if(obj) {
			return true;
		}
		return false;
	},

	logout: (props) => {
		axios.post(Config.host_api + '/auth/logout', {headers:Config.httpHeader})
			.then(response => {
				console.log(response);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						localStorage.removeItem("qb_admin_session");
						localStorage.removeItem("login_id");
						localStorage.removeItem("user_name");
						document.location.href = "/";
					}
					else {
						props.callback(false);
					}
				} else {
					props.callback(false);
				}
			}
		);
	},

	login: (props) => {
		console.log(props);
		axios.post(Config.host_api + '/auth/login', props.data, {headers:Config.httpHeader})
			.then(response => {
				console.log(response);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						localStorage.setItem("qb_admin_session", response.data.body.session_id);
						localStorage.setItem("login_id", response.data.body.login_id);
						localStorage.setItem("user_name", response.data.body.user_name);
						props.callback(true);
					}
					else {
						props.callback(false);
					}
				} else {
					props.callback(false);
				}
			}
		);
	}
}

export default Auth;
