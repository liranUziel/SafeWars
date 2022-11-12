import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
	colors: {
		accent_color: { 500: '#369993' },
		'light-accent-color': '#7CEAE2',
		'light-gray': '#A3A3A3',
		'dark-color': ' #2E3448',
		'mid-color': '#40475C',
		'mid-color-dark': '#373E52',
		'light-dark-color': '#E5F6FF',
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</ChakraProvider>
	</React.StrictMode>
);
