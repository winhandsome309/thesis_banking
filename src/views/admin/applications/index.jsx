import { Box } from "@chakra-ui/react";
import AppTable from "./components/AppTable";
import {
  columnsDataDevelopment,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import React from "react";

export default function WaitingApp() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>
      <AppTable
        columnsData={columnsDataDevelopment}
        tableData={tableDataDevelopment}
      />
    </Box>
  );
}
