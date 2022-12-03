import { useState, useEffect } from "react";

// display Error on login or signup;
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { login, reset } from "../../../features/auth/authSlice";

import {
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
  Input,
  useToast,
} from "@chakra-ui/react";

const LandingPageSignin = ({ isHidden }) => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const { userName, password } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        status: "error",
      });
    }
    if (isSuccess || user) {
      navigate("/home");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      userName,
      password,
    };
    dispatch(login(userData));
  };
  return (
    <form onSubmit={onSubmit}>
      <FormControl className="text-light-dark-color">
        <FormLabel>User Name</FormLabel>
        <Input
          type="text"
          name="userName"
          value={userName}
          onChange={onChange}
        ></Input>
        <FormHelperText>Please enter your User Name</FormHelperText>

        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        ></Input>
        <FormHelperText>Please enter your Password</FormHelperText>
        <Button className="mt-2" type="submit" colorScheme="accent_color">
          Let's Go!
        </Button>
      </FormControl>
    </form>
    // <div id='signin-from'>
    // 	<form action='#' className='signin-signup-form' onSubmit={onSubmit}>
    // 		<label>user name</label>
    // 		<input
    // 			type='text'
    // 			id='userName'
    // 			name='userName'
    // 			value={userName}
    // 			required=''
    // 			placeholder='please enter your user name'
    // 			onChange={onChange}
    // 		/>
    // 		<label>Password</label>
    // 		<input
    // 			type='password'
    // 			id='password'
    // 			name='password'
    // 			value={password}
    // 			required=''
    // 			placeholder='please enter your password'
    // 			onChange={onChange}
    // 		/>
    // 		<button id='login-btn'>login</button>
    // 		<button
    // 			type='button'
    // 			className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
    // 		>
    // 			Green
    // 		</button>
    // 	</form>
    // </div>
  );
};

export default LandingPageSignin;
