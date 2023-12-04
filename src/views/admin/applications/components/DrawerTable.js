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
    AlertDialogCloseButton,
} from "@chakra-ui/react";

import axios from "axios";

export default function DrawerTable({ handleReload, showDrawer, setShowDrawer }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
    const cancelRef = useRef()
    const btnRef = useRef(null);
    const [selectedModel, setSelectedModel] = useState('Linear Regression');

    const toast = useToast();

    const fetchDataCurrentId = async () => {
        axios.post("https://hs-banking.onrender.com/admin/delete/waiting-app", {}, { params: { id: parseInt(showDrawer[0].value) } })
            .then((response) => {
                if (response.data === 'success') {
                    toast({
                        title: 'Application deleted.',
                        description: "We've deleted your loan application for you.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    handleReload();
                }
            });
    }

    useEffect(() => {
        onOpen();
    }, [])

    const onSubmit = data => console.log(data);
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
                    <Grid templateColumns="repeat(9, 1fr)" templateRows="repeat(3, 1fr)" gap={2} paddingBottom="20px">
                        {showDrawer.map((cell, index) => {
                            return (
                                <>
                                    <GridItem colSpan={4}>
                                        <Flex>
                                            <Text color={"gray.400"}>
                                                {cell.column.Header} :
                                            </Text>
                                            <Spacer />
                                            <Text>
                                                {cell.value}
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                    {index % 2 === 0 && <GridItem colSpan={1} />}
                                </>
                            )
                        }
                        )}
                    </Grid>
                    <DrawerHeader>Prediction</DrawerHeader>

                    <FormControl id="model" paddingBottom="20px">
                        <FormLabel>Model</FormLabel>
                        <Select placeholder="Select model" value={selectedModel} onChange={e => {
                            setSelectedModel(e.target.value)

                        }}>
                            <option value="Linear Regression">Linear Regression</option>
                            <option value="Logistic Regression">Logistic Regression</option>
                            <option value="Random Forest">Random Forest</option>
                        </Select>
                    </FormControl>

                    <DrawerHeader paddingBottom="10px">Result of {selectedModel}</DrawerHeader>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={() => {
                        onOpenAlert();
                    }} colorScheme="red">
                        Reject
                    </Button>
                    <Button colorScheme="brand">Approve</Button>
                </DrawerFooter>
            </DrawerContent>
            <AlertDialog
                isOpen={isOpenAlert}
                leastDestructiveRef={cancelRef}
                onClose={onCloseAlert}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Application
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseAlert}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                onCloseAlert();
                                onClose();
                                setShowDrawer(null);
                                fetchDataCurrentId();
                            }} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Drawer>
    )
}