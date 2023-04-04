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
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
	colors: {
		'dark-accenet': {
			100: '#4DAFC5',
			200: '#6D738D',
			// ...
			800: '#3199AF',
			900: '#2B2E3D',
		},
		'light-accent': {
			100: '#2B2E3D',

			800: '#5C6279',
			900: '#4DAFC5',
		},
	},
	components: {
		Steps,
	},
});

console.log(import.meta.env);

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
