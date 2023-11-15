import React from "react";

import { Icon } from "@chakra-ui/react";
import AdminLayout from '../layouts';
import {
    MdBarChart,
    MdPerson,
    MdHome,
    MdLock,
    MdOutlineShoppingCart,
  } from "react-icons/md";

const routes = [
    {
      name: "Main Dashboard",
      layout: "/",
      path: "/",
      icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
      component: AdminLayout,
    },
    
  ];
  
  export default routes;