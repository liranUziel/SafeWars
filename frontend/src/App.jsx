import { Routes, Route } from 'react-router-dom';
//===== PAGES ======
import FormPage from './pages/FormPage/FormPage';
//===== Home ======
import Home from './pages/Home/Home';
//subhome pages
import Class from './pages/Home/components/Class';
import HomeSafeZone from './pages/Home/components/SafeZone';
import Tournament from './pages/Home/components/Tournament';
import HomeScoreBoard from './pages/Home/components/ScoreBoard';
// defult home page (if no subpage were selected)
import Defult from './pages/Home/components/Defult';
//==== (Only) Instructor and above =====
import Dashboard from './pages/Home/components/Dashboard';

//=== 404
import PageNotFound from './components/PageNotFound';
const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<FormPage />} />
				<Route path='home' element={<Home />}>
					<Route path='' element={<Defult />} />
					<Route path='class' element={<Class />} />
					<Route path='safezone' element={<HomeSafeZone />} />
					<Route path='tournament' element={<Tournament />} />
					<Route path='scoreboard' element={<HomeScoreBoard />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='*' element={<PageNotFound />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
