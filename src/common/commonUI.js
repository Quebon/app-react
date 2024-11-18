import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	Pagination,
	Table,
	Form,
	InputGroup,
	Tab,
	Tabs,
} from "react-bootstrap";
import {Link} from "react-router-dom";

export const CommonUI = {
	pagenationItems:(opt) => {
		let pageSize = 10;
		let active = opt.currPage - 1 + 1;
		let items = [];
		let maxPage = Math.ceil(opt.totalRecords / pageSize);
		let startPage = Math.floor(active / pageSize) * pageSize + 1;
		if(active % pageSize == 0) startPage -= pageSize;
		let endPage = Math.ceil(active / pageSize) * pageSize;
		if(endPage > maxPage) endPage = maxPage;

		const eventHandle = (ev) => {
			ev.preventDefault();
			let evo = ev.currentTarget;
			let act_v = evo.getAttribute("data-act");
			console.log("act = " + act_v);


			if(act_v == "page") {
				let seq_v = evo.getAttribute("data-id");
				opt.eventHandler(seq_v);
			}
		};

		items.push(<Pagination.First key={startPage - 2} data-act="page" data-id={1} onClick={eventHandle}/>);
		items.push(<Pagination.Prev key={startPage - 1} data-act="page" data-id={startPage > 1 ? startPage - 1 : 1} onClick={eventHandle}/>);
		for (let number = startPage; number <= endPage; number++) {
			items.push(
				<Pagination.Item key={number} active={number === active} onClick={eventHandle} data-act="page" data-id={number}>
					{number}
				</Pagination.Item>,
			);
		}		
		items.push(<Pagination.Next key={endPage + 1} data-id={endPage < maxPage ? endPage + 1 : endPage} onClick={eventHandle}/>);
		items.push(<Pagination.Last key={endPage + 2} data-act="page" data-id={maxPage} onClick={eventHandle}/>);

		return items;
	}
}