import axios from "axios";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const initialState = {
    friends: null,
    incomingFriendRequests: null,
    friendRequestsSent: null,
    myChannels: null,
    createdChannels: null,
};

const FetchContext = createContext(initialState);

export const FetchContextProvider = ({ children }) => {
    const [dataState, setDataState] = useState(initialState);
    const { user, jwt } = useAuth();

    const baseUrl = "http://localhost:5000/api/user";

    const fetchSentRequests = useCallback(async () => {
        try {
            const res = await axios.get(`${baseUrl}/my-friend-requests`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (res.status === 200) {
                setDataState((prevState) => ({
                    ...prevState,
                    friendRequestsSent: res.data,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }, [jwt]);

    const fetchIncomingRequest = useCallback(async () => {
        try {
            const res = await axios.get(`${baseUrl}/incoming-friend-requests`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (res.status === 200) {
                setDataState((prevState) => ({
                    ...prevState,
                    incomingFriendRequests: res.data,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }, [jwt]);

    const fetchFriends = useCallback(async () => {
        try {
            const res = await axios.get(`${baseUrl}/my-friends`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (res.status === 200) {
                setDataState((prevState) => ({
                    ...prevState,
                    friends: res.data,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }, [jwt]);

    useEffect(() => {
        if (jwt && user) {
            fetchFriends();
            fetchSentRequests();
            fetchIncomingRequest();
        }
    }, [jwt, user, fetchFriends, fetchSentRequests, fetchIncomingRequest]);

    // create a function for invoking incoming friend requests, sent requests and friends fetch functions globally to avoid code repetition in components

    const fetchAllData = useCallback(() => {
        fetchFriends();
        fetchSentRequests();
        fetchIncomingRequest();
    }, [fetchFriends, fetchSentRequests, fetchIncomingRequest]);



    return (
        <FetchContext.Provider value={{ ...dataState, fetchSentRequests, fetchIncomingRequest, fetchAllData }}>
            {children}
        </FetchContext.Provider>
    );
};

export const useFetchCtx = () => useContext(FetchContext);
