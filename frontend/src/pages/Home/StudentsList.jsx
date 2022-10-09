import { useState } from "react";
import StudemtItem from "./StudemtItem";

const StudentsList = ({students}) => {
    console.log('render student list');
    const [studetId,setStudetId] = useState('');
    const removeStudent = (e) =>{
        e.preventDefault();
        console.log(`remove student id ${e.target.value} from class`);
    }
    const addStudent = (e) =>{
        e.preventDefault();
        console.log(`add student id ${studetId} from class`);
        setStudetId('');
    }
    const stuedntFind = (e) =>{
        setStudetId(e.target.value);
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Submited Safe</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student,index) =><StudemtItem key={student.id} index={index} student={student} removeStudent={removeStudent}/>)}
                </tbody>
            </table>
            <form onSubmit={addStudent}>
                <input type="text" value={studetId} onChange={stuedntFind}></input><button >+</button>
            </form>
        </div>
    )
}

export default StudentsList