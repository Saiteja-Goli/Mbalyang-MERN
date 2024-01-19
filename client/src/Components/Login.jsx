import React from "react";
import {
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import video1 from "../assets/video4.mp4";
import './Login.css'

const Login = () => {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const handleClick = () => setShow(!show);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const toast = useToast()

  const handelSubmit = (e) => {
    e.preventDefault();
    fetch(`https://mbalyang-backend-code.onrender.com/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    }).then(res => res.json())
      .then((data) => {
        console.log(data)
        if (data.token) {
          console.log(data.token)
          localStorage.setItem("token", JSON.stringify(data.token))
          toast({
            title: 'Success',
            description: "Login Successfull",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })

          navigate("/")
        } else {
          toast({
            title: 'Incorrect Credentials',
            description: "Please Enter Correct Credentials",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return
        }
      }).catch(err => console.log(err))
  }
  const handleHome = () => {
    navigate("/")
  }

  return (
    <div className="mainLogin">
      <div className="overlayLogin"></div>
      <video className="videoLogin" src={video1} autoPlay muted loop />
      <div className="containerLogin">
        <form className="formLogin" onSubmit={handelSubmit}>
          <Heading as="h4" size="lg">
            Login
          </Heading>
          &nbsp;&nbsp;
          <FormControl isRequired>
            <FormLabel> Email Address</FormLabel>
            <Input
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </FormControl>
          &nbsp;
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                name="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="password"
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button style={{
            marginBottom: "4px",
            marginRight: "3px",
            padding: "22px 20px",
            backgroundColor: "rgb(253, 101, 54)",
            borderRadius: "10px",
            color: "white"
          }} onClick={handleHome}>Home</Button>
          <input type="submit" value={"Login"} className="signbtn" />
        </form>
      </div>
    </div>
  );
};

export default Login;