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
    Input,
    useDisclosure,
    Grid,
    GridItem,
    Box,
    Text,
    Flex,
    Spacer,
    FormControl,
    FormLabel,
    Select,
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";

export default function DrawerTable({showDrawer, setShowDrawer}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
    const [selectedModel, setSelectedModel] = useState('linear_regression');
    
    useEffect(() => {
        onOpen()
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
            // finalFocusRef={btnRef}
            size="lg"
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Detail Information</DrawerHeader>

            <DrawerBody>
                <Grid templateColumns="repeat(9, 1fr)" templateRows="repeat(4, 1fr)" gap={10} paddingBottom={"0px"}>
                    {showDrawer.map((cell, index) => {
                            return (
                                <>
                                <GridItem colSpan={4}>
                                    <Flex>
                                        <Text color={"gray.400"}>
                                            {cell.column.Header}
                                        </Text>
                                        <Spacer/>
                                        <Text>
                                            {cell.value}
                                        </Text>
                                    </Flex>
                                </GridItem>
                                {index % 2 === 0 && <GridItem colSpan={1}/>}
                                </>
                            )
                        }
                    )}
                </Grid>
                <DrawerHeader>Prediction</DrawerHeader>

                <FormControl id="model" paddingBottom="40px">
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
                    onClose();
                    setShowDrawer(null);
                }} colorScheme="red">
                    Reject
                </Button>
                <Button colorScheme="brand">Approve</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}