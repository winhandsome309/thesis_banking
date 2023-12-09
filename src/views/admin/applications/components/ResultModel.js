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
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
import DrawerTable from "./DrawerTable";

export default function ResultModel({ props, type }) {
  return (
    <>
      <Text>Thang</Text>
      <Text>Thang</Text>
    </>
  );
}
