import Safe from './Safe'
import '../../styles/Safe.css'
import Spinner from '../../companents/Spinner';

import { useDispatch,useSelector} from 'react-redux';
// import {clearClass,getClassInfo,getClassSafes} from '../../features/class/classSlice';
import {useEffect,useState} from 'react';

const HomeTournament = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth);
    // const {classSafes,isLoading,isError,isSuccess,message} = useSelector((state)=> state.class);
    const [safes, setSafes] = useState([]);
    const [tournamentEnable,setTournamentEnable] = useState(false);
    let isLoading = false;
    console.log(`loading: ${isLoading} tournamentEnable: ${tournamentEnable}`);
    /*
    useEffect(() =>{
        // dispatch(getClassSafes(user));
    },[dispatch]);
    
      useEffect(()=>{
        // setSafes(classSafes)
    },[classSafes])
    */
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