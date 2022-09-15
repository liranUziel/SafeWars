import '../../styles/LoginSignup.css';
import {useState,useEffect} from 'react';

const LandingPageSignin = ({isHidden}) => {
    const [formData,setFormData] = useState({
      userName:'',
      password:''
    })
    const {userName,password} = formData;
    const onChange = (e) =>{
        setFormData((prevState) =>  ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit = (e) =>{
        e.preventDefault();
    }
    return(
    <div id="signin-from">
        <form action="#" className="signin-signup-form" onSubmit={onSubmit}>
            <label>user name</label>
            <input type="text" id='userName' name='userName' value={userName} required="" placeholder="please enter your user name" onChange={onChange}/>
            <label>Password</label>
            <input type="password" id='password' name='password' value={password} required="" placeholder="please enter your password" onChange={onChange}/>
            <button id="login-btn">login</button>
        </form>
    </div>
    )
}

export default LandingPageSignin