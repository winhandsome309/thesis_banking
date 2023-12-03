import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdCheckCircle,
  MdPerson,
  MdHome,
  MdLock,
  MdHourglassTop,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "./views/admin/default";
// import WaitingApp from "./views/admin/marketplace";
import Profile from "./views/admin/profile";
import ProcessedApp from "./views/admin/applications";
// import RTL from "views/admin/rtl";

// Auth Imports
// import SignInCentered from "views/auth/signIn";

const routes = [
  // {
  //   name: "Main Dashboard",
  //   layout: "/admin",
  //   path: "/default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: MainDashboard,
  // },
  {
    name: "Waiting App.",
    layout: "/admin",
    path: "/waiting-app",
    icon: (
      <Icon
        as={MdHourglassTop}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: ProcessedApp,
    // secondary: true,
  },
  {
    name: "Processed App.",
    layout: "/admin",
    icon: <Icon as={MdCheckCircle} width='20px' height='20px' color='inherit' />,
    path: "/processed-app",
    component: ProcessedApp,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },

];

export default routes;
