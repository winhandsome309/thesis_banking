import React from "react";
import { Link } from 'react-router-dom';
import { Flex, Image } from "@chakra-ui/react";
import { HSeparator } from "../../separator/Separator";
import Logo from "assets/img/logo-no-background.png";

export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
      <Link to="/admin/waiting_app">
        <Image h='60px' w='190px' src={Logo} mb='40px' mt="30px" />
      </Link>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
