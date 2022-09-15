import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa';

import {useNavigate,Link} from 'react-router-dom'

import { useSelector ,useDispatch} from 'react-redux';
import { logout,reset } from '../features/auth/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth);

    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    const GotoClass = () =>{
        navigate('/home/class')
    }
    const GotoSafe = () =>{
        navigate('/home/safezone')
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/home'>SafeWars</Link>
            </div>
            <ul>
                {user ? (
                <>
                    <li>
                        <button  onClick={GotoSafe}>My Safe</button>
                    </li>
                    <li>
                        <button onClick={GotoClass}>Class</button>
                    </li>
                    <li>
                        <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </>
                ) : (
                <>
                    <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                    </li>
                    <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                    </li>
                </>
                )}
        </ul>
        </header>
    )
}

export default Header