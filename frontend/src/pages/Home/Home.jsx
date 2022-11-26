import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import {toast} from 'react-toastify'
import '../../styles/Home.css';

import Spinner from '../../components/Spinner';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home = () => {
	const { user, isLoading } = useSelector((state) => state.auth);

	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (!user) {
		return <Navigate to='/' />;
	}

	return (
		<div className='flex flex-col justify-between h-screen'>
			<Header />
			<main className='grow bg-white dark:bg-dark-secondary-color'>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Home;
