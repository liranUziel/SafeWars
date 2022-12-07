const Defult = () => {
	return (
		<>
			<div className='flex flex-col items-center justify-center h-full w-full'>
				<div className='text-black dark:text-white'>
					<span className='font-bold'>Hello there, </span>
					Welcome to SafeZone here you will test you RE skills, by break some safe.
					<br />
					Once you are ready you can upload your own safe and key and take part of SafeZone tournament.
				</div>
				<img src={require('../../../assets/Images/safe_box_hello.png')} className='h-72' />
			</div>
		</>
	);
};

export default Defult;
