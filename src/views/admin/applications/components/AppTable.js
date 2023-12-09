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
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "../../../../components/menu/MainMenu";
import React, { useState, useEffect, useMemo } from "react";
import ResultModel from "./ResultModel";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
import DrawerTable from "./DrawerTable";

export default function AppTable({ props, type }) {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(0);
  const [selectedPage, setSelectedPage] = useState("Applications");
  const [selectedModel, setSelectedModel] = useState("Logistic Regression");

  const handleReload = () => {
    setReload(reload + 1);
  };

  const fetchData = async () => {
    axios
      .get(
        window.link +
          (type === "waiting" ? "/admin/waiting-app" : "/admin/processed-app")
      )
      .then((response) => {
        setData(response.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const [showDrawer, setShowDrawer] = useState(null);
  const { columnsData } = props;
  const columns = useMemo(() => props, [props]);
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
    { bg: "whiteAlpha.50", cursor: "pointer" }
  );
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Flex justify="space-between">
          {/* <Text
            color={textColor}
            fontSize="24px"
            fontWeight="700"
            lineHeight="100%"
          >
            Applications
          </Text> */}
          <FormControl id="page">
            <Select
              width={"142px"}
              value={selectedPage}
              onChange={(e) => {
                setSelectedPage(e.target.value);
              }}
            >
              <option value="Applications">Applications</option>
              <option value="Result Model">Result Model</option>
            </Select>
          </FormControl>
          {selectedPage === "Result Model" && (
            <FormControl id="model">
              <Select
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                }}
              >
                <option value="Logistic Regression">Logistic Regression</option>
                <option value="Random Forest">Random Forest</option>
              </Select>
            </FormControl>
          )}
        </Flex>
        <Menu handleReload={handleReload} />
      </Flex>
      {selectedPage === "Applications" ? (
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="0px">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor={borderColor}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "14px" }}
                      color="gray.400"
                    >
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
                <Tr
                  {...row.getRowProps()}
                  key={index}
                  _hover={bgHover}
                  backgroundColor={index % 2 === 0 && "#fcfafa"}
                >
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "id") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "credit_policy") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "purpose") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "int_rate") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value + "$"}
                        </Text>
                      );
                    } else if (cell.column.Header === "installment") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
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
                    else if (cell.column.Header === "predict_lr") {
                      data = (
                        <Text
                          color={cell.value === 1 ? "#3cf20f" : "red"}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "predict_rf") {
                      data = (
                        <Text
                          color={cell.value === 1 ? "#3cf20f" : "red"}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      );
                    } else if (
                      type === "processed" &&
                      cell.column.Header === "status"
                    ) {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
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
                        borderColor="transparent"
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
      ) : (
        <ResultModel />
      )}
      {showDrawer && (
        <DrawerTable
          handleReload={handleReload}
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          type={type}
        />
      )}
    </Card>
  );
}
