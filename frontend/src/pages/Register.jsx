import {useState,useEffect} from 'react';
import {FaUser} from 'react-icons/fa';

import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'

import Spinner from '../companents/Spinner';


import {register,reset} from '../features/auth/authSlice';

function Register() {
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
            navigate('/');
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
            dispatch(register(userData));
        }

    }
    if(isLoading)    {
        return <Spinner/>
    }
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser/> Register
                    <p>
                        Please create an account
                    </p>
                </h1>
            </section>
            <section className='form'>            
                    <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <input type="text" className='form-control' id='realName' name='realName' value={realName} placeholder='Enter your name' onChange={onChange}/>
                            <input type="text" className='form-control' id='userName' name='userName' value={userName} placeholder='Enter your usre name' onChange={onChange}/>
                            <input type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
                            <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
                            <input type="password" className='form-control' id='confirmPassword' name='confirmPassword' value={confirmPassword} placeholder='ReEnter your password' onChange={onChange}/>
                        </div>
                        <div className='form-group'>
                            <button type="submit" className='btn btn-block'>Submit</button>
                        </div>
                    </form>            
            </section>
        </>
    )
}

export default Register