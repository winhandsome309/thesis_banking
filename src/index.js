import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import Layout from './layouts';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
ReactDOM.createRoot(document.getElementById('root')).render(
	<ChakraProvider	 theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Routes>
						<Route path={`/`} component={Layout}/>
					</Routes>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
