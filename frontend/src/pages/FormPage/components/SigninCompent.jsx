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
        <Button className="mt-2" type="submit" bg="dark-accenet.100">
          Let's Go!
        </Button>
      </FormControl>
    </form>
  );
};

export default LandingPageSignin;
