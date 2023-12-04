/* eslint-disable */
import {
  Flex,
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
import Menu from "components/menu/MainMenu";
import React, { useState, useEffect, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
import DrawerTable from "./DrawerTable";

export default function AppTable(props) {

  const [data, setData] = useState([]);

  const [reload, setReload] = useState(0);

  const handleReload = () => {
    setReload(reload + 1);
  };

  const fetchData = async () => {
    axios.get("http://hs-banking.onrender.com/admin/waiting_app")
      .then((response) => {
        setData(response.data);
      });
  }

  useEffect(() => {
    fetchData();
  }, [reload])

  const [showDrawer, setShowDrawer] = useState(null);

  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);

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
  initialState.pageSize = 500;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const handleDrawer = (obj) => {
    setShowDrawer(obj);
  };
  
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400", cursor: "pointer" },
    { bg: "whiteAlpha.50", cursor: "pointer" },
  );
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='24px'
          fontWeight='700'
          lineHeight='100%'>
          Applications
        </Text>
        <Menu handleReload={handleReload} />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='0px'>
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
                    fontSize={{ sm: "10px", lg: "14px" }}
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
              <Tr {...row.getRowProps()} key={index} _hover={bgHover} backgroundColor={index % 2 === 0 && "#fcfafa"}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "id") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "credit_policy") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "purpose") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "int_rate") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value + "$"}
                      </Text>
                    );
                  }
                  else if (cell.column.Header === "installment") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  }
                  // else if (cell.column.Header === "log_annual_inc") {
                  //   data = (
                  //     <Text color={textColor} fontSize='sm' fontWeight='700'>
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // } else if (cell.column.Header === "dti") {
                  //   data = (
                  //     <Text color={textColor} fontSize='sm' fontWeight='700'>
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // } else if (cell.column.Header === "fico") {
                  //   data = (
                  //     <Text color={textColor} fontSize='sm' fontWeight='700'>
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // } else if (cell.column.Header === "days_with_cr_line") {
                  //   data = (
                  //     <Text color={textColor} fontSize='sm' fontWeight='700'>
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // } else if (cell.column.Header === "revol_bal") {
                  //   data = (
                  //     <Text color={textColor} fontSize='sm' fontWeight='700'>
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // } else if (cell.column.Header === "revol_util") {
                  //   data = (
                  //     <Text color={textColor} fontSize='sm' fontWeight='700'>
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // } else if (cell.column.Header === "inq_last_6mths") {
                  //   data = (
                  //     <Text color={textColor} fontSize='sm' fontWeight='700'>
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // } else if (cell.column.Header === "delinq_2yrs") {
                  //   data = (
                  //     <Text color={textColor} fontSize='sm' fontWeight='700'>
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // } else if (cell.column.Header === "pub_rec") {
                  //   data = (
                  //     <Text color={textColor} fontSize='sm' fontWeight='700'>
                  //       {cell.value}
                  //     </Text>
                  //   );
                  // } 
                  else if (cell.column.Header === "not_fully_paid") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "predict") {
                    data = (
                      <Text color={cell.value >= 60 ? '#3cf20f' : 'red'} fontSize='sm' fontWeight='700'>
                        {cell.value + '%'}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'
                      onClick={() => handleDrawer(row.cells)}
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {showDrawer && <DrawerTable handleReload={handleReload} showDrawer={showDrawer} setShowDrawer={setShowDrawer} />}
    </Card>
  );
}
