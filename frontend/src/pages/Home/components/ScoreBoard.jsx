import { Avatar } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useToast } from '@chakra-ui/react';

//get user name and use useState
const HomeScoreBoard = () => {
  const { user } = useSelector((state) => state.auth);
  const [realName,setUsername] = useState("");
  const [score,setScore] = useState(0);
  const [userImg,setUserImg] = useState("");
  useEffect(()=>{
    setUsername(user.realName);
    setScore(user.score);
    setUserImg('');
  },[user]);
  const reader = new FileReader();
  const thereIsChange = (e) =>{
    e.preventDefault();
    const file  = e.target.files[0];
    reader.readAsText(file,'UTF-8');
    reader.onload = (e) =>{
      const placeholder = document.getElementById('text');
      placeholder.innerHTML = e.target.result;
    }
  }


  return (
    <div className="flex w-1/2 flex-col items-center m-10 p-2 gap-2">
      <Avatar name={realName} src={userImg} /> 
      <span>You Score is: {score}</span>
      <Button colorScheme='teal'>show leader board</Button>
      {/* <input type="file" onChange={thereIsChange}/> */}
      {/* <div id="text"></div> */}
    </div>
  )
}

export default HomeScoreBoard