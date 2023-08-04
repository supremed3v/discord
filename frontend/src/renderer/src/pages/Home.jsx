import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider, TextField } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [search, setSearch] = React.useState("");

  return (
    <Box
      sx={{
        flexGrow: 1,
        // bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
        justifyContent: "left",
        alignItems: "left",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "240px" }}
      >
        <TextField
          id="filled-basic"
          placeholder="Find or start a conversation"
          variant="filled"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Divider
          sx={{
            bgcolor: "#86a5b1",
          }}
        />
        <Tab
          {...a11yProps(0)}
          icon={<GroupIcon />}
          label="Friends"
          iconPosition="start"
        />
        <Tab
          label="Stage Discovery"
          icon={<ConnectWithoutContactIcon />}
          iconPosition="start"
          {...a11yProps(1)}
        />
        <Tab
          label="Library"
          icon={<BusinessCenterIcon />}
          iconPosition="start"
          {...a11yProps(2)}
        />
        <Tab label="Nitro" {...a11yProps(3)} />
        <Tab label="Item Six" {...a11yProps(4)} />
        <Tab label="Item Seven" {...a11yProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
    </Box>
  );
}
