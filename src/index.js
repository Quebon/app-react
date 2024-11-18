import React from 'react';
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/custom.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

//root.render(
//	<React.StrictMode>
//	  <HashRouter>
//		<App />
//	  </HashRouter>
//	</React.StrictMode>
//  );
  
reportWebVitals();

