import { Routes, Route } from 'react-router-dom';

import FormPage from './pages/FormPage/FormPage';
import Home from './pages/Home/Home';
import Class from './pages/Home/HomeClass';
import HomeSafeZone from './pages/Home/HomeSafeZone';
import Tournament from './pages/Home/HomeTournament';
import PageNotFound from './components/PageNotFound';
import Defult from './pages/Home/Defult';
import HomeScoreBoard from './pages/Home/HomeScoreBoard';
import Dashboard from './pages/Home/Dashboard';

const App = () => {
	return (
		<>
			<Routes>
				<Route path='home' element={<Home />}>
					<Route path='' element={<Defult />} />
					<Route path='class' element={<Class />} />
					<Route path='safezone' element={<HomeSafeZone />} />
					<Route path='tournament' element={<Tournament />} />
					<Route path='scoreboard' element={<HomeScoreBoard />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='*' element={<PageNotFound />} />
				</Route>
				<Route path='/' element={<FormPage />} />
			</Routes>
		</>
	);
};

export default App;
