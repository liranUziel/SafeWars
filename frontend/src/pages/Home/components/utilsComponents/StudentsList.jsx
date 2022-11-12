import { useState } from "react";
import StudemtItem from "./StudemtItem";

const StudentsList = ({students}) => {
    const [studetId,setStudetId] = useState('');
    const [searchResult,setSearchResult] = useState([]);
    const [searchId,setSearchId] = useState('');

    const removeStudent = (e) =>{
        e.preventDefault();
        console.log(`remove student ${e.target.value}`);
    }
    const addStudent = (e) =>{
        e.preventDefault();
        console.log(`add student ${studetId}`);
        setStudetId('');
        setSearchId('');
        setSearchResult([]);
    }
    const stuedntFind = (e) =>{
        setSearchId(e.target.value);
        setSearchResult(['a','b']);
    }

    const setSearch = (e) =>{
        console.log(`set result to ${e.target.id}`);
        setStudetId(e.target.id);
        setSearchId(e.target.id);
        setSearchResult([]);
    }
    return (
        <div className="studentList_container">
            <div className="studentList_table">
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
            </div>
            <form onSubmit={addStudent} className="studentSreach_form">
                <label>Search: </label>
                <input type="text" className="searchBox" value={searchId} onChange={stuedntFind}></input><button >+</button>
                {searchResult.length>0?<div className="searchReslut_box">

                    {searchResult.map((student,index) => {
                    return <div className="searchReslut_option" id={student} key={index} onClick={setSearch} value={student}>{student} </div>;
                    })}
                </div>
                :<>
                </>}
            </form>
        </div>
    )
}

export default StudentsList