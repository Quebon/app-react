import React, { useEffect } from 'react';
import axios from 'axios';
import Config from './config';

const PushStat = {
	getHistoryList: (props) => {
		Config.log("header");
		Config.log(Config.httpHeader);
		Config.log(props);
		axios.post(Config.host_api + '/push/getPushHistoryList', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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
	getLogList: (props) => {
		axios.post(Config.host_api + '/push/getPushHistoryLogList', props.data, {headers:Config.httpHeader}, {withCredentials:true})
			.then(response => {
				Config.log(response);
				Config.log(props);
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
	getDailyList: (props) => {
		axios.post(Config.host_api + '/push/getPushDailyList', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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
	resetRetryCount: (props) => {
		axios.post(Config.host_api + '/push/resetRetryCount', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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

}

export default PushStat;
