
import { Image, Box, Center, Heading, Text, Stack, Button, Grid, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Hotels({ hotel }) {
  return (
    <Grid templateColumns='repeat(2, 1fr)' gap={6} p={'10px 40px 10px 40px'}>
      {hotel.map((ele, index) => (
        // <Center py={6} key={ele.id}>
        <Box
          border={'1px solid black'}
          width={'40%'}
          w={'full'}
          bg={'white'}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          // overflow={'hidden'}
        >
          <Box h={'400px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
            <Image
              w={'100%'}
              h={'100%'}
              src={ele.image}
              alt={ele.hotel_name}
              // layout={'fill'}
            />
            {/* <Link to='/Details'>
            <Button
              onClick={(e)=>{dispatch(getDetailsData(ele))}}
              position="absolute"
              bottom="-7%"
              right="38%"
              bg="#fb6435"
              color="white"
            >
              Show More
            </Button>
            </Link> */}
          </Box>
          <Stack>
            {/* <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              {ele.category}
            </Text> */}
            <Heading
              color={'gray.700'}
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              {ele.hotel_name}
            </Heading>
            <Text color={'gray.500'}>
              {ele.description}
            </Text>
            <Text color={'gray.500'}>
              {ele.overview}
            </Text>
            <Link to='/address'>
              <Text pr={'300px'} fontWeight={500} color={'orange.500'} textTransform={'uppercase'}>
                Price        : {ele.price_inr} /-
              </Text>
              <Text fontWeight={400} color={'orange.500'} textTransform={'uppercase'}>
                Facilities :  {ele.facilities.map((facility, i) => facility + "") + "."}
              </Text>
              <Button
                pos={'center'}
                mt={'10px'}
                // onClick={(e)=>{dispatch(getDetailsData(ele))}}
                bottom="-7%"
                right="38%"
                bg="#fb6435"
                color="white"
              >
                Book Now
              </Button>
            </Link>
          </Stack>
        </Box>
        // </Center>
      ))}
    </Grid>
  );
}

export default Hotels;
