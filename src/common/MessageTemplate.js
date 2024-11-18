import React, { useEffect } from 'react';
import axios from 'axios';
import Config from './config';

const MessageTemplate = {
	getList: (props) => {
		console.log("header");
		console.log(Config.httpHeader);
		console.log(props);
		axios.post(Config.host_api + '/messageTemplate/getList', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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
	addInfo: (props) => {
		axios.post(Config.host_api + '/messageTemplate/addInfo', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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
	updateInfo: (props) => {
		axios.post(Config.host_api + '/messageTemplate/updateInfo', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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
	deleteInfo: (props) => {
		axios.post(Config.host_api + '/messageTemplate/deleteInfo', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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

export default MessageTemplate;
