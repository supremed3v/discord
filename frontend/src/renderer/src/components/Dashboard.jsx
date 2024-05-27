import React, { useState } from "react";
import {
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
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: "#2f3241",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#2f3241",

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  miniDrawerPaper: {
    width: "90px",
    backgroundColor: "#2f3241",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    alignItems: "center",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    color: "#86a5b1",
  },
  miniDrawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    color: "#86a5b1",
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  contentShift: {
    [theme.breakpoints.up("md")]: {
      marginLeft: -1, // Add 1px to ensure the content doesn't overlap with the mini sidebar
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    marginLeft: 0,
  },
  miniListItemIcon: {
    justifyContent: "center",
    color: "#86a5b1",
    alignItems: "center",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const location = useLocation();

  const { user } = useAuth();


  const drawerItems = [
    { label: "Home", icon: <HomeIcon />, to: "account" },
    { label: "Inbox", icon: <InboxIcon />, to: "inbox" },
    { label: "Mail", icon: <MailIcon />, to: "mail" },
  ];

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.miniDrawerPaper,
        }}
      >
        <div className={classes.miniDrawerHeader}>discord</div>
        <Divider />
        <List>
          {drawerItems.map(({ label, icon, to }) => (
            <ListItem
              button
              key={label}
              component={Link}
              to={to}
              selected={location.pathname.includes(to)}
              style={
                location.pathname.includes(to)
                  ? { backgroundColor: "#3f444f" }
                  : {}
              }
            >
              <ListItemIcon className={classes.miniListItemIcon}>
                {icon}
              </ListItemIcon>
              {/* {open && <ListItemText primary={label} />} */}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={`${classes.content}`}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="account" element={<Home />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="mail" element={<Mail />} />
        </Routes>
      </main>
    </div>
  );
};

const Inbox = () => <Typography variant="h4">Inbox Page</Typography>;
const Mail = () => <Typography variant="h4">Mail Page</Typography>;

export default Dashboard;
