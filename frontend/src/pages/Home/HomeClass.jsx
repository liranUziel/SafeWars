import Safe from './Safe'
import '../../styles/Safe.css'
import Spinner from '../../companents/Spinner';

import { useSelector} from 'react-redux';
const HomeClass = () => {

  const safe = [{id:1,name:"Adding",solve:true},{id:2,name:"EZ",solve:true},{id:3,name:"Substract",solve:false}];
  // const safes = [];
  const {classSafes,isLoading,isError,isSuccess,message} = useSelector((state)=> state.class);
  const safes = classSafes;
  if(isLoading)    {
    return <Spinner/>
  }
  if (safes.length != 0)
    return (
      <div className="safe_container">
        {
          safes.map(safe => <Safe key={safe._id} safe={safe}></Safe>)
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