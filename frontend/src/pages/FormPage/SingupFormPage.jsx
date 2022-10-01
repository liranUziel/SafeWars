
import {useState,useEffect} from 'react';
// import {FaUser} from 'react-icons/fa';

import {useNavigate} from 'react-router-dom';

import {toast} from 'react-toastify';
import Spinner from '../../companents/Spinner';

// Interact with storage
import {useSelector,useDispatch} from 'react-redux';
import {register,reset} from '../../features/auth/authSlice';

import '../../styles/LoginSignup.css';

const LandingPageSingup = () => {
    const [formData,setFormData] = useState({
        realName:'',
        userName:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const {realName,userName,email,password,confirmPassword} = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user,isLoading,isError,isSuccess,message} = useSelector((state)=> state.auth);

    const onChange = (e) =>{
        setFormData((prevState) =>  ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        if(isSuccess || user){
            navigate('/home');
        }
        dispatch(reset());
    },[user,isError,isSuccess,message,navigate,dispatch]);

    const onSubmit = (e) =>{
        // register
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Password do not match");
        }else{
            const userData = {
                realName,
                userName,
                email,
                password,
                userType:'student',
            }
            //once we submit register reset the isError,isLoading,isSuccess
            dispatch(register(userData));
        }
    }
    if(isLoading)    {
        return <Spinner/>
    }
    return (
        <div id="signup-from" >
            <form action="#" className="signin-signup-form" id="signup-form" onSubmit={onSubmit}>
                <label>full Name</label>
                <input type="text"  id='realName' name='realName' value={realName} required="" placeholder="please enter your full name" onChange={onChange}/>
                <label>user name</label>
                <input type="text" id='userName' name='userName' value={userName} required="" placeholder="please enter your user name" onChange={onChange}/>
                <label>email</label>
                <input type="email" id='email' name='email' value={email} required="" placeholder="please enter your email" onChange={onChange}/>
                <label>password</label>
                <input type="password" id='password' name='password' value={password} required="" placeholder="please enter your password" onChange={onChange}/>
                <label>password confiremation</label>
                <input type="password" id='confirmPassword' name='confirmPassword' value={confirmPassword} required="" placeholder="please re-enter your passord to confirem" onChange={onChange}/>
                <button id="login-btn">signup</button>
            </form>
        </div>
        )

}

export default LandingPageSingup