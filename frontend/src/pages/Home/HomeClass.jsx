import Safe from './Safe'
import '../../styles/Safe.css'
const HomeClass = () => {

  const safes = [{id:1,name:"Adding"},{id:2,name:"EZ"},{id:3,name:"Substract"}];
  // const safes = [];
  if (safes.length != 0)
    return (
      <div class="safe_container">
        {
          safes.map(safe => <Safe safeID={safe.id} safeName={safe.name}></Safe>)
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