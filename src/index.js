import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

window.link = "http://127.0.0.1:5000";
// window.link = "https://hs-banking.onrender.com";

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Routes>
						{/* <Route path={`/auth`} component={AuthLayout} /> */}
						<Route path={"/admin/*"} element={<Dashboard/>} />
						{/* <Redirect from='/' to='/admin' />*/}
						<Route path="/" element={<Navigate replace to="/admin" />} />
					</Routes>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
