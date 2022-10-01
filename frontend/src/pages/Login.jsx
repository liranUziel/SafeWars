import {useState,useEffect} from 'react';
import {FaSignInAlt} from 'react-icons/fa';

import {useSelector,useDispatch} from 'react-redux';

import {login,reset} from '../features/auth/authSlice';

function Login() {
    const [formData,setFormData] = useState({
        userName:'',
        password:''
    })
    const {userName,password} = formData;
    const {user,isLoading,isError,isSuccess,message} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        console.log("hello");
        e.preventDefault();
        const userData = {
            userName,
            password,
        }
        dispatch(login(userData));
    }
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt/> Login
                    <p>
                        Login and start cracking...
                    </p>
                </h1>
            </section>
            <section className='form'>            
                    <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <input type="text" className='form-control' id='userName' name='userName' value={userName} placeholder='Enter your usre name' onChange={onChange}/>
                            <input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
                        </div>
                        <div className='form-group'>
                            <button type="submit" className='btn btn-block'>Login</button>
                        </div>
                    </form>            
            </section>
        </>
    )
}

export default Login