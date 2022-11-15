import '../styles/Compannets/Footer.css';
import { BsFillShieldFill, BsSafeFill, BsFillBarChartFill } from 'react-icons/bs';
const Footer = () => {
	return (
		<footer className='footer_container'>
			<span className='footer__shield'>
				<BsFillShieldFill />
			</span>
			<div className='line'></div>
			<div className='footer_info'>
				<div className='footer'>This website create by:</div>
				<div>Liran</div>
				<div>Gabriel</div>
				powerd by "sdaasd"
				<div>creade by:</div>
				<div>Artur</div>
			</div>
		</footer>
	);
};

export default Footer;
