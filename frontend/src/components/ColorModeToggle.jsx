import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ColorModeToggle = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<button
			onClick={toggleColorMode}
			type='button'
			className='flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm w-8 h-8 items-center justify-center'
		>
			{colorMode === 'light' ? <MoonIcon boxSize='6' /> : <SunIcon boxSize='6' />}
		</button>
	);
};

export default ColorModeToggle;
