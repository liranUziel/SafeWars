import '../../styles/LoginSignup.css';
//State
import {useState} from 'react';
// import {useEffect} from 'react';
//Storage
// import {useSelector,useDispatch} from 'react-redux';
//Navigation
// import {useNavigate} from 'react-router-dom';

import SigninFormPage from './SigninFormPage';
import SingupFormPage from './SingupFormPage';



function LogingAndSignup() {
    //Hold the signup-signin toggle state
    const [isHidden,setisHidden] = useState(true);
    const signinToggle = (e) =>{
        const signinToggleBtn = document.getElementById("signin-toggle");
        const signupToggleBtn = document.getElementById("signup-toggle");
        if(isHidden){
            signinToggleBtn.classList.remove("toggled");
			signupToggleBtn.classList.add("toggled");
        }
        else{
            signupToggleBtn.classList.remove("toggled");
            signinToggleBtn.classList.add("toggled");
            
        }
        setisHidden(!isHidden);
    }
    return (
        <>
            <div className="container">
                <div className="form-container">
                    <div className="signin-login-toggle">
                        <button id="signup-toggle" className="signup-signin" onClick={signinToggle}>Signup</button>
                        <button id="signin-toggle" className="signup-signin toggled" onClick={signinToggle}>Login</button>
                    </div>
                </div>
                <div className="form-container">
                    {isHidden?<SigninFormPage/>:null}
                    {isHidden?null:<SingupFormPage/>}    
                </div>
            </div>
        </>
    )
}

export default LogingAndSignup