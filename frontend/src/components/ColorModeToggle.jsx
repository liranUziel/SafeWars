import { useLocalStorage } from '../hooks/useLocalStorage';

const ColorModeToggle = () => {
	const [storedValue, setValue] = useLocalStorage('color-theme', 'dark');

	return (
		<button
			onClick={() => {
				// if set via local storage previously
				if (localStorage.getItem('color-theme')) {
					if (storedValue === 'light') {
						document.documentElement.classList.add('dark');
						setValue('dark');
						localStorage.setItem('chakra-ui-color-mode', 'dark');
					} else {
						document.documentElement.classList.remove('dark');
						setValue('light');
						localStorage.setItem('chakra-ui-color-mode', 'light');
					}

					// if NOT set via local storage previously
				} else {
					if (document.documentElement.classList.contains('dark')) {
						document.documentElement.classList.remove('dark');
						setValue('light');
						localStorage.setItem('chakra-ui-color-mode', 'light');
					} else {
						document.documentElement.classList.add('dark');
						setValue('dark');
						localStorage.setItem('chakra-ui-color-mode', 'dark');
					}
				}
			}}
			type='button'
			className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'
		>
			{storedValue === 'light' ? 'Join the dark side' : 'Let there be Light '}
		</button>
	);
};

export default ColorModeToggle;
