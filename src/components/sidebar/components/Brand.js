import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Image } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "../../separator/Separator";

import Logo from "assets/img/logo-no-background.png";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <Image h='50px' w='170px' src={Logo} mb='18px' />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
