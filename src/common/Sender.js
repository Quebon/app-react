import React, { useEffect } from 'react';
import axios from 'axios';
import Config from './config';

const Sender = {
	getList: (props) => {
		Config.log("header");
		Config.log(Config.httpHeader);
		Config.log(props);
		axios.post(Config.host_api + '/sender/getList', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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
	addInfo: (props) => {
		axios.post(Config.host_api + '/sender/addInfo', props.data, {headers:Config.httpHeader}, {withCredentials:true})
			.then(response => {
				Config.log(response);
				Config.log(props);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						if(typeof(props.callback) == "function")
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
	updateInfo: (props) => {
		axios.post(Config.host_api + '/sender/updateInfo', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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
	deleteInfo: (props) => {
		axios.post(Config.host_api + '/sender/deleteInfo', props.data, {headers:Config.httpHeader}, {withCredentials:true})
			.then(response => {
				Config.log(response);
				if(response.status == 200){
					if(response.data.header.code == 200) {
						if(typeof(props.callback) == "function")
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

export default Sender;
