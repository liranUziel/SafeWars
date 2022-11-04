import { Routes, Route } from 'react-router-dom';
//===== PAGES ======
import FormPage from './pages/FormPage/FormPage';
//===== Home ======
import Home from './pages/Home/Home';
//subhome pages
import Class from './pages/Home/HomeClass';
import HomeSafeZone from './pages/Home/HomeSafeZone';
import Tournament from './pages/Home/HomeTournament';
import HomeScoreBoard from './pages/Home/HomeScoreBoard';
// defult home page (if no subpage were selected)
import Defult from './pages/Home/Defult';
//==== (Only) Instructor and above =====
import Dashboard from './pages/Home/Dashboard';

//=== 404
import PageNotFound from './components/PageNotFound';
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
