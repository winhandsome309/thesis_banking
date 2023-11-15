// Chakra imports
import React, { useState } from 'react';
import { Portal, Box, useDisclosure, Text, Button, Link } from '@chakra-ui/react';

import Sidebar from '../components/sidebar/Sidebar.js';
import { SidebarContext } from '../contexts/SidebarContext';

import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../routes/routes.js';


export default function Layout(props) {
    const { ...rest } = props;
	const [ toggleSidebar, setToggleSidebar ] = useState(false);
	return (
		<>
		<h1>Hello World</h1>
		<Box>
			<Box>
				<SidebarContext.Provider
					value={{
						toggleSidebar,
						setToggleSidebar
					}}>
					<Sidebar routes={routes} display='none' {...rest} />
					{/* <Box
						float='right'
						minHeight='100vh'
						height='100%'
						overflow='auto'
						position='relative'
						maxHeight='100%'
						w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
						transitionDuration='.2s, .2s, .35s'
						transitionProperty='top, bottom, width'
						transitionTimingFunction='linear, linear, ease'>
						<Portal>
							<Box>
								<Navbar
									onOpen={onOpen}
									logoText={'Horizon UI Dashboard PRO'}
									brandText={getActiveRoute(routes)}
									secondary={getActiveNavbar(routes)}
									message={getActiveNavbarText(routes)}
									fixed={fixed}
									{...rest}
								/>
							</Box>
						</Portal>

						{getRoute() ? (
							<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
								<Switch>
									{getRoutes(routes)}
									<Redirect from='/' to='/admin/default' />
								</Switch>
							</Box>
						) : null}
						<Box>
							<Footer />
						</Box>
					</Box> */}
				</SidebarContext.Provider>
			</Box>
		</Box>
		</>
	);
}
