import React, { useEffect } from 'react';
import axios from 'axios';
import Config from './config';

const App = {
	getList: (props) => {
		console.log("header");
		console.log(Config.httpHeader);
		console.log(props);
		axios.post(Config.host_api + '/app/list', props.data, {headers:Config.httpHeader})
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
	getInfo: (props) => {
		axios.post(Config.host_api + '/app/getInfo', props.data, {headers:Config.httpHeader})
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
	addApp: (props) => {
		axios.post(Config.host_api + '/app/addApp', props.data, {headers:Config.httpHeader})
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
	modifyApp: (props) => {
		axios.post(Config.host_api + '/app/modifyApp', props.data, {headers:Config.httpHeader})
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
	updateAOS: (props) => {
		axios.post(Config.host_api + '/app/updateAOS', props.data, {headers:Config.httpHeader})
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
	updateIOS: (props) => {
		axios.post(Config.host_api + '/app/updateIOS', props.data, {headers:Config.httpHeader})
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

	deleteApp: (props) => {
		axios.post(Config.host_api + '/app/deleteApp', props.data, {headers:Config.httpHeader})
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

export default App;
