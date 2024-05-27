import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const Friends = () => {
  const { user, jwt } = useAuth();

  const [sentReq, setSentRequests] = React.useState([]);
  const [incReq, setIncRequests] = React.useState([]);



  React.useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/my-friend-requests`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        console.log(res.data);
        setSentRequests(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIncomingRequest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/incoming-friend-requests`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        console.log(res.data);
        setIncRequests(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIncomingRequest();
    fetchSentRequests();
  }, [])
  console.log(user);
  console.log(sentReq);
  console.log("inc requests", incReq);
  return (
    <Box>
      <Typography>Friends</Typography>
      <Divider />
      <Typography>Sent Requests</Typography>
      {sentReq?.map((request) => (
        <Box key={request._id}>
          <Typography>{request.username}</Typography>
        </Box>
      ))}

      {incReq?.map((request) => (
        <Box key={request._id}>
          <Typography>{request.username}</Typography>
          <Button>Accept</Button>
        </Box>
      ))}
    </Box>
  );
};

export default Friends;
