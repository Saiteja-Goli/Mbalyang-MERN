import {
  FormControl,
  FormLabel,
  HStack,
  InputGroup,
  InputRightElement,
  Heading,
  Input,
  Button,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import video1 from "../assets/video4.mp4";
import { useState } from "react";

// import "./Signup.css"

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const isError = input === "";
  const [state, setState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const handleClick = () => setShow(!show);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      state.name.length != 0 &&
      state.username.length != 0 &&
      state.email.length != 0 &&
      state.password.length > 6
    ) {
      fetch(`https://odd-erin-bat-boot.cyclic.app/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      }).then(res => res.json()).then((data) => {
        setState(data)
        console.log(data)
        alert("SignUp Successfull...Redirecting to Login Page")
        navigate("/login");

      }).catch(err => console.log(err))
    }
    else {
      alert("All fields are compulsory");
    }
  };

  return (

    <div style={mainLogin}>
      <div style={overlayLogin}></div>
      <video style={videoLogin} className="videoLogin" src={video1} autoPlay muted loop />
      <div style={containerLogin}
        className="containerLogin">
        <form style={formLogin} className="formLogin" onSubmit={handleSubmit}>
          <Heading as="h4" size="lg">
            Sign up
          </Heading>
          &nbsp;&nbsp;
          <HStack>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="Enter Name"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>UserName</FormLabel>
              <Input
                placeholder="Enter UserName"
                name="username"
                onChange={handleChange}
              />
            </FormControl>
          </HStack>
          &nbsp;
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              // value={input}
              placeholder="abc@gmail.com"
              onChange={handleChange}
            />
            {!isError ? (
              <FormHelperText>
                Enter the email you'd like to receive the newsletter on.
              </FormHelperText>
            ) : (
              <FormErrorMessage color="black">
                Email is required.
              </FormErrorMessage>
            )}
          </FormControl>
          &nbsp;
          <FormLabel>Password</FormLabel>
          <FormControl isRequired>
            <InputGroup size="md">
              <Input
                name="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="6+characters"
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <input type="submit" value={"Signup"} className="signbtn" />
        </form>
      </div>
    </div>
  );
};

const mainLogin = {
  width: "100%",
  height: "100vh"
}

const overlayLogin = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
}

const videoLogin = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}
const formLogin = {
  width: '35%',
  margin: 'auto',
  padding: '30px',
  borderRadius: '15px',
  backgroundColor: 'white',
}

const containerLogin = {
  position: "absolute",
  top: '0',
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: '100%',
  height: '100%',
}
export default SignUp




