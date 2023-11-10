import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Button } from "@chakra-ui/react";
import { Authcontext } from "../context/Authcontext";
import {useContext } from "react";

const Navbar = () => {
  const { auth, log, setLog } = useContext(Authcontext);
  const Logout = () => {
    alert("Your Account has been logged out");
    setLog(false);
  };
  return (
    <div>
      <Flex
        marginLeft="10%"
        // margin={"auto"}
        align="center"
        justify="space-between"
        color={"white"}
        padding="1rem"
        bg=""
        width={"90%"}
      >
        <Box display="flex" width="10%">
          <Button
            as={Link}
            to="/"
            variant="ghost"
            mx="0.2rem"
            colorScheme="white"
          >
            <h3>MBALAYANG</h3>
          </Button>
        </Box>

        <Flex>
          <Box margin={"auto"}>
            <Button
              as={Link}
              to="/"
              colorScheme="teal"
              variant="ghost"
              mx="0.5rem"
              textDecoration={"none"}
            >
              Home
            </Button>
            <Button
              as={Link}
              to="/blog"
              colorScheme="teal"
              variant="ghost"
              mx="0.5rem"
              textDecoration={"none"}
            >
              Blog
            </Button>
            <Button
              as={Link}
              to="/services"
              colorScheme="teal"
              variant="ghost"
              mx="0.5rem"
              textDecoration={"none"}
            >
              Services
            </Button>
          </Box>
          {log === false ? (
            <Box>
              <Button
                as={Link}
                to="/signup"
                colorScheme="teal"
                variant="ghost"
                mx="0.5rem"
                textDecoration={"none"}
              >
                Signup
              </Button>
              <Button
                as={Link}
                to="/login"
                colorScheme="teal"
                variant="ghost"
                mx="0.5rem"
                textDecoration={"none"}
              >
                Login
              </Button>
            </Box>
          ) : (
            <Button
              colorScheme="teal"
              variant="ghost"
              mx="0.5rem"
              textDecoration={"none"}
              onClick={Logout}
            >
              Logout
            </Button>
          )}
          {/* <Button as={Link} to="/products" colorScheme='teal' variant="ghost" mx="0.5rem" textDecoration={"none"}>
          Products
        </Button> */}
        </Flex>
        <Flex
          width="25%"
          align="center"
          justify="space-between"
          // flex="Flex-end"
        >
          <Button
            as={Link}
            to="#"
            variant="ghost"
            mx="0.2rem"
            colorScheme="white"
          >
            <h5>CONTACT US</h5>
          </Button>
          {log === true ? (
            <Button
              as={Link}
              to="#"
              variant="outline"
              mx="0.2rem"
              colorScheme="white"
            >
              <h5>{auth.username}</h5>
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </div>
  );
};

export default Navbar;
