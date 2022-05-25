import logo from "./avalancheLogo.jpg";
import React, { useState } from "react";
import "./App.css";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Button, Box, Heading, Alert, AlertIcon } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Center,
} from "@chakra-ui/react";

const LogoutButton = () => {
  const { logout, isAuthenticating } = useMoralis();

  return (
    <Button
      display={"block"}
      colorScheme="red"
      variant="solid"
      isLoading={isAuthenticating}
      onClick={() => logout()}
      disabled={isAuthenticating}
    >
      Logout
    </Button>
  );
};

// ------- Render balance Tables --------
const displayContractsCreated = (tokenData) => {
  return (
    <div style={{}}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Creator</Th>
            <Th>Contract Address</Th>
            <Th>Edition ID</Th>
            <Th>Edition Size</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokenData.length !== 0 ? (
            tokenData.map((element, i) => {
              return (
                <React.Fragment key={i}>
                  <Tr>
                    <Td>{element.get("editionContractAddress")}</Td>                    <Td>{element.get("creator")}</Td>
                    <Td>{element.get("creator")}</Td>;
                    <Td>{element.get("editionSize")}</Td>;
                    <Td>{element.get("editionId")}</Td>
                  </Tr>
                </React.Fragment>
              );
            })
          ) : (
            <Tr>
              <Td></Td>
              <Td>No Transactions</Td>
              <Td></Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
};

// ---------- APP -------------
function App() {
  const { authenticate, isAuthenticated, Moralis } = useMoralis();

  const { data, error, isLoading } = useMoralisQuery(
    "dFactory",
    (query) => query.limit(1000),
    [10],
    {
      live: true,
    }
  );

  //----------------- Setting User in state   ----------
  const [openModel, setOpenModel] = useState(false);

  //if chain is changed let the user know
  Moralis.onChainChanged(async function (chain) {
    if (chain !== "4") {
      setOpenModel(true);
    } else {
      setOpenModel(false);
    }
  });

  // ----- Authenticate in Metamask---------
  if (!isAuthenticated) {
    return (
      <Container maxW="container.lg">
        {openModel && (
          <Alert status="error">
            <AlertIcon />
            Please switch to Rinkeby Network
          </Alert>
        )}
        <Center>
          <img width={500} height={500} src={logo} alt="logo" />
        </Center>
        <br />
        <Center>
          <Heading as="h3" size="3xl" p={10}>
            Event Log: Deployed Contracts
          </Heading>
        </Center>
        <Center>
          <Button colorScheme="green" size="lg" onClick={() => authenticate()}>
            Sign in using Metamask
          </Button>
        </Center>
      </Container>
    );
  }

  return (
    <Box display={"block"} p={35} className="App">
      {openModel && (
        <Alert status="error">
          <AlertIcon />
          Switch to Rinkeby Network
        </Alert>
      )}
      <LogoutButton />
      <Center>
        <img width={500} height={500} src={logo} alt="logo" />
      </Center>
      <Center>
        <Heading as="h3" size="3xl" p={10}>
          Event Log
        </Heading>
      </Center>
      {/* -------------Contracts------------ */}
      <Center>
        {!isLoading && data !== null ? (
          displayContractsCreated(data)
        ) : (
          <p>Loading</p>
        )}
      </Center>
    </Box>
  );
}

export default App;
