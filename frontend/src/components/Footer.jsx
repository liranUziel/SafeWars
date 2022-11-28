import ColorModeToggle from './ColorModeToggle';

const Footer = () => {
	return (
		<footer className='flex dark:bg-dark-accent-color bg-accent-color p-6 w-full justify-between'>
			<span class='block text-sm font-bold text-white'>
				© 2022 Liran Uziel && Gabriel Milshtein. All Rights Reserved.
			</span>
			<ColorModeToggle />
		</footer>
	);
};

export default Footer;
