// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar.jpg";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Banner
        gridArea='1 / 1 / 2 / 2'
        banner={banner}
        avatar={avatar}
        name='Thang Nguyen'
        job='Software Engineer'
        posts='17'
        followers='9.7k'
        following='274'
      />
      <General
          minH='365px'
          pe='20px'
        />
    </Box>
  );
}
