import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import {useNavigate,Link} from 'react-router-dom'
// import { useSelector ,useDispatch} from 'react-redux';
import FormPage from './pages/FormPage/FormPage';
import Home from './pages/Home/Home';
import Class from './pages/Home/HomeClass';
import HomeSafeZone from './pages/Home/HomeSafeZone';
import Tournament from './pages/Home/HomeTournament';
import PageNotFound from './companents/PageNotFound';
import Defult from './pages/Home/Defult';
import HomeScoreBoard from './pages/Home/HomeScoreBoard';

function App() {
  
  return (
    <>
      <Router>
          <Routes>
            <Route path="home" element={<Home/>} >
              <Route path="" element={<Defult/>}/>
              <Route path="class" element={<Class/>}/>
              <Route path="safezone" element={<HomeSafeZone/>}/>
              <Route path="tournament" element={<Tournament/>}/>
              <Route path="scoreboard" element={<HomeScoreBoard/>}/>
              <Route path="*" element={<PageNotFound/>} />
            </Route>
            <Route path="/" element={<FormPage/>} />
          </Routes>
        
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
