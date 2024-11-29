import React, { useEffect } from 'react';
import axios from 'axios';
import Config from './config';

const Account = {
	getLogList: (props) => {
		Config.log("header");
		Config.log(Config.httpHeader);
		Config.log(props);
		axios.post(Config.host_api + '/account/logList', props.data, {headers:Config.httpHeader})
			.then(response => {
				Config.log(response);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						props.callback(response.data.body);
					}
					else {
						props.callback(null);
					}
				} else {
					props.callback(null);
				}
			}
		);
	},
	getList: (props) => {
		Config.log("header");
		Config.log(Config.httpHeader);
		Config.log(props);
		axios.post(Config.host_api + '/auth/list', props.data, {headers:Config.httpHeader})
			.then(response => {
				Config.log(response);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						props.callback(response.data.body);
					}
					else if(response.data.header.code == "502") {
						alert("로그인 정보가 없습니다.\n다시 로그인 해주세요.");
						document.location.href = "/login";
					}
					else {
						props.callback(null);
					}
				} else {
					props.callback(null);
				}
			}
		);
	},
	getInfo: (props) => {
		axios.post(Config.host_api + '/account/getInfo', props.data, {headers:Config.httpHeader})
			.then(response => {
				Config.log(response);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						props.callback(response.data.body);
					}
					else if(response.data.header.code == "502") {
						alert("로그인 정보가 없습니다.\n다시 로그인 해주세요.");
						document.location.href = "/login";
					}
					else {
						props.callback(null);
					}
				} else {
					props.callback(null);
				}
			}
		);
	},
	addUser: (props) => {
		axios.post(Config.host_api + '/account/addUser', props.data, {headers:Config.httpHeader})
			.then(response => {
				Config.log(response);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						props.callback(response.data.body);
					}
					else {
						props.callback(null);
					}
				} else {
					props.callback(null);
				}
			}
		);
	},
	modifyUser: (props) => {
		axios.post(Config.host_api + '/account/modifyUser', props.data, {headers:Config.httpHeader})
			.then(response => {
				Config.log(response);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						props.callback(response.data.body);
					}
					else {
						props.callback(null);
					}
				} else {
					props.callback(null);
				}
			}
		);
	},
	deleteUser: (props) => {
		axios.post(Config.host_api + '/account/deleteUser', props.data, {headers:Config.httpHeader})
			.then(response => {
				console.log(response);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						props.callback(response.data.body);
					}
					else {
						props.callback(null);
					}
				} else {
					props.callback(null);
				}
			}
		);
	},
}

export default Account;
