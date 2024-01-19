
import {
  Input,
  Stack,
  Grid,
  Box,
  Flex,
  Select,
  Image, Text,
  Spinner, GridItem,
  Heading,
  Button,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import Footer from './Footer';
import { Link } from 'react-router-dom';


const Services = () => {
  const [Hotel, setHotel] = useState([])
  const [Ele, setEle] = useState([])
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newHotelData, setNewHotelData] = useState({
    hotel_name: "",
    description: "",
    image: "",
    price_inr: "",
    facilities: [],
    overview: ""
  });

  const toast = useToast()
  // -----------------------------------------------------------------------------------------------------------------------------------
  let token = JSON.parse(localStorage.getItem("token"))
  // Fetching Hotels
  const fetchData = async () => {
    await fetch(`https://mbalyang-backend-code.onrender.com/hotel`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(res => res.json())
      .then((data) => {
        console.log(data)
        setHotel(data);
        setEle(data);
      });

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      if (seconds === 2) {
        clearInterval(interval);
        setIsActive(false);
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  // Sorting by Price
  function handleSorting(e) {
    if (e === "lth") {
      const sortedData = [...Hotel].sort((a, b) => a.price_inr - b.price_inr);
      setEle(sortedData);
    } else if (e === "htl") {
      const sortedData = [...Hotel].sort((a, b) => b.price_inr - a.price_inr);
      setEle(sortedData);
    } else {
      setEle(Hotel);
    }
  }


  function handleInputChange(event) {
    if (event.target.name === "facilities") {
      const facilitiesArray = event.target.value.split(",").map(facility => facility.trim());
      setNewHotelData({
        ...newHotelData,
        facilities: facilitiesArray,
      });
    } else {
      setNewHotelData({
        ...newHotelData,
        [event.target.name]: event.target.value,
      });
    }
  }
  // Adding Hotel
  function handleSubmit(event) {
    event.preventDefault();
    const newHotel = {
      ...newHotelData
    };

    fetch("https://mbalyang-backend-code.onrender.com/hotel/hotelpost", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newHotel)
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setHotel([...Hotel, newHotel]);
        setEle([...Ele, newHotel]);
        setNewHotelData({
          hotel_name: "",
          description: "",
          image: "",
          price_inr: "",
          facilities: [],
          overview: ""
        });
        toast({
          title: 'Added',
          description: "Hotel Added successfully",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        setShowForm(false);
      })
      .catch(error => {
        console.error(error);
      });
  }
  // Deleting Hotel
  const handleDelete = (id) => {
    console.log(id)
    fetch(`https://mbalyang-backend-code.onrender.com/hotel/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then((e) => {
        setEle(Ele => Ele.filter(ele => ele._id !== id));
        setHotel(Hotel => Hotel.filter(ele1 => ele1._id !== id));
        toast({
          title: 'Deleted',
          description: "Hotel deleted successfully",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        fetchData();
      })
      .catch(err => {
        console.log("error while deleting");
        console.log(err);
      });
  };

  // -----------------------------------------------------------------------------------------------------------------------------------

  if (!token) {
    return (
      <>
        <Navbar />
        <Heading>Please Login</Heading>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <div>
        <Navbar />
        <Stack alignItems="center" >
          <Flex w={"20%"} pt={"1%"} pb={5}>
            <Select
              textAlign={"center"}
              onChange={(e) => {
                handleSorting(e.target.value);
              }}
              pr={"1%"}
            >
              <option value={""}>Sort by Price</option>
              <option value={"lth"}>Low to High</option>
              <option value={"htl"}>High to Low</option>
            </Select>
          </Flex>
          <Button onClick={() => setShowForm(true)}>Add Hotel</Button>
        </Stack>

        {
          showForm && (
            <Box width={'30%'} p={2} margin="15px auto" boxShadow='outline' rounded='md'>
              <form onSubmit={handleSubmit} >
                <Input
                  type="text"
                  name="hotel_name"
                  placeholder="Hotel Name"
                  value={newHotelData.hotel_name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={newHotelData.description}
                  onChange={handleInputChange} required
                />
                <Input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={newHotelData.image} required
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  name="overview"
                  placeholder="overview"
                  value={newHotelData.overview} required
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  name="price_inr"
                  placeholder="price"
                  value={newHotelData.price_inr}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text" required
                  name="facilities"
                  placeholder="facilities"
                  value={newHotelData.facilities}
                  onChange={handleInputChange}
                />
                <Button type="submit" mt="10px">Submit</Button>
              </form></Box>
          )}
      </div>

      <Grid templateColumns='repeat(2, 1fr)' gap={6} p={10}>
        {
          Ele.length > 0 ? (
            Ele.map((ele, index) => {
              return (
                <GridItem key={index} width={'40%'} w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'md'} p={6}>

                  <Box h={'400px'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                    <Image w={'100%'} h={'90%'} src={ele.image} alt={ele.hotel_name} />
                  </Box>
                  <Stack>
                    <Heading color={'gray.700'} mb={'20px'} mt={'-20px'} fontSize={'3xl'} fontFamily={'body'}>{ele.hotel_name}</Heading>
                    <Text color={'gray.500'}
                      fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='xs'
                      textTransform='uppercase'
                      ml='2'>{ele.description}</Text>
                    <Text color={'gray.500'}
                      fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='xs'
                      textTransform='uppercase'>{ele.overview}</Text>
                    <Text color={'orange.500'} fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='l'
                      textTransform='uppercase'>Price : {ele.price_inr} /-</Text>
                    <Text color={'gray'} fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='l'
                      textTransform='uppercase'>Facilities : {Array.isArray(ele.facilities) ? ele.facilities.map((facility, i) => facility + "") : ""}</Text>
                  </Stack>
                  <Link to='/address'>
                    <Button pos={'center'} mt={'10px'} bottom="-7%" right="38%" bg="#fb6435" color="white">Book Now</Button>
                  </Link>
                  <Button colorScheme='teal' variant='outline' pos={'center'} mt={'10px'} ml={'10px'} bottom="-7%" right="38%"
                    onClick={() => handleDelete(ele._id)}>Delete</Button>
                </GridItem>
              );
            })
          )
            : isActive === true ? (
              <Spinner
                ml={"663"} alignSelf={"center"} />
            ) : (
              <Heading margin={"20%"} alignSelf={"center"}>
                Not found
              </Heading>
            )}
      </Grid>

      <Footer />
    </div>
  );
}

export default Services;
