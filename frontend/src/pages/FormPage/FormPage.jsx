import { ReactComponent as SafeBox } from '../../assets/Images/safebox.svg';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react';

//State
import { useState } from 'react';

import SigninCompent from './components/SigninCompent';
import SingupCompent from './components/SignupCompent';

const signInSignUp = 'text-white w-20 h-7 border-none font-semibold';

function LogingAndSignup() {
	//Hold the signup-signin toggle state
	const [isHidden, setisHidden] = useState(true);

	const signinToggleBtn = document.getElementById('signin-toggle');
	const signupToggleBtn = document.getElementById('signup-toggle');

	const signinToggle = (e) => {
		//Can be better with if statment
		if (isHidden) {
			signinToggleBtn.classList.remove('toggled');
			signupToggleBtn.classList.add('toggled');
		} else {
			signupToggleBtn.classList.remove('toggled');
			signinToggleBtn.classList.add('toggled');
		}
		setisHidden(!isHidden);
	};
	return (
		<div className='h-screen bg-accent-color'>
			<main className='grid grid-cols-2'>
				<div className='absolute right-0 bg-dark-color h-screen w-1/2 shadow-2xl shadow-dark-color'>
					<Tabs variant='soft-rounded' align='end'>
						<TabList mb='1em' className='m-3'>
							<Tab className={signInSignUp} _selected={{ bg: 'accent-color.500' }}>
								SignUp
							</Tab>
							<Tab className={signInSignUp} _selected={{ bg: 'accent-color' }}>
								SignIn
							</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<SingupCompent />
							</TabPanel>
							<TabPanel>
								<SigninCompent />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
				{/* <div className='absolute right-0 bg-dark-color h-full w-1/2 shadow-2xl shadow-dark-color'>
					<div className='toggle-container'>
						<div className='signin-login-toggle'>
							<button id='signup-toggle' className={signInSignUp} onClick={signinToggle}>
								Signup
							</button>
							<button id='signin-toggle' className={signInSignUp} onClick={signinToggle}>
								Login
							</button>
						</div>
					</div>
					<div className=''>{isHidden ? <SigninCompent /> : <SingupCompent />}</div>
				</div> */}
				<div>
					<SafeBox className='h-[36rem] fill-mid-color translate-x-5' />
				</div>
			</main>
		</div>
	);
}

export default LogingAndSignup;
