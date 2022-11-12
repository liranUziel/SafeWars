import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner';

// Interact with storage
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../../features/auth/authSlice';

import { FormControl, FormLabel, FormHelperText, Input, Button, useToast } from '@chakra-ui/react';

const LandingPageSingup = () => {
	const toast = useToast();

	const [formData, setFormData] = useState({
		realName: '',
		userID: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { realName, userID, userName, email, password, confirmPassword } = formData;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	useEffect(() => {
		if (isError) {
			toast({
				title: message,
				status: 'error',
				isClosable: true,
			});
		}
		if (isSuccess || user) {
			navigate('/home');
		}
		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onSubmit = (e) => {
		// register
		console.log('onSubmit');
		e.preventDefault();
		if (password !== confirmPassword) {
			console.log('pass!==coPass');
			toast({
				title: 'Password does not match!',
				status: 'error',
				isClosable: true,
			});
		} else {
			const userData = {
				realName,
				email,
				password,
				userType: 'student',
				userId: userID,
			};
			//once we submit register reset the isError,isLoading,isSuccess
			dispatch(register(userData));
		}
	};
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<form onSubmit={onSubmit}>
				<FormControl className='text-light-dark-color'>
					<FormLabel>Full Name</FormLabel>
					<Input type='text' name='realName' value={realName} onChange={onChange}></Input>
					<FormHelperText>Please enter your Full Name</FormHelperText>

					<FormLabel>User ID</FormLabel>
					<Input type='text' name='userID' value={userID} onChange={onChange}></Input>
					<FormHelperText>Please enter your user ID</FormHelperText>

					<FormLabel>Email</FormLabel>
					<Input type='email' name='email' value={email} onChange={onChange}></Input>
					<FormHelperText>Please enter your email</FormHelperText>

					<FormLabel>Password</FormLabel>
					<Input type='password' name='password' value={password} onChange={onChange}></Input>
					<FormHelperText>Please enter your Password</FormHelperText>

					<FormLabel>Password Confirmation</FormLabel>
					<Input type='password' name='confirmPassword' value={confirmPassword} onChange={onChange}></Input>
					<FormHelperText>Please re-enter your Password</FormHelperText>

					<br />
					<Button type='submit' colorScheme='accent_color'>
						Sign Me Up
					</Button>
				</FormControl>
			</form>
		</>
		// <div id='signup-from'>
		// 	<form action='#' className='signin-signup-form' id='signup-form' onSubmit={onSubmit}>
		// 		<label>full Name</label>
		// 		<input
		// 			type='text'
		// 			id='realName'
		// 			name='realName'
		// 			value={realName}
		// 			required=''
		// 			placeholder='please enter your full name'
		// 			onChange={onChange}
		// 		/>
		// 		<label>user ID</label>
		// 		<input
		// 			type='text'
		// 			id='userID'
		// 			name='userID'
		// 			value={userID}
		// 			required=''
		// 			pattern='[0-9]{9}'
		// 			placeholder='please enter your user ID'
		// 			onChange={onChange}
		// 		/>
		// 		<label>user name</label>
		// 		<input
		// 			type='text'
		// 			id='userName'
		// 			name='userName'
		// 			value={userName}
		// 			required=''
		// 			placeholder='please enter your user name'
		// 			onChange={onChange}
		// 			disabled
		// 		/>
		// 		<label>email</label>
		// 		<input
		// 			type='email'
		// 			id='email'
		// 			name='email'
		// 			value={email}
		// 			required=''
		// 			placeholder='please enter your email'
		// 			onChange={onChange}
		// 		/>
		// 		<label>password</label>
		// 		<input
		// 			type='password'
		// 			id='password'
		// 			name='password'
		// 			value={password}
		// 			required=''
		// 			placeholder='please enter your password'
		// 			onChange={onChange}
		// 		/>
		// 		<label>password confiremation</label>
		// 		<input
		// 			type='password'
		// 			id='confirmPassword'
		// 			name='confirmPassword'
		// 			value={confirmPassword}
		// 			required=''
		// 			placeholder='please re-enter your passord to confirem'
		// 			onChange={onChange}
		// 		/>
		// 		<button id='login-btn'>signup</button>
		// 	</form>
		// </div>
	);
};

export default LandingPageSingup;
