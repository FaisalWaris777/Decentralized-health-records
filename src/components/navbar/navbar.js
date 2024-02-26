import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box
} from "@mui/material";
import Divider from '@mui/material/Divider';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Mail as MailIcon,
  Info as InfoIcon,
  ExitToApp as LogoutIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  ContactSupport as ContactIcon,
  InfoOutlined as AboutUsIcon
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // const handleLogout = () => {
  //   // Perform logout logic here
  //   props.setLoggedIn(false);
  //   navigate("/login");
  // };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/' },
    { text: 'Search Records', icon: <SearchIcon />, link: '/search-records' },
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
    { text: 'Contact us', icon: <ContactIcon />, link: '/contactus' },
    { text: 'About us', icon: <AboutUsIcon />, link: '/aboutus' },
  ];

  return (
    // <Box sx={{ flexGrow: 1, display: 'flex' }}>
    <Box>
      <AppBar
        position="static"
        sx={{
          width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
          ml: drawerOpen ? `${drawerWidth}px` : 0,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" style={{fontWeight:'bold'}}>
            <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}>
              Decentralized Health Records
              </Link>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.link} onClick={handleDrawerClose}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List> */}
      </Drawer>
    </Box>
  );
}
