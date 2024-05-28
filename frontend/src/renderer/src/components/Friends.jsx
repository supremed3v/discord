import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useFetchCtx } from "../context/FetchContext";
const Friends = () => {
  const { user, jwt, loadUser } = useAuth();

  const { friends, incomingFriendRequests, friendRequestsSent } = useFetchCtx();

  const handleAcceptRequest = async (friendId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/user/friend-request/accept`, {
        friendId,
        userId: user._id
      },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            contentType: "application/json",
          }
        }
      )

      console.log("Accepted Req: ", res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
    >
      <Typography
        variant="h5">Friends</Typography>
      {friends?.map((friend) => (
        <Box key={friend._id}>
          <Typography>{friend.username}</Typography>
        </Box>
      ))}
      <Divider />
      <Typography>Sent Requests</Typography>
      {friendRequestsSent?.map((request) => (
        <Box key={request._id}>
          <Typography>{request.username}</Typography>
        </Box>
      ))}

      {incomingFriendRequests?.map((request) => (
        <Box key={request._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          width={"100%"}
          paddingY={2}
        >
          <Typography>{request.username}</Typography>
          <Button
            onClick={() => handleAcceptRequest(request._id)}
            variant="contained"
            color="primary"
          >Accept</Button>
        </Box>
      ))}
    </Box>
  );
};

export default Friends;
