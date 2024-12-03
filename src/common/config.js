const Config = {
	log:function(str) { 
		console.log(str); 
	},
	api_key : "Basic c1Q5c2NWSjFFazo3YzNvSk1rMzc0bWlPNXpRdFBvc3hMaDF1Q3FLVEJ5M1FIR3h5OURaOFdUWDBmSzA2OWhiOTdWa3NJa1RESVhR",
	host_api : "/api/v1",
	quebon_api_doman : "https://dev-api.quebon.tv",
	httpHeader : {
		"agent":"quebon",
		"session_id":localStorage.getItem("qb_admin_session"),
		"crossdomain":true
	},
	getFileBasePath:"/assets/upload/",

	getPushStatuCss:function(id_v) {
		if(id_v == "C") {	// 발송완료
			return "text-primary";
		}
		else if(id_v == "F") {	// 발송실패
			return "text-danger";
		}
		else if(id_v == "P") {	// 일시정지
			return "text-secondary";
		}
		else if(id_v == "R") {	// 발송예약
			return "text-success";
		}
		else if(id_v == "I") {	// 발송중
			return "text-warning";
		}
		else {
			return "";
		}
	},
	getPushStatuName:function(id_v) {
		if(id_v == "C") {	// 발송완료
			return "발송완료";
		}
		if(id_v == "S") {	// 발송완료
			return "발송완료";
		}
		if(id_v == "D") {	// 수신비동의
			return "수신비동의";
		}
		else if(id_v == "F") {	// 발송실패
			return "발송실패";
		}
		else if(id_v == "P") {	// 일시정지
			return "일시정지";
		}
		else if(id_v == "R") {	// 발송예약
			return "발송예약";
		}
		else if(id_v == "I") {	// 발송중
			return "발송중";
		}
		else {
			return "";
		}
	},
	getTargetName:function(id_v) {
		if(id_v == "A") {
			return "디바이스";
		}
		else if(id_v == "E") {
			return "엑셀";
		}
		else if(id_v == "S") {
			return "검색";
		}
		else if(id_v == "M") {
			return "알림톡";
		}
		else {
			return "";
		}
	},
	getSourcePathName:function(id_v) {
		if(id_v == "talk") {
			return "알림톡";
		}
		else if(id_v == "sms") {
			return "문자";
		}
		else if(id_v == "test") {
			return "테스트";
		}
		else {
			return "시스템";
		}
	}
}


export default Config;
