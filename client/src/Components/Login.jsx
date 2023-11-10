import React from "react";
import {
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import video1 from "../assets/video4.mp4";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const handleClick = () => setShow(!show);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    fetch(`https://odd-erin-bat-boot.cyclic.app/user/login`, {
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
          alert("Login Successfull.Redirecting to HomePage")
          navigate("/")
        } else {
          alert("Please Enter Correct Credentials")
          return
        }
      }).catch(err => console.log(err))
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
          <input type="submit" value={"Login"} className="signbtn" />
        </form>
      </div>
    </div>
  );
};

export default Login;