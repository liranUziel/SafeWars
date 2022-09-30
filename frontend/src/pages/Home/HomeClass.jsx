import Safe from './Safe'
import '../../styles/Safe.css'
const HomeClass = () => {

  const safes = [{id:1,name:"Adding",solve:true},{id:2,name:"EZ",solve:true},{id:3,name:"Substract",solve:false}];
  // const safes = [];
  if (safes.length != 0)
    return (
      <div className="safe_container">
        {
          safes.map(safe => <Safe key={safe.id} safe={safe}></Safe>)
        }
      </div>
    )
  else{
    return (
    <>
      Safes list is empty
    </>
    )
  }
}

export default HomeClass