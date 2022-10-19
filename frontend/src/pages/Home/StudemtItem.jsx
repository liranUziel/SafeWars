const StudemtItem = ({student,index,removeStudent}) => {
//# Id Name Submited Safe Score 
  return (
    <tr>
        <td>{index}</td>
        <td>{student.id}</td>
        <td>{student.name}</td>
        <td>{student.hasSubmitedSafe?'V':''}</td>
        <td>{student.score}</td>
        <td><button id={student._id} value={student._id} onClick={removeStudent}>X</button></td>
    </tr>
  )
}

export default StudemtItem