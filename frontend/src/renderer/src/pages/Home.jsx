import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";
import { Divider, TextField, Box, Button } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import axios from "axios";
import Friends from "../components/Friends";
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
  const { user } = useAuth();
  console.log(user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/search?q=${search}`
        );
        console.log(res.data);
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      }
    };

    if (search !== "") {
      fetchSearchResults();
    }
  }, [search]);

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
        <Tab
          {...a11yProps(0)}
          icon={<PersonSearchIcon />}
          label="Search..."
          iconPosition="start"
        />

        <Tab
          {...a11yProps(1)}
          icon={<GroupIcon />}
          label="Friends"
          iconPosition="start"
        />
        <Tab
          label="Stage Discovery"
          icon={<ConnectWithoutContactIcon />}
          iconPosition="start"
          {...a11yProps(2)}
        />
        <Tab
          label="Library"
          icon={<BusinessCenterIcon />}
          iconPosition="start"
          {...a11yProps(3)}
        />
        <Tab label="Nitro" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="filled-basic"
            placeholder="Find or start a conversation"
            variant="filled"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            sx={{
              marginLeft: "10px",
            }}
            variant="contained"
          >
            Search
          </Button>
        </Box>
        {search !== "" && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {searchResults.map((result) => (
              <Box key={result.username}>
                <Typography>{result.username}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Friends userData={user} />
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
