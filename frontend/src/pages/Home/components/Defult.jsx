// import '../../styles/Default.css';
import Stepper from './utilsComponents/Stepper';

const Defult = () => {
	return (
		<>
			<div className='border m-5 h-fit w-96 text-black dark:text-white'>
				<Stepper />
			</div>
			<div className='defult_container'>
				<div className='defult__content'>
					<div className='defult__content__text text-black dark:text-white'>
						<span className='defult__content__text__bold'>Hello there,</span>
						Welcome to SafeZone here you will test you RE skills, by break some safe.
						<br />
						Once you are ready you can upload your own safe and key and take part of SafeZone tournament.
						{/* <button className="Defult__CTA">CTA button</button> */}
					</div>
					<img
						src={require('../../../assets/Images/safe_box_hello.png')}
						className='defult__content__text__img h-72'
					/>
				</div>
			</div>
		</>
	);
};

export default Defult;
