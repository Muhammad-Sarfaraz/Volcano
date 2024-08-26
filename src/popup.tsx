import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { googleApi } from "./Api/googleApi";
import {
  Box,
  Text,
  Button,
  Center,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Spinner,
  Stack,
  CloseButton,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { AddIcon, CheckIcon, WarningTwoIcon } from "@chakra-ui/icons";

const Popup = () => {
  const [apiKey, setApiKey] = useState("");
  const [agent, setAgent] = useState("OPEN_AI");
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("INITIAL_PAGE");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(["apiKey"], (result) => {
      setApiKey(result.apiKey || "");
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const storeAPIKey = () => {
    chrome.storage.sync.set({
      agent: "OPEN_AI",
      apiKey: apiKey,
    });

    testConnection(apiKey);
    setApiKey(apiKey);
  };

  const testConnection = (apiKey: string) => {
    setIsBtnLoading(true);
    googleApi("Hi, How Are You?", apiKey)
      .then((res) => {
        setIsSuccess(true);
        console.log("Test Connection", res);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsBtnLoading(false);
      });
  };

  const closePopUp = () => {
    window.close();
  };

  const InitialPage: React.FC = () => {
    return (
      <>
        <Center style={{ margin: "40px" }}>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <>
              <Stack spacing={1}>
                <Heading size="md" as="h4" ml={8}>
                  Welcome to Volcano
                </Heading>
                <Text fontSize="md">
                  Please, Add your API key to get started.{" "}
                </Text>
                <Button
                  mt={4}
                  colorScheme="gray"
                  onClick={() => setCurrentPage("ADD_API_KEY_PAGE")}
                >
                  <AddIcon boxSize={3} mr={2} /> API Key
                </Button>
              </Stack>
            </>
          )}
        </Center>
      </>
    );
  };

  const SuccessPage: React.FC = () => {
    return (
      <Center style={{ margin: "40px" }}>
        <CheckIcon color={"green.500"} boxSize={6} mr={2} />
        <Heading size="md" as="h4">
          Success
        </Heading>
        <Button>Home</Button>
      </Center>
    );
  };

  const ErrorPage: React.FC = () => {
    return (
      <Center style={{ margin: "40px" }}>
        <WarningTwoIcon color={"red.500"} boxSize={6} mr={2} />
        <Heading size="md" as="h4">
          Error
        </Heading>
        Something went wrong, Please try again!
        <Button>Back</Button>
      </Center>
    );
  };

  const AddApiKeyPage: React.FC = () => {
    return (
      <>
        <FormControl mb={4} mt={2}>
          <FormLabel>Agent Type</FormLabel>
          <Select
            placeholder="Select option"
            onChange={(e) => setAgent(e.target.value)}
          >
            <option value="OPEN_AI">Open AI</option>
            <option value="GOOGLE_AI">Google AI</option>
          </Select>
          <FormLabel>API Key</FormLabel>
          <Input
            type="text"
            placeholder="Enter API Key"
            onChange={(e) => setApiKey(e.target.value)}
          />

          <Button
            mt={4}
            disabled={isBtnLoading}
            colorScheme="blue"
            onClick={storeAPIKey}
          >
            {isBtnLoading ? (
              <>
                <Spinner size={"xs"} mr={2} /> Loading
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </FormControl>
      </>
    );
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div>
            <Heading as="h6" size="xs">
              Volcano: Your AI Assistant
            </Heading>
          </div>
          <div className="closeIcon" onClick={closePopUp}>
            <CloseButton />
          </div>
        </div>
        <div className="content">
          <Container>
            {isError ? (
              <ErrorPage />
            ) : isSuccess ? (
              <SuccessPage />
            ) : (
              <>
                {currentPage && currentPage === "INITIAL_PAGE" && (
                  <InitialPage />
                )}

                {currentPage && currentPage === "ADD_API_KEY_PAGE" && (
                  <AddApiKeyPage />
                )}
              </>
            )}

            {/* <SuccessPage /> */}
          </Container>

          {/* <Container maxW="container.lg" >




</Container> */}

          {/* <div style={{ minWidth: "200px" }}>
  <ul>
    <li>Your API Key: {apiKey}</li>
    
    <input
      type="text"
      onChange={(e) => setApiKey(e.target.value)}
      placeholder="Enter your API key"
      style={{ marginBottom: "10px" }}
    />

    <select style={{ marginBottom: "10px" }} >
      <option value="">Select an Option</option>
      <option value="gpt_gemini">GPT Gemini</option>
      <option value="pen_ai">Pen AI</option>

    </select>



  </ul>
</div> */}
        </div>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Popup />
    </ChakraProvider>
  </React.StrictMode>
);
