import React, { useState, useEffect, useRef } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Grid,
  GridItem,
  Text,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  Select,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Center,
} from "@chakra-ui/react";
import { HSeparator } from "../../../../components/separator/Separator";
import axios from "axios";

export default function DrawerTable({
  handleReload,
  showDrawer,
  setShowDrawer,
  type,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef();
  const btnRef = useRef(null);
  const [selectedModel, setSelectedModel] = useState("Linear Regression");
  const [alertSwitch, setAlertSwitch] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(1);

  const toast = useToast();

  const deleteLoan = async (showAlert) => {
    axios
      .post(
        window.link + "/admin/delete/waiting-app",
        {},
        { params: { id: parseInt(showDrawer["id"]) } }
      )
      .then((response) => {
        if (showAlert && response.data === "success") {
          toast({
            title: "Application deleted.",
            description: "We've deleted your loan application for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          handleReload();
        }
      });
  };

  const approveLoan = async () => {
    axios
      .post(
        window.link + "/admin/processed-app",
        {},
        { params: { id: parseInt(showDrawer["id"]) } }
      )
      .then((response) => {
        if (response.data === "success") {
          deleteLoan(false);
          toast({
            title: "Application approved.",
            description: "We've approved your loan application for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          handleReload();
        }
      });
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose();
        setShowDrawer(null);
      }}
      initialFocusRef={btnRef}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Detail Information</DrawerHeader>

        <DrawerBody>
          <Grid
            pt={"20px"}
            templateColumns="repeat(9, 1fr)"
            templateRows="repeat(3, 1fr)"
            gap={3}
          >
            {Object.entries(showDrawer).map(([key, value], index) => {
              return (
                key !== "predict_lr" &&
                key !== "predict_rf" && (
                  <>
                    <GridItem colSpan={4}>
                      <Flex>
                        <Text color={"gray.400"}>{key} :</Text>
                        <Spacer />
                        <Text>{value}</Text>
                      </Flex>
                    </GridItem>
                    {index % 2 === 0 && <GridItem colSpan={1} />}
                  </>
                )
              );
            })}
          </Grid>
          {type === "waiting" && (
            <>
              <Flex pl={"100px"} pr={"100px"} pt={"50px"} pb={"10px"}>
                <HSeparator mb="20px" />
              </Flex>
              <Center pb={"30px"} fontSize={"20px"} color={"blue.500"}>
                Result Of Models
              </Center>
              <Grid
                templateColumns="repeat(9, 1fr)"
                templateRows="repeat(3, 1fr)"
                gap={3}
              >
                {Object.entries(showDrawer).map(([key, value], index) => {
                  return (
                    (key === "predict_lr" || key === "predict_rf") && (
                      <>
                        <GridItem colSpan={4}>
                          <Flex>
                            <Text color={"gray"}>
                              {key === "predict_lr"
                                ? "Logistic Regression"
                                : "Random Forest"}{" "}
                              :
                            </Text>
                            <Spacer />
                            <Text color={value === 1 ? "#3cf20f" : "red"}>
                              {value}
                            </Text>
                          </Flex>
                        </GridItem>
                        {index % 2 === 0 && <GridItem colSpan={1} />}
                      </>
                    )
                  );
                })}
              </Grid>
            </>
          )}
        </DrawerBody>
        {type === "waiting" && (
          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                setConfirmDelete(1);
                setAlertSwitch(0);
                onOpenAlert();
              }}
              colorScheme="red"
            >
              Reject
            </Button>
            <Button
              colorScheme="brand"
              onClick={() => {
                setConfirmDelete(0);
                setAlertSwitch(1);
                onOpenAlert();
              }}
            >
              Approve
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="xl" fontWeight="bold">
              {alertSwitch === 0 ? "Delete Application" : "Approve Application"}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button
                colorScheme={alertSwitch === 0 ? "red" : "blue"}
                onClick={() => {
                  onCloseAlert();
                  onClose();
                  setShowDrawer(null);
                  confirmDelete === 0 ? approveLoan() : deleteLoan(true);
                }}
                ml={3}
              >
                {alertSwitch === 0 ? "Delete" : "Approve"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Drawer>
  );
}
