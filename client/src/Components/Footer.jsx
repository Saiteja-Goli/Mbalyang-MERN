import React from "react";
import { Box, Flex, Link, Text, Input, Button, IconButton } from "@chakra-ui/react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillMail,
} from "react-icons/ai";

const Footer = () => {
  return (
    <Box
      as="footer"
      borderRadius={30}
      py={4}
      bg="teal.900"
      color="white"
      width="90%"
      margin="auto"
      marginTop={30}
    >
      <Flex justify="center" mb={4}>
        <IconButton
          colorScheme="orange"
          as={Link}
          href="https://www.facebook.com/mbalayang"
          aria-label="Facebook"
          icon={<AiFillFacebook />}
          mx={2}
        />
        <IconButton
          colorScheme="orange"
          as={Link}
          href="https://www.instagram.com/mbalayang"
          aria-label="Instagram"
          icon={<AiFillInstagram />}
          mx={2}
        />
        <IconButton
          colorScheme="orange"
          as={Link}
          href="https://www.twitter.com/mbalayang"
          aria-label="Twitter"
          icon={<AiFillTwitterCircle />}
          mx={2}
        />
        <IconButton
          colorScheme="orange"
          as={Link}
          href="mailto:info@mbalayang.com"
          aria-label="Email"
          icon={<AiFillMail />}
          mx={2}
        />
      </Flex>
      <Flex justify="center" mb={4}>
        <Text fontSize="sm">&copy; {new Date().getFullYear()} MBALAYANG</Text>
      </Flex>
      <Flex justify="center" mb={4}>
        <Link mx={2} href="/" color="teal.200">
          Home
        </Link>
        <Link mx={2} href="/about" color="teal.200">
          About
        </Link>
        <Link mx={2} href="/destinations" color="teal.200">
          Destinations
        </Link>
        <Link mx={2} href="/contact" color="teal.200">
          Contact
        </Link>
      </Flex>
      <Flex justify="center">
        <Box>
          <Text mb={2} color="teal.200">
            Subscribe to our newsletter for offers:
          </Text>
          <Flex alignItems="center">
            <Input
              placeholder="Enter your email"
              mr={2}
              bg="teal.800"
              color="white"
            />
            <Button colorScheme="orange" size="md">
              Subscribe
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
