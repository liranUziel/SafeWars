import { useEffect, useState } from "react";
import { useSelector ,useDispatch} from 'react-redux';
import {getClassStudents} from '../../features/class/classSlice';
import StudentsList from "./StudentsList";

const Dashboard = () => {
    //# Id Name Submited Safe Score 

    const {user} = useSelector((state)=> state.auth);
    const {classInfo, classStudents, isLoading,isError,isSuccess,message} = useSelector((state)=> state.class);
    // const classes = [{name:'Emek',_id:123,students:[{_id:1,id:30257,name:'liran',Submited:true,Score:0},{_id:2,id:30168,name:'moshe',Submited:true,Score:0}]},{name:'Karmiel',_id:13,students:[{_id:3,id:20145,name:'gavriel',Submited:true,Score:0},{_id:4,id:20256,name:'david',Submited:false,Score:0},{_id:5,id:20367,name:'ron',Submited:true,Score:0}]}];
    const [classArray,setCalssArray] = useState([]);
    const [selection,setSelection] = useState(0);
    const [students,setStudents] = useState([]);
    
    const dispatch = useDispatch();

    const loadClassData = (e) =>{
        setSelection(classArray[e.target.value]);
        
    }
    const createTournament = (e) => {
        e.preventDefault();
        console.log(`create tournament for class: ${selection.name}`);
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
    },[selection,useDispatch])

    useEffect(()=>{
        if(classArray.length > 0)
        {
            console.log(`IDK: ${classArray[selection]._id}`)
            dispatch(getClassStudents({user,classId: classArray[selection]._id}));
        }
        // 
        console.log(`set class student list ${students}`);
    },[classArray]);
    return (
        <div>
            {classArray.length > 0 ?
            <div>
            <form onSubmit={createTournament}>
                <select name="class" id="class" onChange={loadClassData}>
                {
                    classArray.map((classObj,index) => <option value={index} key={index}>{`${classObj.classInfo.className} ${classObj.classInfo.classNumber}`}</option>)
                }
                </select>
                <button>create tournament</button>
            </form>
            {students.length > 0 ? <StudentsList students={students}></StudentsList> :<>Not students in class {`${classArray[selection].classInfo.className} ${classArray[selection].classInfo.classNumber}`}</>}
            </div>
            :
            <>no classes found</>
            }
            
        </div>
    )
}

export default Dashboard