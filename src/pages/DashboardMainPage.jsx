import React, { useState } from 'react';
import { styled, useTheme, Box, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, Container, IconButton, Stack, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import { BsGrid } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { Toolbar, Tooltip, Avatar, Button, Menu, MenuItem } from '@mui/material';

import { IoMenu } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";;
import { TiArrowSortedDown } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";

import { Switch, Route, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import { useSelector } from 'react-redux';

import Dashboard from './Dashboard';
import EmployeeDetail from './EmployeeDetail';
import ChangePassword from '../models/ChangePassword';
import JobCategory from './JobCategory';

import AppLogo from '../assets/images/AppLogo.jpg'

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    // width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: {
      width: 57,
    },
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const DashboardMainPage = () => {

  const theme = useTheme();
  const history = useHistory();
  const { pathname } = useLocation();

  const loginData = useSelector(state => state.loginData);

  // console.log(loginData);

  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [changePassModelOpen, setChangePassModelOpen] = useState(false);

  const handleDrawer = () => setOpen(prev => !prev);

  const sideBar = [
    {
      name: 'Dashboard',
      icon: <BsGrid size={20} className='primary-color' />,
      path: '/dashboard'
    },
    {
      name: 'Employee',
      icon: <HiUserGroup size={20} className='primary-color' />,
      path: '/dashboard/employeedetails'
    },
    {
      name: 'JobCategory',
      icon: <MdOutlineCategory size={20} className='primary-color' />,
      path: '/dashboard/jobcategory'
    }
  ]


  const isProfileMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      keepMounted
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
      // onClick={handleProfileMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}

    >

      <MenuItem disableRipple className='userInfo-li' sx={{ cursor: 'default', color: 'rgba(0,0,0,0.7)' }}>
        <ListItemIcon>
          <FaRegUser size={20} className='primary-color' />
        </ListItemIcon>
        <Typography variant='h6' sx={{ fontSize: '18px' }}>
          {loginData?.firstName?.charAt(0)?.toUpperCase() + loginData?.firstName?.substring(1) + ' ' + loginData?.lastName?.charAt(0)?.toUpperCase() + loginData?.lastName?.substring(1)}
        </Typography>
      </MenuItem>
      <Divider sx={{ margin: '0px!important' }} />
      <MenuItem onClick={() => { setChangePassModelOpen(true); handleProfileMenuClose() }} sx={{ color: 'rgba(0,0,0,0.7)' }}>
        <ListItemIcon>
          <MdOutlinePassword size={22} className='primary-color' />
        </ListItemIcon>
        ChangePassword
      </MenuItem>
      <Divider sx={{ margin: '0px!important' }} />
      <MenuItem onClick={() => { localStorage.removeItem('userLoginToken'); handleProfileMenuClose(); history.push('/login') }} sx={{ color: 'rgba(0,0,0,0.7)' }}>
        <ListItemIcon>
          <IoLogOutOutline size={22} className='primary-color' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  )



  return (
    <Box sx={{ display: 'flex' }}>


      <AppBar position="fixed" sx={{ backgroundColor: '#fff' }} open={open}>
        <Toolbar >

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <IoMenu className='primary-color' size={28} />
          </IconButton>

          <Typography className='primary-color' variant="h6" noWrap component="div">
            Employee Management System
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Account settings">
            <Stack direction={'row'} onClick={handleProfileMenuOpen} sx={{ cursor: 'pointer' }} >
              <Avatar alt="Profile" sx={{ width: isSm ? 34 : 38, height: isSm ? 34 : 38 }} src={`http://localhost:3000/images/${loginData?.userImage[0]}`}></Avatar>
              {
                !isSm ? (
                  <Button
                    size='small'
                    variant="contained"
                    disableElevation
                    endIcon={<TiArrowSortedDown />}
                    disableRipple
                    sx={{ textTransform: 'capitalize', fontSize: "16px", paddingRight: "0px" }}
                    className='profileBTN'
                  >
                    {loginData?.firstName?.charAt(0).toUpperCase() + loginData?.firstName?.substring(1) + ' ' + loginData?.lastName?.charAt(0) + loginData?.lastName?.substring(1)}
                  </Button>) : null
              }
            </Stack>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer variant={'permanent'} open={open}>
        <DrawerHeader>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>

            <img src={AppLogo} height='30px' width='45px' className='mb-6px' alt="Applogo" />

            <Typography
              variant="h6"
              noWrap
              component="a"
              className='primary-color'
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: 0.5,
                color: 'inherit',
                textDecoration: 'none',
                marginRight: '30px'
              }}
            >
              E.M.P
            </Typography>
          </Stack>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' ? <FaAngleRight size={20} /> : <FaAngleLeft size={20} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideBar.map((page) => (
            <ListItem onClick={() => { history.push(page.path); setOpen(false) }} key={page.name} disablePadding sx={{ display: 'block', paddingTop: '5px' }}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, backgroundColor: (pathname === page.path) ? '#eaecf8' : null, '&:hover': { backgroundColor: '#eaecf8' } }}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.name} sx={{ opacity: open ? 1 : 0, color: 'rgba(0,0,0,0.6)' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <List>
          <ListItem onClick={() => { localStorage.removeItem('userLoginToken'); history.push('/login') }} key={'Logout'} disablePadding sx={{ display: 'block', paddingTop: '5px' }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, '&:hover': { backgroundColor: '#eaecf8' } }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
                <IoLogOutOutline size={22} className='primary-color' />
              </ListItemIcon>
             <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0, color: 'rgba(0,0,0,0.6)' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <ChangePassword changePassModelOpen={changePassModelOpen} setChangePassModelOpen={setChangePassModelOpen} />

      <Box component="main" className='default-bgcolor' sx={{ flexGrow: 1, p: 3, overflowX: 'hidden' }}>
        <DrawerHeader />

        <Container sx={{ paddingLeft: isSm ? '0px' : '24px', paddingRight: isSm ? '0px' : '24px' }} maxWidth='lg'>
          <Switch>

            <Route exact path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/dashboard/employeedetails'>
              <EmployeeDetail />
            </Route>
            <Route path='/dashboard/jobcategory'>
              <JobCategory />
            </Route>

          </Switch>
        </Container>

      </Box>
      {renderProfileMenu}
    </Box>
  )
}

export default DashboardMainPage