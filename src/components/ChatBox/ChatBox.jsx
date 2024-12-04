import { Box, Typography, Tooltip, Button } from "@mui/material";
import myStyle from "./Chatbox.module.scss";
import { useState, useContext, useRef, useEffect } from "react";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { ChatContext } from "~/pages/ChatProvider/ChatProvider";
import { useAuth } from "../Authentication/Authentication";
import { ADMIN_ID } from "~/utils/constants";
import dayjs from "dayjs";
import InputEmoji from "react-input-emoji";
import SendIcon from '@mui/icons-material/Send';
import { ChatFetch, NotifyFetch } from "~/REST-API-client";

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { createChat, notifications, updateCurrentChat, sendTextMessage, currentChat, messages, isMessagesLoading,
        updateNotifications, unReadNotifications, updateUnreadNotifications
    } = useContext(ChatContext);
    const [textMessage, setTexMessage] = useState("");
    const [chatCount, setChatCount] = useState(0);
    const auth = useAuth();
    const scroll = useRef();
    useEffect(() => {
        const fetchUnreadMessage = () => {
            NotifyFetch.getNotify({ receiverId: auth.user._id, isReading: false, type: "message" })
                .then(data => {
                    // console.log("unread message: ", data)
                    if (data.data.length > 0) {
                        setChatCount(data.data.length);
                        updateUnreadNotifications([...unReadNotifications, ...data.data])
                    }

                })
                .catch(err => {
                    console.log("err get unread message: ", err);
                })
        }
        fetchUnreadMessage();
    }, [])
    useEffect(() => {
        const unreadNotifications = unReadNotifications.length;
        setChatCount(unreadNotifications);
    }, [notifications,unReadNotifications])
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    const handleSwitchBox = async () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            try {
                await createChat(auth.user._id, ADMIN_ID);
                const getChat = await ChatFetch.findChat(auth?.user._id, ADMIN_ID);
                console.log("get new current chat: ", getChat.data);
                updateCurrentChat(getChat.data[0]);
                if (unReadNotifications.length > 0) {
                    NotifyFetch.updateManyNotify(ADMIN_ID, auth.user._id, "message", "updated")
                        .then(data => {
                            updateUnreadNotifications([]);
                            console.log("Đã xóa nội dun tin nhắn")
                        })
                        .catch(err => {
                            console.log("Lỗi xóa tin nhắn: ", err)
                        })
                }

            } catch (err) {
                console.log("Lỗi lấy tin nhắn: ", err);
            }
        } else {
            updateCurrentChat(null);
        }
    }
    return (
        <Box className={isOpen ? myStyle.boxContainer : `${myStyle.boxContainer} ${myStyle.off}`} >
            <Box sx={{ display: "flex", gap: 2 }}>
                <button onClick={handleSwitchBox} className={myStyle.expandButton}>
                    {
                        isOpen ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />
                    }

                </button>
                <Typography>Chat với chúng tôi</Typography>
                {
                    chatCount !== 0 ?
                        (
                            <Box sx={{ width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#dc3546", borderRadius: "50%" }}>
                                <p style={{
                                    fontSize: "0.7rem",
                                    display: "inline-block",     // Hoặc "block" nếu cần canh chỉnh theo layout
                                    whiteSpace: "nowrap",        // Hiển thị nội dung trên một hàng duy nhất
                                    overflow: "hidden",          // Ẩn phần văn bản bị tràn
                                    textOverflow: "ellipsis",
                                    margin: 0,
                                    color: "#fff"
                                }} >{chatCount}</p>
                            </Box>
                        ) : null
                }

            </Box>
            {
                isOpen && (
                    isMessagesLoading ? "Đang tải tin nhắn..." :
                        <>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minHeight: `calc( 100% - 70px)`, maxHeight: `calc( 100% - 70px)`, overflowY: 'auto' }}>
                                {
                                    messages && messages.map((message, index) => {
                                        return (
                                            <Box
                                                ref={scroll}
                                                sx={{
                                                    backgroundColor: message.senderId === auth.user._id ? "#397ede" : "#6f706f",
                                                    maxWidth: "60%",
                                                    display: "inline-block",
                                                    wordBreak: "break-word",
                                                    wordWrap: "break-word",
                                                    padding: "10px",
                                                    borderRadius: "4px",
                                                    alignSelf: message.senderId === auth.user._id ? "flex-end" : "flex-start"
                                                }}
                                                key={index}>
                                                <Typography sx={{ color: "#fff" }} >{message.text}</Typography>
                                                <Typography sx={{ color: "#fff", fontSize: "0.7rem" }}>{dayjs(message.createdAt).format("DD/MM/YYYY HH:mm")}</Typography>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <InputEmoji value={textMessage} onChange={setTexMessage} style={{ width: "100%", maxWidth: "100%" }} />
                                <Tooltip title="Gửi tin nhắn">
                                    <button onClick={() => sendTextMessage(textMessage, auth.user, currentChat._id, setTexMessage)} style={{ border: "none", backgroundColor: "transparent", cursor: "pointer" }}><SendIcon sx={{ color: "#397ede" }} /></button>
                                </Tooltip>
                            </Box>
                        </>
                )
            }

        </Box>
    )
}

export default ChatBox;