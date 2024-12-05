import { Box, Typography } from "@mui/material"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useAuth } from "../Authentication/Authentication";
import { useState, useEffect, useContext } from "react";
import { NotifyFetch } from "~/REST-API-client";
import { ChatContext } from "~/pages/ChatProvider/ChatProvider";
const Notify = () => {
    const auth = useAuth();
    const [countBookingNoti, setCountBookingNoti] = useState(0);
   
    const { unreadBookingNotifies, setUnreadBookingNotifyes } = useContext(ChatContext);

    const fetchNotify = () => {
        if (!auth.user) return

        NotifyFetch.getNotify({
            receiverId: auth.user._id,
            type: "booking",
            isReading: false
        })
            .then(data => {
                console.log("booking notify: ", data);
                setUnreadBookingNotifyes([...data.data])
            })
            .catch(err => {
                console.log("loi", err)

            })
    }
    useEffect(() => {
        setCountBookingNoti(unreadBookingNotifies.length);
    }, [unreadBookingNotifies])
    useEffect(() => {
        fetchNotify()
    }, [auth.user])

    if (auth.user === null) {
        return (
            null
        )
    }
    return (
        <Box sx={{ cursor: "pointer", position: "relative" }}>
            <Box >
                <NotificationsActiveIcon sx={{ color: "#de5945" }} />
            </Box>
            {
                countBookingNoti !== 0 &&
                <Box sx={{
                    display: "flex", alignItems: 'center', justifyContent: "center",
                    width: "15px", height: "15px", borderRadius: "50%",
                    backgroundColor: "#45d062",
                    position: "absolute", right: "-10px", top: "-10px"
                }}>
                    <Typography sx={{ color: "#fff", fontSize: "0.8rem" }}>{countBookingNoti}</Typography>
                </Box>
            }

        </Box>
    )
}
export default Notify