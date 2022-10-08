import { useEffect, useState } from "react";
import StudentsList from "./StudentsList";

const Dashboard = () => {
    //# Id Name Submited Safe Score 
    const classes = [{name:'Emek',_id:123,students:[{_id:1,id:30257,name:'liran',Submited:true,Score:0},{_id:2,id:30168,name:'moshe',Submited:true,Score:0}]},{name:'Karmiel',_id:13,students:[{_id:3,id:20145,name:'gavriel',Submited:true,Score:0},{_id:4,id:20256,name:'david',Submited:false,Score:0},{_id:5,id:20367,name:'ron',Submited:true,Score:0}]}];
    const [selection,setSelection] = useState(classes[0]);
    const [students,setStudents] = useState();
    console.log(students,typeof(students));
    const loadClassData = (e) =>{
        setSelection(classes[e.target.value]);
        
    }
    const createTournament = (e) => {
        e.preventDefault();
        console.log(`create tournament for class: ${selection.name}`);
    }
    useEffect(()=>{
        // console.log(selection.students);
        // console.log(`load ${selection.name} class info`);
        // console.log(`dipatch getctudent list`);
        if(selection!==undefined){
            setStudents(selection.students);
            console.log(`set class student list ${students}`);
        }
    },[selection])
    return (
        <div>
            {classes.length > 0 ?
            <div>
            <form onSubmit={createTournament}>
                <select name="class" id="class" onChange={loadClassData}>
                    {
                        classes.map((classinfo,index) => <option value={index} key={classinfo._id}>{classinfo.name}</option>)
                    }
                </select>
                <button>create tournament</button>
            </form>
            {students !== undefined ? <StudentsList students={students}></StudentsList> :<>undefined</>}
            </div>
            :
            <>no classes found</>
            }
            
        </div>
    )
}

export default Dashboard