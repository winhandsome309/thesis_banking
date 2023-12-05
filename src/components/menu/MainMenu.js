import React from "react";
import { useState, useEffect } from "react";

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
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

export default function Banner({handleReload}) {
  const { ...rest } = {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [form, setForm] = useState({
    "id": 0,
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

  const toast = useToast();

  const fetchDataCurrentId = async () => {
    axios.get(window.link + "/admin/get-current-id")
    .then((response) => {
      setForm({ ...form, id: parseInt(response.data + 1)});
    });
  }

  const handleCreate = async () => {
    axios.post(window.link + "/admin/waiting_app", {
      title: "Create new Application",
      body: form,
    })
      .then((response) => {
        onClose();
        if (response.data === 'success') {
          toast({
            title: 'Application created.',
            description: "We've created your loan application for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
        handleReload();
      });
  }

  return (
    <>
      <Button
        align='center'
        justifyContent='center'
        variant="brand"
        lineHeight='100%'
        borderRadius='10px'
        onClick={() => {
          onOpen();
          fetchDataCurrentId();
        }}
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
          <ModalHeader>Create new App</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={2} spacing={5}>
              <FormControl mt={4}>
                <Tooltip label='1 nếu khách hàng đáp ứng các tiêu chí đánh giá rủi ro tín dụng; 0 nếu không'>
                  <FormLabel>Credit Policy</FormLabel>
                </Tooltip>
                <Select placeholder='Select option' onChange={(event) => setForm({ ...form, credit_policy: parseInt(event.target.value) })}>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <Tooltip label='Mục đích của khoản vay'>
                  <FormLabel>Purpose</FormLabel>
                </Tooltip>
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
                <Tooltip label='Lãi suất của khoản vay'>
                  <FormLabel>Interest Rate</FormLabel>
                </Tooltip>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, installment: parseFloat(event.target.value) })}>
                <Tooltip label='Số tiền trả góp hàng tháng mà người vay phải trả nếu khoản vay được chấp thuận'>
                  <FormLabel>Installment</FormLabel>
                </Tooltip>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, log_annual_inc: parseFloat(event.target.value) })}>
                <Tooltip label='Logarit tự nhiên về thu nhập hàng năm tự báo cáo của người vay'>
                  <FormLabel>Log Annual Income</FormLabel>
                </Tooltip>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, dti: parseFloat(event.target.value) })}>
                <Tooltip label='Tỷ lệ nợ trên thu nhập của người đi vay (số nợ chia cho thu nhập hàng năm)'>
                  <FormLabel>Debt To Income (DTI)</FormLabel>
                </Tooltip>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, fico: parseFloat(event.target.value) })}>
                <Tooltip label='Điểm tín dụng FICO của người đi vay là một loại điểm tín dụng của người vay mà người cho vay sử dụng để đánh giá rủi ro tín dụng và xác định xem có nên chấp nhận việc cấp tín dụng hoặc gia hạn tín dụng hay không.'>
                  <FormLabel>Fair Isaac Corporation (FICO)</FormLabel>
                </Tooltip>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, days_with_cr_line: parseFloat(event.target.value) })}>
                <Tooltip label='Số ngày người vay đã có 1 hạn mức tín dụng (hạn mức tín dụng là số tiền tối đa mà các tổ chức tín dụng có thể cho khách hàng của mình vay trong một thời điểm nhất định).'>
                  <FormLabel>Days With Credit Line</FormLabel>
                </Tooltip>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, revol_bal: parseFloat(event.target.value) })}>
                <Tooltip label='Số dư quay vòng của người vay (số tiền chưa thanh toán vào cuối kỳ thanh toán trước của thẻ tín dụng).'>
                  <FormLabel>Revolving Balance</FormLabel>
                </Tooltip>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, revol_util: parseFloat(event.target.value) })}>
                <Tooltip label='Tỷ lệ sử dụng hạn mức tín dụng quay vòng của người vay (số tiền hạn mức tín dụng được sử dụng so với tổng tín dụng hiện có). Đó là một phép tính đại diện cho tổng số nợ mà người vay đang sử dụng so với tổng tín dụng quay vòng mà họ được các tổ chức phát hành tín dụng chấp nhận.'>
                  <FormLabel>Revolving Utilization</FormLabel>
                </Tooltip>
                <NumberInput>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, inq_last_6mths: parseInt(event.target.value) })}>
                <Tooltip label='Số lượng người vay được chủ nợ hỏi thăm trong 6 tháng qua.'>
                  <FormLabel>Inquiries Last 6 months</FormLabel>
                </Tooltip>
                <Select placeholder='Select option'>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, delinq_2yrs: parseInt(event.target.value) })}>
                <Tooltip label='Số lần người vay đã quá hạn thanh toán hơn 30 ngày trong 2 năm qua.'>
                  <FormLabel>Delinquent 2 years</FormLabel>
                </Tooltip>
                <Select placeholder='Select option'>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </FormControl>
              <FormControl mt={4} onChange={(event) => setForm({ ...form, pub_rec: parseInt(event.target.value) })}>
                <Tooltip label='Số lượng hồ sơ công khai xúc phạm của người vay.'>
                  <FormLabel>Public Record</FormLabel>
                </Tooltip>
                <Select placeholder='Select option'>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </FormControl>
            </SimpleGrid>


          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="brand" mr={3} ml={3} onClick={() => {
              handleCreate();
            }}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
