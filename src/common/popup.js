import React, { useState, useCallback } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	Table,
	Form,
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
import appIcon from './../assets/images/temp_appIcon.png';
import { useDispatch } from "react-redux";


export const Alert = ({opt}) => {
	let options= opt;
	const [show, setShow] = useState(options.isOpen);
	const selfClose = function() {
		options.closeF({isOpen:false});
	};

	return (
		<Modal show={options.isOpen} onHide={selfClose} centered size="sm" className="normalType">
			<Modal.Header closeButton>
				<Modal.Title>{opt.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body dangerouslySetInnerHTML={{__html:opt.message }}>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={() => selfClose()}>확인</Button>
			</Modal.Footer>
		</Modal>
	);
};


const Popup = ({opt}) => {
	let options= opt;
	const [show, setShow] = useState(options.isOpen);
	const selfClose = function() {
		options.closeF({isOpen:false});
	};

	return (
		<Modal show={opt.isOpen} onHide={selfClose} centered size="sm" className="normalType">
			<Modal.Header closeButton>
				<Modal.Title>{opt.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body dangerouslySetInnerHTML={{__html:opt.message }}>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => selfClose(false)}>취소</Button>
				<Button variant="primary" onClick={() => selfClose(false)}>확인</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default Popup;


