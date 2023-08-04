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
import { Link, Route, Routes, Outlet, useLocation } from "react-router-dom";
import Home from "../pages/Home";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#86a5b1",
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
    width: theme.spacing(9),
    backgroundColor: "#2f3241",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    alignItems: "center",
    // justifyContent: "center",
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
    padding: theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
        <div className={open ? classes.drawerHeader : classes.miniDrawerHeader}>
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              <MenuIcon style={{ color: "#86a5b1" }} />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <MenuIcon style={{ color: "#86a5b1" }} />
            </IconButton>
          )}
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
              <ListItemIcon className={open ? "" : classes.miniListItemIcon}>
                {icon}
              </ListItemIcon>
              {open && <ListItemText primary={label} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={`${classes.content} ${open ? classes.contentShift : ""}`}
      >
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="mail" element={<Mail />} />
          {/* Additional routes can be added here */}
        </Routes>
      </main>
    </div>
  );
};

const Inbox = () => <Typography variant="h4">Inbox Page</Typography>;
const Mail = () => <Typography variant="h4">Mail Page</Typography>;

export default Dashboard;
