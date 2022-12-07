import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home = () => {
	const { user, isLoading } = useSelector((state) => state.auth);
	if (isLoading) {
		return <>Trying to log in...</>;
	}
	if (!user) {
		return <Navigate to='/' />;
	}

	return (
		<div className='flex flex-col justify-between h-screen'>
			<Header />
			<main className='grow bg-white dark:bg-dark-accenet-200'>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Home;
