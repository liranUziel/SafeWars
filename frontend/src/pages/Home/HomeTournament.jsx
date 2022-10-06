import Safe from './Safe'
import '../../styles/Safe.css'
import Spinner from '../../companents/Spinner';
import { useDispatch,useSelector} from 'react-redux';
import {clearTournament,getTournamentInfo,getTournamentSafes} from '../../features/tournament/tournamentSlice';
import {useEffect,useState} from 'react';

const HomeTournament = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth);
    const {tournamentInfo,tournamentSafes,isLoading,isError,isSuccess,message} = useSelector((state)=> state.tournament);
    const [safes, setSafes] = useState([]);
    const [tournamentEnable,setTournamentEnable] = useState(false);
    // let isLoading = false;
    console.log(`loading: ${isLoading} tournamentEnable: ${tournamentEnable}`);
    console.log(`Tournamet info:`);
    console.log(tournamentInfo);
    
    useEffect(() =>{
        dispatch(getTournamentInfo(user));
        dispatch(getTournamentSafes(user));
    },[dispatch]);
    
      useEffect(()=>{
        setSafes(tournamentSafes);
    },[tournamentSafes])
    
        if(isLoading)    {
        return <Spinner/>
        }

        if (safes.length !== 0)
        return (
            <div className="safe_container">
            {
                safes.map(safe => <Safe key={safe._id} safe={safe}></Safe>)
            }
            </div>
        )
        else if(tournamentEnable){
        return (
            <div className="empty_container">
                Safes list is empty
            </div>
        )
        }else{
            return (
            <div className="empty_container">
                Tournament is not open at this moment, please contect your teacher.
            </div>)
        }
    }

export default HomeTournament