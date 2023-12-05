import { Box } from "@chakra-ui/react";
import AppTable from "./components/AppTable";
import {
  columnsDataWaitingLoan,
} from "./variables/columnsDataWaitingLoan";
import {
  columnsDataProcessedLoan,
} from "./variables/columnsDataProcessedLoan";
import React from "react";

export default function WaitingApp({ type }) {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>
      <AppTable
        props={type === "waiting" ? columnsDataWaitingLoan : columnsDataProcessedLoan}
        type={type}
      />
    </Box>
  );
}
