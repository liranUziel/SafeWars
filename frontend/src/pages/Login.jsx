import {useState,useEffect} from 'react';
import {FaSignInAlt} from 'react-icons/fa';
function Login() {
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