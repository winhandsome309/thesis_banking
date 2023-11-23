/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import React, { useState, useEffect, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function AppTable(props) {

  const [data, setdata] = useState({
    credit_policy: 0,
    purpose: "",
    int_rate: 0,
    installment:0,
    log_annual_inc: 0,
    dti: 0,
    fico: 0,
    days_with_cr_line: 0,
    revol_bal: 0,
    revol_util: 0,
    inq_last_6mths: 0,
    delinq_2yrs: 0,
    pub_rec: 0,
    not_fully_paid: 0,
  });

  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from 
      // flask server it will be redirected to proxy
      fetch("/admin/waiting_app").then((res) =>
          res.then((data) => {
              // Setting a data from api
              setdata({
                credit_policy: data.credit_policy,
                purpose: data.purpose,
                int_rate: data.int_rate,
                installment: data.installment,
                log_annual_inc: data.log_annual_inc,
                dti: data.dti,
                fico: data.fico,
                days_with_cr_line: data.days_with_cr_line,
                revol_bal: data.revol_bal,
                revol_util: data.revol_util,
                inq_last_6mths: data.inq_last_6mths,
                delinq_2yrs: data.delinq_2yrs,
                pub_rec: data.pub_rec,
                not_fully_paid: data.not_fully_paid,
              });
          })
      );
  }, []);
  
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  // const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Applications
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TECH") {
                    data = (
                      <Flex align='center'>
                        {cell.value.map((item, key) => {
                          if (item === "apple") {
                            return (
                              <AppleLogo
                                key={key}
                                color={iconColor}
                                me='16px'
                                h='18px'
                                w='15px'
                              />
                            );
                          } else if (item === "android") {
                            return (
                              <AndroidLogo
                                key={key}
                                color={iconColor}
                                me='16px'
                                h='18px'
                                w='16px'
                              />
                            );
                          } else if (item === "windows") {
                            return (
                              <WindowsLogo
                                key={key}
                                color={iconColor}
                                h='18px'
                                w='19px'
                              />
                            );
                          }
                        })}
                      </Flex>
                    );
                  } else if (cell.column.Header === "PROGRESS") {
                    data = (
                      <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'>
                          {cell.value}%
                        </Text>
                        <Progress
                          variant='table'
                          colorScheme='brandScheme'
                          h='8px'
                          w='63px'
                          value={cell.value}
                        />
                      </Flex>
                    );
                  } else if (cell.column.Header === "LOAN AMOUNT") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value + "$"}
                      </Text>
                    );
                  } else if (cell.column.Header === "PURPOSE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PREDICT RESULT") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
