import React, { useEffect } from 'react';
import axios from 'axios';
import Config from './config';

const PushInput = {
	getPushTargetList: async (props) => {
		let customHeader = {"Authorization":"Basic c1Q5c2NWSjFFazo3YzNvSk1rMzc0bWlPNXpRdFBvc3hMaDF1Q3FLVEJ5M1FIR3h5OURaOFdUWDBmSzA2OWhiOTdWa3NJa1RESVhR"};
		const response = await axios.get(Config.quebon_api_doman + '/user/v2/users/push-target', {headers:customHeader}, {withCredentials:true});
		if(response.status == 200){
			return response.data;
		} else {
			return [];
		}
	},

	getSearchUserList: (props) => {
		axios.post(Config.host_api + '/push/getSearchUserList', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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

	getPushUserCount: (props) => {
		axios.post(Config.host_api + '/push/getPushUserCount', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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

	addPushQueue : (props) => {
		axios.post(Config.host_api + '/push/addPushQueue', props.data, {headers:Config.httpHeader}, {withCredentials:true})
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

	}


}

export default PushInput;
