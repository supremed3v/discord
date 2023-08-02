import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Home as HomeIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, Route, Routes, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // ... your other styles here
  miniDrawerPaper: {
    width: theme.spacing(9), // Set the width for the mini sidebar
    // backgroundColor: "#000", // Set your desired background color for the mini sidebar here
  },
  miniDrawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  miniListItemIcon: {
    justifyContent: "center",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerItems = [
    { label: "Home", icon: <HomeIcon />, to: "/dashboard" },
    { label: "Inbox", icon: <InboxIcon />, to: "/dashboard/inbox" },
    { label: "Mail", icon: <MailIcon />, to: "/dashboard/mail" },
  ];

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: open ? classes.drawerPaper : classes.miniDrawerPaper,
        }}
      >
        {open ? (
          <>
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                <MenuIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {drawerItems.map(({ label, icon, to }) => (
                <ListItem
                  button
                  key={label}
                  component={Link}
                  to={to}
                  selected={location.pathname === to}
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <div className={classes.miniDrawerHeader}>
            <IconButton onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          </div>
        )}
      </Drawer>
      <main
        className={`${classes.content} ${open ? classes.contentShift : ""}`}
      >
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Outlet />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="mail" element={<Mail />} />
          {/* Additional routes can be added here */}
        </Routes>
      </main>
    </div>
  );
};

const Home = () => <Typography variant="h4">Home Page</Typography>;
const Inbox = () => <Typography variant="h4">Inbox Page</Typography>;
const Mail = () => <Typography variant="h4">Mail Page</Typography>;

export default Dashboard;
