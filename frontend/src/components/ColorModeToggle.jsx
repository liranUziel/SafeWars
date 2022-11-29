import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

const ColorModeToggle = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<button
			onClick={toggleColorMode}
			type='button'
			className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'
		>
			{colorMode === 'light' ? 'Join the dark side' : 'Let there be Light '}
		</button>
	);
};

export default ColorModeToggle;
