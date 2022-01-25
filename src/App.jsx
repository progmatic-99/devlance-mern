import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: null,
    password: "",
    address: "",
    gender: "",
    username: "",
    userImg: "",
  });

  const fetchUser = async () => {
    try {
      const res = await fetch("https://randomuser.me/api");
      const data = await res.json();
      const userData = data.results[0];

      setUser({
        name: `${userData.name.first} ${userData.name.last}`,
        gender: userData.gender,
        email: userData.email,
        dob: userData.dob.date,
        password: userData.login.password,
        username: userData.login.username,
        address: `${userData.location.street.number}, ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state}, ${userData.location.country}`,
        userImg: userData.picture.large,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container maxW="container.md" p={0}>
      <Flex h="100vh" direction={["column", "column", "row", "row"]}>
        <VStack align="flex-start" w="full" h="full" p={15} spacing={6}>
          <Image
            borderRadius="full"
            boxSize="80px"
            alignSelf="center"
            style={{ border: "1px solid #319795" }}
            src={user.userImg}
            alt={user.name}
          />
          <Divider borderColor="teal" />
          {Object.keys(user).map((key, _) => {
            if (key !== "userImg") {
              return (
                <HStack>
                  <Heading size="sm">{key.toUpperCase()}:</Heading>
                  <Text>{user[key]}</Text>
                </HStack>
              );
            }
          })}
          <Divider borderColor="teal" />
          <Button
            alignSelf="center"
            colorScheme="teal"
            variant="solid"
            onClick={fetchUser}
          >
            Fetch new user!!
          </Button>
        </VStack>
      </Flex>
    </Container>
  );
}

export default App;
