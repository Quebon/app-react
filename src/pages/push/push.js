import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from "./../../components/Header";
import {
	Container,
	Row,
	Col,
	Button,
	Table,
	Form,
	InputGroup,
	Figure,
	Tabs,
	Tab,
	Modal,
	Pagination,
} from "react-bootstrap";
import { 
	RiUploadLine ,
	RiDeleteBinLine,
	RiCloseLine,
	RiUpload2Line,
} from "react-icons/ri";
import Img1x1 from './../../assets/images/temp_appIcon.png';
import Img3x2 from './../../assets/images/img_3x2.png';
import FileUpload from '../../components/FileUpload.tsx';
import Config from '../../common/config.js';
import {Link} from "react-router-dom";
import app from '../../common/App';
import sender from '../../common/Sender';
import messageTemplate from '../../common/MessageTemplate.js';
import pushStat from '../../common/PushStat.js';
import pushInput from '../../common/PushInput.js';
import {CommonUI} from '../../common/commonUI';

import PopupPushTest from '../../components/PopupPushTest.tsx';
import PopupPushExcelUpload from '../../components/PopupPushExcelUpload.tsx';
import PopupPushPreview from '../../components/PopupPushPreview.tsx';
import PopupTemplateList from '../../components/PopupTemplageList.tsx';
import PopupSearchPushTarget from '../../components/PopupSearchPushTarget.tsx';

const Push = () => {
	const {seq} = useParams();
	const [today, setToday] = useState("");
	const [baseNode, setBaseNode] = useState({object:null , name:""});	// 푸시메세지, 이미지 메세지 선택 정보

	const uplodeFileRef = useRef();

	const [showPushTest, setShowPushTest] = useState(false);	// 테스트발송 팝업
	const [showExcel, setShowExcel] = useState(false);			// 엑셀 업로드 팝업
	const [previewModal, setPreviewModal] = useState(false);	// 미리보기
	const [showTemplateList, setShowTemplateList] = useState(false);	// 템플릿 불러오기

	const [showSearchPushTarget, setShowSearchPushTarget] = useState(false);	// 발송 대상 선택 정보

	const [pushTestData, setPushTestData] = useState({sendInfo:{}});	// 테스트발송 팝업에 전달할 푸시 등록 정보


	const [targetType1, setTargetType1] = useState("A");	// 푸시메세지의 대상 종류
	const [targetType2, setTargetType2] = useState("A");	// 이미지메세지의 대상 종류
	const [targetUserCount1, setTargetUserCount1] = useState(0);		// 푸시메세지 대상수
	const [targetUserCount2, setTargetUserCount2] = useState(0);		// 이미지메세지 대상수
	const [userList, setUserList] = useState([]);		// 엑셀 업로드 또는 대상 리스트를 통해 선택된 사용자 정보 리스트.


	const [openSearchModal, setOpenSearchModal] = useState(false);

	const [checkContents, setCheckContents] = useState(true);

	const [contentLen, setContentLen] = useState(0);
	const [btnTemplateSaveFlag, setBtnTemplateSaveFlag] = useState("disabled");	// 템플릿에 저장 버튼 활성화/비활서오하
	const [selectedTemplateInfo, setSelectedTemplateInfo] = useState(null);

	const [messageType1, setMessageType1] = useState("info");
	const [messageType2, setMessageType2] = useState("info");

	const [sendType1, setSendType1] = useState("D");
	const [sendType2, setSendType2] = useState("D");

	const [limitNight1, setLimitNight1] = useState("Y");
	const [limitNight2, setLimitNight2] = useState("Y");


	const [appList, setAppList] = useState([]);
	const [senderList, setSenderList] = useState([]);


	useEffect(() => {
		if(seq > 0) {
			//getInfo();
		}
		else {
			const today = new Date();
			const date_v = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			setToday(date_v);
			//setRegInfo(date_v);
		}
		getAppList();
		getSenderList();
	}, []);

	const getAppList = () => {
		const data = {};
		app.getList({data:data, callback:function(json) {
			if(json.list) {
				setAppList(json.list);
			}
		}});
	}

	const getSenderList = () => {
		const data = {};
		sender.getList({data:data, callback:function(json) {
			if(json.list) {
				setSenderList(json.list);
			}
		}});
	}

	const respTest = (data) => {
		Config.log(data);
	}
	const respExcel = (data) => {
		Config.log("respExcel==>")
		setUserList(data.list);
		setTargetUserCount1(data.count);
		Config.log(data);
	}

	let respSearch = function(data) {
		setUserList(data.list);
		setTargetUserCount1(data.count);
		Config.log(data);
	}

	const eventHandle = (ev) => {
		let evo = ev.currentTarget;
		let act_v = evo.getAttribute("data-act");

		let base = CommonUI.findParentNode(evo, "form", null);
		if(base) {
			let id_v = base.getAttribute("data-id");
			setBaseNode({object:base, "name":id_v});
		}
		else {
			setBaseNode({object:null, name:""});
		}
		if(base)
			console.log("form id=" + base.id +  ", event=" + ev.type + ", act = " + act_v);
		else 
			console.log("form id=null" +  ", event=" + ev.type + ", act = " + act_v);

		if(ev.type == "click") {
			if(act_v == "openTemplage") {	// 템플릿 불러오기. 
				setShowTemplateList(true);				
			}
			else if(act_v == "reset") {
				clearForm(base);
			}
			else if(act_v == "add_excel") {	// 엑셀로 대상 추가하기
				if(base.id == "frmPushMsg") {
					setTargetType1("E");
				}
				else {
					setTargetType2("E");
				}
				setShowExcel(true);
			}
			else if(act_v == "target_search") {		// 대상자 불러오기
				if(base.id == "frmPushMsg") {
					setTargetType1("S");
				}
				else {
					setTargetType2("S");
				}
				setShowSearchPushTarget(true);
			}
			else if(act_v == "pushPreview") {	// 미리보기
				if(validation_preview(base)) {
					const formData = new FormData(base);
					const data = Object.fromEntries(formData.entries());
					Config.log(data);
					pushTestData.sendInfo = data;
					setPreviewModal(true);
				}
				else {
					alert("모든 정보를 규칙에 맞게 입력해야 발송 가능합니다.");
				}
			}
			else if(act_v == "saveTemplage") {	// 미리보기
				if(validation_preview(base)) {
					const formData = new FormData(base);
					const data = Object.fromEntries(formData.entries());
					Config.log(data);
					messageTemplate.addInfo({data:data, callback:function(json) {
						if(json.seq > 0) {
							alert("저장했습니다.");
							json.data["contents"] = json.data.content;
							setSelectedTemplateInfo(json.data);
							setBtnTemplateSaveFlag("disabled");
						}
						else {
							alert("저장에 실패했습니다.\n다시 시도해 주세요.");
						}
					}});
				}
				else {
					alert("모든 정보를 규칙에 맞게 입력해야 발송 가능합니다.");
				}
			}
			else if(act_v == "attach_image_push") {
				let fo = document.querySelector("#image_push");
				if(fo) {
					fo.click();
				}
			}
			else if(act_v == "remove_image_push") {
				base.image_push.value = "";
				let fo = document.querySelector("figure[data-id='upfile_1']");
				if(fo) {
					fo.parentNode.removeChild(fo);
				}
			}
			else if(act_v == "send_test") {	// 테스트 전송하기
				if(validation_req(base)) {
					if (check_reserve_time(base.reserve_date2.value) == false) {
						return;
					}
					const formData = new FormData(base);
					formData.append("emtitle", formData.get("title"));
					if(base.image_push) {
						let files = Array.from(base.image_push.files);
						if (files) {
							const formData = new FormData();
							files.map((file) => {
								formData.append("files", file);
							});
						}
					}
					let time_v = formData.get("reserve_date2");
					if(time_v != "") {
						formData.set("reserve_date", formData.get("reserve_date") + " " + time_v);
					}


					const data = Object.fromEntries(formData.entries());
					//data["emtitle"] = data["title"];
					Config.log("formdata is=>");
					Config.log(formData);
					Config.log(data);
					pushTestData.sendInfo = formData;
					setShowPushTest(true);
				}
				else {
					alert("모든 정보를 규칙에 맞게 입력해야 발송 가능합니다.");
				}

			}
			else if(act_v == "send_save") {	// 푸시 전송하기 저장.
				if(validation(base)) {
					if (check_reserve_time(base.reserve_date2.value) == false) {
						return;
					}
					const formData = new FormData(base);

					if(base.image_push) {
						let files = Array.from(base.image_push.files);
						if (files) {
							const formData = new FormData();
							files.map((file) => {
								formData.append("files", file);
							});
						}
					}

					formData.append("emtitle", formData.get("title"));
					formData.append("userList", JSON.stringify(userList));
					if(formData.get("message_type") == "info") {
						formData.append("limit_night", "N");
					}
					else if(formData.get("message_type") == "ad") {
						formData.append("limit_night", "Y");
					}
					const data = Object.fromEntries(formData.entries());
					//data["userList"] = userList;
					//data["emtitle"] = data["title"];
					//if(data["message_type"] == "info") {
					//	data["limit_night"] = "N";
					//}
					Config.log(data);
					Config.log("send");
					pushInput.addPushQueue({
						data:formData,
						callback:function(json) {
							if(json.seq > 0) {
								if(formData.get("send_type") == "R") {
									alert("발송 예약이 성공하였습니다.");
								}
								else {
									alert("발송이 성공하였습니다.");
								}
								clearForm(base);
							}
							else {
								if(formData.get("send_type") == "R") {
									alert("발송 예약이 실패하였습니다.\n다시 시도해주세요.");
								}
								else {
									alert("발송이 실패하였습니다.\n다시 시도해주세요.");
								}
							}
						}
					});
				}
				else {
					alert("모든 정보를 규칙에 맞게 입력해야 발송 가능합니다.");
				}
			}
			else if(act_v == "btn_clear") {
				let id_v = evo.getAttribute("data-id");
				Config.log("id_v=" + id_v);
				if(id_v == "1") {
					base.link_name_1.value = "";
					base.link_type_1.value = "";
					base.link_url_mobile_1.value = "";
					base.link_url_pc_1.value = "";
				}
				else if(id_v == "2") {
					base.link_name_2.value = "";
					base.link_type_2.value = "";
					base.link_url_mobile_2.value = "";
					base.link_url_pc_2.value = "";
				}
				else if(id_v == "3") {
					base.link_name_3.value = "";
					base.link_type_3.value = "";
					base.link_url_mobile_3.value = "";
					base.link_url_pc_3.value = "";
				}
				else if(id_v == "4") {
					base.link_name_4.value = "";
					base.link_type_4.value = "";
					base.link_url_mobile_4.value = "";
					base.link_url_pc_4.value = "";
				}
				else if(id_v == "5") {
					base.link_name_5.value = "";
					base.link_type_5.value = "";
					base.link_url_mobile_5.value = "";
					base.link_url_pc_5.value = "";
				}
			}
			ev.preventDefault();
		}
		else if(ev.type == "change") {
			if(act_v == "target_device") {	// 푸시 발송대상 "대상 선택" 정보 변경시
				if(base.id == "frmPushMsg") {
					setTargetType1("A");
				}
				else {
					setTargetType2("A");
				}
				let senddata = {};
				if(evo.selectedIndex == 0) {
					if(base.id == "frmPushMsg") {
						setTargetUserCount1(0);
					}
					else {
						setTargetUserCount2(0);
					}
				return;
				}
				senddata["target_device"] = evo.options[evo.selectedIndex].value;
				pushInput.getPushUserCount({
					data:senddata,
					callback:function(json) {
						Config.log("base id=" + base.id);
						if(base.id == "frmPushMsg") {
							setTargetUserCount1(json.count);
						}
						else {
							setTargetUserCount2(json.count);
						}
					}
				});
			}
			else if(act_v == "target_type") {	// 발송대상 (디바이스별, 엑셀, 조건검색) 선택시.
				if(base.id == "frmPushMsg") {
					if(ev.target.value != "A") {
						base.target_device.selectedIndex = 0;
						base.target_device.setAttribute("disabled", true);
					}
					else {
						base.target_device.removeAttribute("disabled");
					}
					setTargetUserCount1(0);
					setTargetType1(ev.target.value );
				}
				else {
					if(ev.target.value != "A") {
						base.target_device.selectedIndex = 0;
						base.target_device.setAttribute("disabled", true);
					}
					else {
						base.target_device.removeAttribute("disabled");
					}
					setTargetUserCount2(0);
					setTargetType2(ev.target.value);
				}
			}
			else if(act_v == "message_type") {	// 앱 구분(일반메시지, 광고메시지)
				//ev.persist();
				console.log("message_type=" + ev.target.value);
				if(base.id == "frmPushMsg") {
					setMessageType1(ev.target.value );
				}
				else {
					setMessageType2(ev.target.value);
				}
			}
			else if(act_v == "form1_title") {
				Config.log("selected data=>");
				Config.log(selectedTemplateInfo);
				if(selectedTemplateInfo != null) {
					if(selectedTemplateInfo.title != base.title.value || selectedTemplateInfo.contents != base.content.value) {
						setBtnTemplateSaveFlag("");
					}
					else {
						setBtnTemplateSaveFlag("disabled");
					}
				}
				else {
					if(base.title.value != "" && base.content.value != "") {
						setBtnTemplateSaveFlag("");
					}
					else {
						setBtnTemplateSaveFlag("disabled");
					}
				}
			}
			else if(act_v == "form1_content") {
				if(base.check_contents.checked) {	
					setContentLen(base.content.value.length);
				}
				else {
					setContentLen(0);
				}
				if(selectedTemplateInfo != null) {
					if(selectedTemplateInfo.title != base.title.value || selectedTemplateInfo.contents != base.content.value) {
						setBtnTemplateSaveFlag("");
					}
					else {
						setBtnTemplateSaveFlag("disabled");
					}
				}
				else {
					if(base.title.value != "" && base.content.value != "") {
						setBtnTemplateSaveFlag("");
					}
					else {
						setBtnTemplateSaveFlag("disabled");
					}
				}
			}
			else if(act_v == "send_type") {		// 예약발송/ 즉시발송.
				//ev.persist();
				console.log(ev.target.value);
				if(base.id == "frmPushMsg") {
					setSendType1(ev.target.value );
				}
				else {
					setSendType2(ev.target.value);
				}
				if(ev.target.value == "D") {
					base.reserve_date.value = "";
					base.reserve_date2.value = "";
				}
			}
			else if(act_v == "change_researve_dt") {
				if(base.id == "frmPushMsg") {
					setSendType1("R");
					base.querySelector("#send_type_2").checked = true;
				}
				else {
					setSendType2("R");
					base.querySelector("#send_type_12").checked = true;
				}
			}
			else if(act_v == "limit_night") {	// 야간 광고 제한 정보 변경.
				console.log(ev.target.value);
				if(base.id == "frmPushMsg") {
					setLimitNight1(ev.target.value );
				}
				else {
					setLimitNight2(ev.target.value);
				}
			}
			else if(act_v == "check_contents") {
				//ev.persist();
				console.log(ev.target.value);
				if(base.id == "frmPushMsg") {
					setCheckContents(!checkContents );
				}
				if(base.check_contents.checked) {	
					setContentLen(base.content.value.length);
				}
				else {
					setContentLen(0);
				}
			}
			return true;
		}
		ev.preventDefault();
	};	

	function clearForm(base) {
		base.reset();
		if(base.id == "frmPushMsg") {
			base.message_type_1.checked = true;
			base.send_type_1.checked = true;
			base.title.value = "";
			base.content.value = "";
			setTargetType1("A");
			setSendType1("D");
			setMessageType1("info");
			setTargetUserCount1(0);
			base.image_push.value = "";
			let fo = document.querySelector("figure[data-id='upfile_1']");
			if(fo) {
				fo.parentNode.removeChild(fo);
			}
		}
		else {
			base.message_type_11.checked = true;
			base.send_type_11.checked = true;
			setTargetType2("A");
			setSendType2("D");
			setMessageType2("info");
			setTargetUserCount2(0);
		}
	}

	function getCurrentTime() {
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, '0'); // 시간
		const minutes = String(now.getMinutes()).padStart(2, '0'); // 분
		//const seconds = String(now.getSeconds()).padStart(2, '0'); // 초
	
		return `${hours}:${minutes}`;
	}

	function check_reserve_time(hour_v) {
		let base = baseNode.object;
		let rtn = true;
		if(base.message_type.value == "info") {
			return rtn;
		}
		if(hour_v != null && hour_v != "") {

		}
		else {
			hour_v = getCurrentTime();
		}
		if(hour_v >= "20:00" || hour_v <= "08:00") {
			rtn = false;
		}
		if(rtn == false) {
			alert('야간시간(20:00~08:00)에는 광고 발송이 제한됩니다.');
		}
		return rtn;
	}

	const validation_preview = (frm) => {
		if(frm == null) return false;

		if(!/^.{1,50}$/.test(frm.title.value))	return false;

		if(frm.id == "frmWelcomeMsg") {
			//if(!/^.{1,50}$/.test(frm.emtitle.value))	return false;
			if(!/^.{1,200}$/.test(frm.webview_url.value))	return false;
		}
		else if(frm.id == "frmPushMsg") {
			if(sendType1 == "R") {
				if(!/^.{1,10}$/.test(frm.reserve_date.value))	return false;
			}
		}

		return true;
    }


	const validation_req = (frm) => {
		if(frm == null) return false;

		if(!/^.{1,100}$/.test(frm.push_label.value))	return false;
		if(!/^.{1,50}$/.test(frm.title.value))	return false;

		if(frm.id == "frmWelcomeMsg") {
			//if(!/^.{1,50}$/.test(frm.emtitle.value))	return false;
			if(!/^.{1,200}$/.test(frm.webview_url.value))	return false;
		}
		else if(frm.id == "frmPushMsg") {
			if(sendType1 == "R") {
				if(!/^.{1,10}$/.test(frm.reserve_date.value))	return false;
			}
		}

		return true;
    }

	const validation = (frm) => {
		if(frm == null) return false;

		if(!/^.{1,100}$/.test(frm.push_label.value))	return false;
		if(!/^.{1,50}$/.test(frm.title.value))	return false;
		console.log(frm.target_type.value);
		if(frm.target_type.value == "A") {
			if(frm.target_device.selectedIndex == 0) return false;
		}
		if(frm.id == "frmWelcomeMsg") {
			//if(!/^.{1,50}$/.test(frm.emtitle.value))	return false;
			if(!/^.{1,200}$/.test(frm.webview_url.value))	return false;
			if(sendType2 == "R") {
				if(!/^.{1,10}$/.test(frm.reserve_date.value))	return false;
			}
			if(targetUserCount2 <= 0) {
				return false;
			}
		}
		else if(frm.id == "frmPushMsg") {
			if(sendType1 == "R") {
				if(!/^.{1,10}$/.test(frm.reserve_date.value))	return false;
			}
			if(targetUserCount1 <= 0) {
				return false;
			}
		}

		return true;
    }

	let respTemplate = function(json) {
		let base = baseNode.object;	//.querySelector("form");
		base.title.value = json.title;
		base.content.value = json.contents;
		setSelectedTemplateInfo(json);
		setBtnTemplateSaveFlag("disabled");
	}


	return(
		<div className="wrapper">
			<Container as="header">
				<Header />	
			</Container>
			<Container as="main" fluid>
				<Tabs defaultActiveKey="pushMsg" id="" className="custom__tab">

					<Tab eventKey="pushMsg" title="푸시 메시지">
						<form name="frmPushMsg" id="frmPushMsg" data-id="push">
						<input type="Hidden" name="source_path" id="source_path" value={"system"}/>
						<div className="main__header">
							<h2 className="main__header-title">푸시 메시지</h2>	
						</div>
						<div className="table__wrap mt-4">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>앱 선택</th>
										<td className="text-start">
											<Form.Select aria-label="" name="app_id" id="app_id">
												{
													appList.map((item, index) =>
														<option key={item.seq} selected={item.app_id=='com.quebon.tv'?true:false} value={item.app_id}>{item.app_name}</option>
													)
												}
											</Form.Select>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* 발송정보 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">발송 정보</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>등록일</th>
										<td className="text-start">{today}</td>
									</tr>
									<tr>
										<th scope='row'>발송자 선택</th>
										<td className="text-start">
											<Form.Select aria-label="" name="sender_seq" id="sender_seq">
												{
													senderList.map((item, index) =>
														<option key={item.seq} value={item.seq}>{item.sender_name}({item.sender_id})</option>
													)
												}
											</Form.Select>
										</td>
									</tr>
									<tr>
										<th scope='row'>앱 구분</th>
										<td className="text-start">
											<div key="inline-radio">
												<Form.Check
													onChange={eventHandle}
													data-act={"message_type"}
													inline
													label="일반 메시지"
													name="message_type"
													type="radio"
													id="message_type_1"
													value={"info"}
													checked={messageType1=="info"}
												/>
												<Form.Check
													onChange={eventHandle}
													data-act={"message_type"}
													inline
													label="광고 메시지"
													name="message_type"
													type="radio"
													value={"ad"}
													id="message_type_2"
													checked={messageType1=="ad"}
												/>
											</div>
											<small className="text-secondary-emphasis">※ 광고메시지는 푸시 메시지명, 제목에 “(광고)” 표시, 광고수신 동의자 발송, 야간시간(20:00~08:00) 전송 제한</small>
										</td>
									</tr>
									<tr>
										<th scope='row'>푸시 메시지명</th>
										<td className="text-start d-flex align-items-center">
										<strong className={"me-2" + (messageType1 == "info" ? " d-none":"")}>(광고)</strong>
										<Form.Control type="text" placeholder="메시지명을 입력하세요. 100자 제한" maxLength={100} name="push_label" id="push_label" />
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //발송정보 */}
						{/* 대상 선택 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">대상 선택</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>발송 대상</th>
										<td className="text-start">
											<div id="target_number" className="mb-2">총 발송대상 : {targetUserCount1.toLocaleString()}명</div>
											<Row key="inline-radio" xs="auto">
												<Col className="d-flex align-items-center">
													<Form.Check
														inline
														name="target_type"
														type="radio"
														id="target_type_1"
														value={"A"}
														onChange={eventHandle}
														data-act="target_type"
														checked={targetType1 == "A"}
													/>
													<Form.Select aria-label="" className="d-inline-block" name="target_device" id="target_device" data-act="target_device" onChange={eventHandle}>
														<option value={""}>대상 선택</option>
														<option value={"all"}>전체 앱 사용자</option>
														<option value={"aos_all"}>Android OS 전체</option>
														<option value={"aos_n"}>Android OS 비로그인</option>
														<option value={"aos_y"}>Android OS 로그인</option>
														<option value={"ios_all"}>IOS 전체</option>
														<option value={"ios_n"}>IOS 비로그인</option>
														<option value={"ios_y"}>IOS 로그인</option>
													</Form.Select>
												</Col>
												<Col>
													<Form.Check
														inline
														label="엑셀 파일 업로드"
														name="target_type"
														type="radio"
														value={"E"}
														onChange={eventHandle}
														data-act="target_type"
														id="target_type_2"
														checked={targetType1 == "E"}
													/>
													<Button variant="outline-dark" size="sm" data-act="add_excel" onClick={eventHandle}><RiUploadLine /> 파일 첨부</Button>
												</Col>
												<Col className="">
													<Form.Check
														inline
														label="조건 검색"
														name="target_type"
														value={"S"}
														type="radio"
														id="target_type_3"
														onChange={eventHandle}
														data-act="target_type"
														checked={targetType1 == "S"}
													/>
													<Button variant="outline-dark" size="sm" data-act="target_search" onClick={eventHandle}>대상자 불러오기</Button>
												</Col>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //대상 선택 */}
						{/* 메시지 입력 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">메시지 입력</h3>
							<div className="sub__header-button">
								<Button variant="dark" className={btnTemplateSaveFlag} size="sm" data-act="saveTemplage" onClick={eventHandle}>템플릿에 저장</Button>
								<Button variant="dark ms-2" size="sm" data-act="pushPreview" onClick={eventHandle}>미리보기</Button>
							</div>
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr className="">
										<th scope='row'>템플릿</th>
										<td className="text-start">
											<div>
												<Button variant="outline-dark ms-2" size="sm" data-act="openTemplage" onClick={eventHandle}>불러오기</Button>
											</div>
										</td>
									</tr>
									<tr>
										<th scope='row'>제목</th>
										<td className="text-start d-flex align-items-center">
											<strong className={"me-2" + (messageType1 == "info" ? " d-none":"")}>(광고)</strong>
											<Form.Control type="text" name="title" id="title" data-act="form1_title" onChange={eventHandle} placeholder="최대 50자 입력 가능합니다." maxLength={50} defaultValue={ (selectedTemplateInfo != null) ? selectedTemplateInfo.title : ""} />
										</td>
									</tr>
									<tr>
										<th scope='row'>본문</th>
										<td className="text-start">
											<Form.Control as="textarea" rows={5} name="content" id="content" data-act="form1_content" onChange={eventHandle} defaultValue={ (selectedTemplateInfo != null) ? selectedTemplateInfo.contents : ""} placeholder="본문 내용을 입력하세요. &#10;광고 메시지 주의사항 &#10;1. 업체명 혹은 서비스명을 표기 또는 기본 이미지의 회사로고 유지 &#10;2.제목(본문) 앞 '(광고)'를 반드시 표기 &#10;3.'(수신거부:메뉴>설정)' 필수 표기" />
											<Form.Group className="mt-2">
												<Form.Check
													label="체크를 해제하면 푸시메시지에서 본문은 전송되지 않습니다. 본문  유효성 검사를 하지 않습니다. "
													name="check_contents"
													type="checkbox"
													id="check_contents"
													value={"Y"}
													maxLength={1500}
													onChange={eventHandle}
													data-act="check_contents"
													checked={checkContents == true}
												/>
											</Form.Group>
											<div className="text-end">{contentLen.toLocaleString()}자/ 1500자 </div>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //메시지 입력 */}
						{/* 메시지 첨부 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">메시지 첨부</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr className="">
										<th scope='row'>본문 이미지</th>
										<td className="text-start">
											<Row className="fileup__ui">
												<Col className="col-auto">
													<FileUpload ref={uplodeFileRef} imageWidth={160} imageHeight={106} maxFileSize={1} accept='image/png, image/jpeg, image/jpg' inputName="image_push"></FileUpload>
												</Col>
												<Col className="col-auto">
													<Button variant="outline-dark" size="sm" data-act="attach_image_push" onClick={eventHandle}>
														<RiUploadLine /> 파일 첨부
													</Button>
													<Button variant="outline-dark ms-2" size="sm" data-act="remove_image_push" onClick={eventHandle}>
														<RiDeleteBinLine /> 삭제
													</Button>
												</Col>
												<Col className="col-auto">
													<small className="text-secondary-emphasis">※ 3:2, 1024px X 512px, png/jpg, 1MB 이하</small>
												</Col>
											</Row>
										</td>
									</tr>
									<tr>
										<th scope='row'>링크</th>
										<td className="text-start">
											<Row>
												<Col lg={1} className="align-content-center">첫번째 버튼</Col>
												<Col>
													<Row>
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_name_1" id="link_name_1" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_mobile_1" id="link_url_mobile_1" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_type_1" id="link_type_1" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_pc_1" id="link_url_pc_1" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
												</Col>
												<Col lg={1}><Button variant="outline-dark" size="sm" data-id="1" data-act="btn_clear" onClick={eventHandle}>지우기</Button></Col>
											</Row>
											<Row className="mt-3">
												<Col lg={1} className="align-content-center">두번째 버튼</Col>
												<Col>
													<Row>
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_name_2" id="link_name_2" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_mobile_2" id="link_url_mobile_2" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_type_2" id="link_type_2" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_pc_2" id="link_url_pc_2" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
												</Col>
												<Col lg={1}><Button variant="outline-dark" size="sm" data-id="2" data-act="btn_clear" onClick={eventHandle}>지우기</Button></Col>
											</Row>
											<Row className="mt-3">
												<Col lg={1} className="align-content-center">세번째 버튼</Col>
												<Col>
													<Row>
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_name_3" id="link_name_3" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_mobile_3" id="link_url_mobile_3" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_type_3" id="link_type_3" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_pc_3" id="link_url_pc_3" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
												</Col>
												<Col lg={1}><Button variant="outline-dark" size="sm" data-id="3" data-act="btn_clear" onClick={eventHandle}>지우기</Button></Col>
											</Row>
											<Row className="mt-3">
												<Col lg={1} className="align-content-center">네번째 버튼</Col>
												<Col>
													<Row>
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_name_4" id="link_name_4" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_mobile_4" id="link_url_mobile_4" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_type_4" id="link_type_4" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_pc_4" id="link_url_pc_4" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
												</Col>
												<Col lg={1}><Button variant="outline-dark" size="sm" data-id="4" data-act="btn_clear" onClick={eventHandle}>지우기</Button></Col>
											</Row>
											<Row className="mt-3">
												<Col lg={1} className="align-content-center">다섯번째 버튼</Col>
												<Col>
													<Row>
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_name_5" id="link_name_5" placeholder='버튼 이름 입력, 한글 10자 제한' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_mobile_5" id="link_url_mobile_5" placeholder='Mobile URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
													<Row className="mt-2">
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_type_5" id="link_type_5" placeholder='버튼 형태 지정값, 웹링크(WL)만 사용' />
														</Form.Group>	
														<Form.Group as={Col} lg={6}>
															<Form.Control size="sm" name="link_url_pc_5" id="link_url_pc_5" placeholder='PC URL을 입력하세요. 영문, 특수문자 200자 제한' />
														</Form.Group>	
													</Row>
												</Col>
												<Col lg={1}><Button variant="outline-dark" size="sm" data-id="5" data-act="btn_clear" onClick={eventHandle}>지우기</Button></Col>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
							
						</div>
						{/* //메시지 첨부 */}
						{/* 발송 설정 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">발송 설정</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>발송시간</th>
										<td className="text-start">
											<Row className="align-items-center" xs="auto">
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="즉시 발송"
														name="send_type"
														type="radio"
														id="send_type_1"
														value={"D"}
														data-act="send_type"
														onChange={eventHandle}
														checked={sendType1 == "D"}
													/>
												</Form.Group>
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="예약 발송"
														name="send_type"
														type="radio"
														value={"R"}
														data-act="send_type"
														onChange={eventHandle}
														id="send_type_2"
														checked={sendType1 == "R"}
													/>
													<Form.Control type="date" name="reserve_date" id="reserve_date" className="w-auto" data-act="change_researve_dt" onChange={eventHandle}></Form.Control>
													<Form.Control type="time" name="reserve_date2" id="reserve_date2" className="w-auto" data-act="change_researve_dt" onChange={eventHandle}></Form.Control>
												</Form.Group>
											</Row>
										</td>
									</tr>
									<tr className={(messageType1 == "info")?"hide":""}>
										<th scope='row'>야간광고 전송제한</th>
										<td className="text-start">
											야간 광고 전송제한  20:00 ~ 08:00
											<Row className="align-items-center hide" xs="auto">
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="야간 광고 전송제한  20:00 ~ 08:00   "
														name="limit_night_1"
														type="radio"
														value={"Y"}
														id="limit_night_1"
														data-act="limit_night"
														onChange={eventHandle}
														checked={limitNight1 == "Y"}
													/>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Check
														inline
														value={"N"}
														label="제한 시간 해제"
														name="limit_night_1"
														type="radio"
														id="limit_night_2"
														data-act="limit_night"
														onChange={eventHandle}
														checked={limitNight1 == "N"}
													/>
												</Form.Group>
											</Row>
										</td>
									</tr>
									<tr className="hide">
										<th scope='row'>분할 발송</th>
										<td className="text-start">
											<Row>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="" name="send_part_min" id="send_part_min">
														<option value={"0"}>지연 시간 선택</option>
														<option value={"1"}>1분</option>
														<option value={"10"}>10분</option>
														<option value={"20"}>20분</option>
														<option value={"30"}>30분</option>
													</Form.Select>
												</Form.Group>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="" name="send_part_size" id="send_part_size">
														<option value={"0"}>분할 단위 선택</option>
														<option value={"100"}>100건</option>
														<option value={"1000"}>1000건</option>
														<option value={"10000"}>10000건</option>
													</Form.Select>
												</Form.Group>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //발송 설정 */}
						{/* 버튼 영역 */}
						<Row className="table__button">
							<Col xs="auto">
								<Button variant="secondary" data-act="reset" onClick={eventHandle}>초기화</Button>
							</Col>
							<Col className="text-end">
								<Button variant="secondary" data-act="send_test" onClick={eventHandle}>테스트 발송</Button>
								<Button variant="primary ms-2" data-act="send_save" onClick={eventHandle}>푸시 발송</Button>
							</Col>
						</Row>
						{/* //버튼 영역 */}
						</form>
					</Tab>



					<Tab eventKey="welcomeMsg" title="이미지 메시지">
						<form name="frmWelcomeMsg" id="frmWelcomeMsg" data-id="welcome">
							<input type="hidden" name="source_path" id="source_path" value={"system"}/>
							<input type="Hidden" name="target_type" id="target_type" value={targetType2}/>
						<div className="main__header">
							<h2 className="main__header-title">이미지 메시지</h2>	
						</div>
						<div className="table__wrap mt-4">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>앱 선택</th>
										<td className="text-start">
											<Form.Select aria-label="" name="app_id" id="app_id">
												{
													appList.map((item, index) =>
														<option key={item.seq} selected={item.app_id=='com.quebon.tv'?true:false} value={item.app_id}>{item.app_name}</option>
													)
												}
											</Form.Select>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* 발송정보 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">발송 정보</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>등록일</th>
										<td className="text-start">{today}</td>
									</tr>
									<tr>
										<th scope='row'>발송자 선택</th>
										<td className="text-start">
											<Form.Select aria-label="" name="sender_seq" id="sender_seq">
												{
													senderList.map((item, index) =>
														<option key={item.seq} value={item.seq}>{item.sender_name}({item.sender_id})</option>
													)
												}
											</Form.Select>
										</td>
									</tr>
									<tr>
										<th scope='row'>앱 구분</th>
										<td className="text-start">
											<div key="inline-radio">
												<Form.Check
													inline
													label="일반 메시지"
													name="message_type"
													type="radio"
													id="message_type_11"
													value={"info"}
													data-act="message_type"
													onChange={eventHandle}
													checked={messageType2 == "info"}
												/>
												<Form.Check
													inline
													label="광고 메시지"
													name="message_type"
													type="radio"
													value={"ad"}
													data-act="message_type"
													onChange={eventHandle}
													id="message_type_12"
													checked={messageType2 == "ad"}
												/>
											</div>
											<small className="text-secondary-emphasis">※ 광고메시지는 푸시 메시지명, 제목에 “(광고)” 표시, 광고수신 동의자 발송, 야간시간(20:00~08:00) 전송 제한</small>
										</td>
									</tr>
									<tr>
										<th scope='row'>푸시 메시지명</th>
										<td className="text-start d-flex align-items-center">
											<strong className={"me-2" + (messageType2 == "info" ? " d-none":"")}>(광고)</strong>
											<Form.Control type="text" placeholder="메시지명을 입력하세요. 100자 제한" maxLength={100} name="push_label" id="push_label" />
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //발송정보 */}
						{/* 대상 선택 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">대상 선택</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>앱 구분</th>
										<td className="text-start">
											<div id="target_number" className="mb-2">총 발송대상 : {targetUserCount2.toLocaleString()}명</div>
											<Form.Select aria-label="" name="target_device" id="target_device" className="d-inline-block" data-act="target_device" onChange={eventHandle}>
												<option value={""}>대상 선택</option>
												<option value={"all"}>전체 앱 사용자</option>
												<option value={"aos_all"}>Android OS 전체</option>
												<option value={"aos_n"}>Android OS 비로그인</option>
												<option value={"aos_y"}>Android OS 로그인</option>
												<option value={"ios_all"}>IOS 전체</option>
												<option value={"ios_n"}>IOS 비로그인</option>
												<option value={"ios_y"}>IOS 로그인</option>
											</Form.Select>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //대상 선택 */}
						{/* 웰컴 메시지 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">메시지</h3>
							<div className="sub__header-button">
								<Button variant="dark ms-2" size="sm" data-act="pushPreview" onClick={eventHandle}>미리보기</Button>
							</div>
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>제목</th>
										<td className="text-start d-flex align-items-center">
											<strong className={"me-2" + (messageType2 == "info" ? " d-none":"")}>(광고)</strong>
											<Form.Control type="text" placeholder="최대 50자 입력 가능합니다." name="title" id="title" />
										</td>
									</tr>
									{/*<tr className="hide">
										<th scope='row'>강조 제목</th>
										<td className="text-start">
											<Form.Control type="text" placeholder="최대 50자 입력 가능합니다." name="emtitle" id="emtitle"/>
										</td>
									</tr>*/}
									<tr>
										<th scope='row'>웹뷰 링크</th>
										<td className="text-start">
											<Row className="align-items-center">
												<Form.Group as={Col} lg={7}>
													<Form.Control placeholder="URL을 입력하세요. 영문, 특수문자 200자 제한" maxLength={200} name="webview_url" id="webview_url" />
												</Form.Group>
												<Form.Group as={Col}>
													<Button variant="outline-dark" size="sm">지우기</Button>
												</Form.Group>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //웰컴 메시지 */}
						{/* 발송 설정 */}
						<div className="sub__header mt-3">
							<h3 className="sub__header-title">발송 설정</h3>	
						</div>
						<div className="table__wrap mt-2">
							<Table bordered responsive className="table__view">
								<tbody>
									<tr>
										<th scope='row'>발송시간</th>
										<td className="text-start">
											<Row className="align-items-center" xs="auto">
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="즉시 발송"
														name="send_type"
														type="radio"
														id="send_type_11"
														value={"D"}
														onChange={eventHandle}
														data-act="send_type"
														checked={sendType2 == "D"}
													/>
												</Form.Group>
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="예약 발송"
														name="send_type"
														type="radio"
														value={"R"}
														onChange={eventHandle}
														id="send_type_12"
														data-act="send_type"
														checked={sendType2 == "R"}
													/>
													<Form.Control type="date" name="reserve_date" id="reserve_date" className="w-auto" data-act="change_researve_dt" onChange={eventHandle}></Form.Control>
													<Form.Control type="time" name="reserve_date2" id="reserve_date2" className="w-auto" data-act="change_researve_dt" onChange={eventHandle}></Form.Control>
												</Form.Group>
											</Row>
										</td>
									</tr>
									<tr className={(messageType2 == "info")?"hide":""}>
										<th scope='row'>야간광고 전송제한</th>
										<td className="text-start">
											야간 광고 전송제한  20:00 ~ 08:00
											<Row className="align-items-center hide" xs="auto">
												<Form.Group as={Col} className="d-inline-flex align-items-center">
													<Form.Check
														inline
														label="야간 광고 전송제한  20:00 ~ 08:00   "
														name="limit_night_2"
														type="radio"
														value={"Y"}
														onChange={eventHandle}
														data-act="limit_night"
														id="limit_night_11"

														checked={limitNight2 == "Y"}
													/>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Check
														inline
														value={"N"}
														label="제한 시간 해제"
														name="limit_night_2"
														type="radio"
														id="limit_night_12"
														onChange={eventHandle}
														data-act="limit_night"
														checked={limitNight2 == "N"}
													/>
												</Form.Group>
											</Row>
										</td>
									</tr>
									<tr className="hide">
										<th scope='row'>분할 발송</th>
										<td className="text-start">
											<Row>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="" name="send_part_min" id="send_part_min">
														<option value="0">지연 시간 선택</option>
														<option value="1">1분</option>
														<option value="10">10분</option>
														<option value="20">20분</option>
														<option value="30">30분</option>
													</Form.Select>
												</Form.Group>
												<Form.Group as={Col} lg={6}>
													<Form.Select aria-label="" name="send_part_size" id="send_part_size">
														<option value="0">분할 단위 선택</option>
														<option value="100">100건</option>
														<option value="1000">1000건</option>
														<option value="10000">10000건</option>
													</Form.Select>
												</Form.Group>
											</Row>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
						{/* //발송 설정 */}
						{/* 버튼 영역 */}
						<Row className="table__button">
							<Col xs="auto">
								<Button variant="secondary" data-act="reset" onClick={eventHandle}>초기화</Button>
							</Col>
							<Col className="text-end">
								<Button variant="secondary" data-act="send_test" onClick={eventHandle}>테스트 발송</Button>
								<Button variant="primary ms-2" data-act="send_save" onClick={eventHandle}>푸시 발송</Button>
							</Col>
						</Row>
						</form>
						{/* //버튼 영역 */}
					</Tab>
				</Tabs>	
			</Container>


			<PopupPushTest isShow={showPushTest} callback={respTest} close={setShowPushTest} data={pushTestData}></PopupPushTest>
			<PopupPushExcelUpload isShow={showExcel} callback={respExcel} close={setShowExcel}></PopupPushExcelUpload>
			<PopupPushPreview isShow={previewModal} close={setPreviewModal} data={pushTestData}></PopupPushPreview>
			{ showTemplateList &&
				<PopupTemplateList isShow={showTemplateList} close={setShowTemplateList} callback={respTemplate}></PopupTemplateList>
			}
			{ showSearchPushTarget &&
				<PopupSearchPushTarget isShow={showSearchPushTarget} close={setShowSearchPushTarget} callback={respSearch}></PopupSearchPushTarget>
			}
			

		</div>
	);
};
export default Push;

