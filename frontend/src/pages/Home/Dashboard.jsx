import { useEffect, useState } from "react";
import { useSelector ,useDispatch} from 'react-redux';
import {getClassStudents} from '../../features/class/classSlice';
import StudentsList from "./StudentsList";
import { createTournamentSafes } from '../../features/tournament/tournamentSlice';
import '../../styles/dashboard.css';

const Dashboard = () => {
    //# Id Name Submited Safe Score 

    const {user} = useSelector((state)=> state.auth);
    const {classInfo, classStudents} = useSelector((state)=> state.class);
    const { tournamentInfo} = useSelector(
		(state) => state.tournament
	);
    // const classes = [{name:'Emek',_id:123,students:[{_id:1,id:30257,name:'liran',Submited:true,Score:0},{_id:2,id:30168,name:'moshe',Submited:true,Score:0}]},{name:'Karmiel',_id:13,students:[{_id:3,id:20145,name:'gavriel',Submited:true,Score:0},{_id:4,id:20256,name:'david',Submited:false,Score:0},{_id:5,id:20367,name:'ron',Submited:true,Score:0}]}];
    const [classArray,setCalssArray] = useState([]);
    const [selection,setSelection] = useState(0);
    const [students,setStudents] = useState([]);
    const [showScore,setShowScore] = useState(false);
    const dispatch = useDispatch();

    const loadClassData = (e) =>{  
        setSelection(classArray[e.target.value]);
        console.log(students);
    }
    const createTournament = (e) => {
        e.preventDefault();
        console.log('creating');
      createTournamentSafes(user,classArray[selection]._id,false,undefined);
        // console.log(`Create tournament for class ${classArray[selection].classInfo.className} ${classArray[selection].classInfo.classNumber} ${showScore?'and show score':''}`);

    }
    useEffect(()=>{
        if(classInfo){
            setCalssArray(classInfo);
        }
    },[classInfo]);
    
    useEffect(()=>{
        if(classStudents){
            setStudents(classStudents);
        }
    },[classStudents]);

    useEffect(()=>{
        if(selection!==undefined){
            // setStudents(selection.students);
        }
    },[selection])

    useEffect(()=>{
    console.log("classArray was loaded");
    if(classArray.length > 0)
    {   
        console.log(`loading class ${classArray[selection]._id} student list`);
        dispatch(getClassStudents({user,classId: classArray[selection]._id}));
        
    }
    },[classArray]);
    return (
        <div className="dashboard_Container">
            {classArray.length > 0 ?
            <div className="dashboard_Container__box">
                <div>
                    <label>Select Class </label>
                    <select name="dashboard_Container__box__classList" id="class" onChange={loadClassData}>
                    {
                        classArray.map((classObj,index) => <option className="dashboard_Container__box__class" value={index} key={index}>{`${classObj.classInfo.className} ${classObj.classInfo.classNumber}`}</option>)
                    }
                    </select>
                </div>
                <h1>Student List</h1>
                <div>
                    {students.length > 0 ? <StudentsList students={students}></StudentsList> :<>Not students in class {`${classArray[selection].classInfo.className} ${classArray[selection].classInfo.classNumber}`}</>}
                </div>
                <form onSubmit={createTournament} className="dashboard_Form">
                    <div>
                
                    </div>
                    <div>
                        <button className="bg-green-500" type="submit">create tournament</button>
                        <label>show score board  </label>
                        <input type="checkbox" value={showScore} onChange={setShowScore}></input>
                    </div>
                    {/* <label>set deadline</label>
                    <input type="calnder"></input> */}
                </form>
            </div>
            :
            <>no classes found</>
            }
            
        </div>
    )
}

export default Dashboard