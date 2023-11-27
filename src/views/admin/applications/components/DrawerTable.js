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
} from "@chakra-ui/react";

import React, { useState, useEffect, useRef } from "react";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

export default function DrawerTable({showDrawer, setShowDrawer}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
    
    useEffect(() => {
        onOpen()
    }, [])

    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);

    const { control, handleSubmit } = useForm({
        defaultValues: {
          firstName: '',
          select: {}
        }
      });
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
            size="sm"
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Detail Information</DrawerHeader>

            <DrawerBody>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingBottom={"10px"}>
                    <Text w="100%">
                        credit_policy: {showDrawer[1].value}
                    </Text>
                    <Text w="100%">
                        purpose: {showDrawer[2].value}
                    </Text>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingBottom={"10px"}>
                    <Text w="100%">
                        Thang
                    </Text>
                    <Text w="100%">
                        Thang
                    </Text>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingBottom={"10px"}>
                    <Text w="100%">
                        Thang
                    </Text>
                    <Text w="100%">
                        Thang
                    </Text>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingBottom={"10px"}>
                    <Text w="100%">
                        Thang
                    </Text>
                    <Text w="100%">
                        Thang
                    </Text>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingBottom={"10px"}>
                    <Text w="100%">
                        Thang
                    </Text>
                    <Text w="100%">
                        Thang
                    </Text>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingBottom={"10px"}>
                    <Text w="100%">
                        Thang
                    </Text>
                    <Text w="100%">
                        Thang
                    </Text>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingBottom={"10px"}>
                    <Text w="100%">
                        Thang
                    </Text>
                    <Text w="100%">
                        Thang
                    </Text>
                </Grid>
            </DrawerBody>

            <DrawerFooter>
                <Button variant="outline" mr={3} onClick={() => {
                    onClose();
                    setShowDrawer(null);
                }}>
                Cancel
                </Button>
                <Button colorScheme="brand">Save</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}