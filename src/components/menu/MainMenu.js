import React from "react";
import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,

} from "@chakra-ui/react";

export default function Banner(props) {
  const { ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [form, setForm] = useState({
    "credit_policy": 0,
    "purpose": "",
    "int_rate": 0,
    "installment": 0,
    "log_annual_inc": 0,
    "dti": 0,
    "fico": 0,
    "days_with_cr_line": 0,
    "revol_bal": 0,
    "revol_util": 0,
    "inq_last_6mths": 0,
    "delinq_2yrs": 0,
    "pub_rec": 0
  });

  return (
    <>
      <Button
        align='center'
        justifyContent='center'
        variant="brand"
        lineHeight='100%'
        borderRadius='10px'
        onClick={onOpen}
        {...rest}>
        Create new App.
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={2} spacing={5}>
              <FormControl mt={4}>
                <FormLabel>Credit Policy</FormLabel>
                <Select placeholder='Select option' onChange={(event) => setForm({ ...form, credit_policy: parseInt(event.target.value) })}>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Purpose</FormLabel>
                <Select placeholder='Select option' onChange={(event) => setForm({ ...form, purpose: event.target.value })}>
                  <option value='major_purchase'>Major purchase</option>
                  <option value='debt_consolidation'>Debt consolidation</option>
                  <option value='credit_card'>Credit card</option>
                  <option value='home_improvement'>Home improvement</option>
                  <option value='small_business'>Small business</option>
                  <option value='educational'>Educational</option>
                  <option value='all_other'>All other...</option>
                </Select>
              </FormControl>
              {/* <SimpleGrid columns={2} spacing={5}> */}
              <FormControl mt={4} onChange={(event) => setForm({ ...form, int_rate: parseFloat(event.target.value) })}>
                <FormLabel>Int Rate</FormLabel>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, installment: parseFloat(event.target.value) })}>
                <FormLabel>Installment</FormLabel>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, log_annual_inc: parseFloat(event.target.value) })}>
                <FormLabel>Log Annual Inc</FormLabel>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, dti: parseFloat(event.target.value) })}>
                <FormLabel>DTI</FormLabel>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, fico: parseFloat(event.target.value) })}>
                <FormLabel>FICO</FormLabel>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, days_with_cr_line: parseFloat(event.target.value) })}>
                <FormLabel>Days With Cr Line</FormLabel>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, revol_util: parseFloat(event.target.value) })}>
                <FormLabel>Revol Util</FormLabel>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, inq_last_6mths: parseInt(event.target.value) })}>
                <FormLabel>Inq Last 6 months</FormLabel>
                <Select placeholder='Select option'>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, delinq_2yrs: parseInt(event.target.value) })}>
                <FormLabel>Delinq 2 years</FormLabel>
                <Select placeholder='Select option'>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, pub_rec: parseInt(event.target.value) })}>
                <FormLabel>Pub Rec</FormLabel>
                <Select placeholder='Select option'>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </FormControl>
            </SimpleGrid>


          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="brand" mr={3} ml={3} onClick={() => { console.log(form); }}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
