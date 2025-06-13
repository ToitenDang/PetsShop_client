import { Box, Typography, Tooltip } from "@mui/material";
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
    const {
        createChat,
        notifications,
        updateCurrentChat,
        sendTextMessage,
        currentChat,
        messages,
        isMessagesLoading,
        updateNotifications,
        unReadNotifications,
        updateUnreadNotifications
    } = useContext(ChatContext);
    const [textMessage, setTexMessage] = useState("");
    const [chatCount, setChatCount] = useState(0);
    const auth = useAuth();
    const scroll = useRef();

    useEffect(() => {
        NotifyFetch.getNotify({ receiverId: auth.user._id, isReading: false, type: "message" })
            .then(data => {
                if (data.data.length > 0) {
                    setChatCount(data.data.length);
                    updateUnreadNotifications([...unReadNotifications, ...data.data])
                }
            }).catch(err => {
                console.log("err get unread message: ", err);
            })
    }, []);

    useEffect(() => {
        const unreadNotifications = unReadNotifications.length;
        setChatCount(unreadNotifications);
    }, [notifications, unReadNotifications]);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSwitchBox = async () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            try {
                await createChat(auth.user._id, ADMIN_ID);
                const getChat = await ChatFetch.findChat(auth?.user._id, ADMIN_ID);
                updateCurrentChat(getChat.data[0]);

                if (unReadNotifications.length > 0) {
                    NotifyFetch.updateManyNotify(ADMIN_ID, auth.user._id, "message", "updated")
                        .then(() => {
                            updateUnreadNotifications([]);
                        })
                        .catch(err => console.log("Lỗi xóa tin nhắn: ", err));
                }
            } catch (err) {
                console.log("Lỗi lấy tin nhắn: ", err);
            }
        } else {
            updateCurrentChat(null);
        }
    };

    return (
        <Box className={isOpen ? myStyle.boxContainer : `${myStyle.boxContainer} ${myStyle.off}`}
            sx={{ width: { xs: "300px", sm: "320px" }, height: "100%", display: "flex", flexDirection: "column", position: "relative" }}
        >
            {/* HEADER */}
            <Box sx={{
                position: "sticky", top: 0, zIndex: 10, backgroundColor: "#fff", p: 1,
                display: "flex", alignItems: "center", gap: 2, borderBottom: "1px solid #ccc"
            }}>
                <button onClick={handleSwitchBox} className={myStyle.expandButton}>
                    {isOpen ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />}
                </button>
                <Typography>Chat với chúng tôi</Typography>
                {chatCount !== 0 && (
                    <Box sx={{
                        width: 20, height: 20, backgroundColor: "#dc3546", borderRadius: "50%",
                        display: "flex", justifyContent: "center", alignItems: "center"
                    }}>
                        <Typography sx={{ fontSize: "0.7rem", color: "#fff" }}>{chatCount}</Typography>
                    </Box>
                )}
            </Box>

            {/* BODY */}
            {isOpen && (
                isMessagesLoading ? "Đang tải tin nhắn..." : (
                    <>
                        <Box sx={{
                            flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2,
                            padding: "12px", backgroundColor: "#f7f7f7"
                        }}>
                            {messages && messages.map((message, index) => (
                                <Box
                                    key={index}
                                    ref={scroll}
                                    sx={{
                                        backgroundColor: message.senderId === auth.user._id ? "#397ede" : "#6f706f",
                                        color: "#fff",
                                        maxWidth: "60%",
                                        alignSelf: message.senderId === auth.user._id ? "flex-end" : "flex-start",
                                        wordBreak: "break-word",
                                        padding: "10px",
                                        borderRadius: "4px"
                                    }}
                                >
                                    <Typography>{message.text}</Typography>
                                    <Typography sx={{ fontSize: "0.7rem" }}>
                                        {dayjs(message.createdAt).format("DD/MM/YYYY HH:mm")}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* INPUT AREA */}
                        <Box sx={{
                            display: "flex", alignItems: "flex-end", p: 1,
                            borderTop: "1px solid #ccc", gap: 1, backgroundColor: "#fff"
                        }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <InputEmoji
                                    value={textMessage}
                                    onChange={setTexMessage}
                                    cleanOnEnter={false}
                                    style={{
                                        width: "100%",
                                        maxHeight: "100px",
                                        overflowY: "auto",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        overflowWrap: "anywhere"
                                    }}
                                />
                            </Box>
                            <Tooltip title="Gửi tin nhắn">
                                <button
                                    onClick={() => sendTextMessage(textMessage, auth.user, currentChat._id, setTexMessage)}
                                    style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", marginBottom: "10px" }}
                                >
                                    <SendIcon sx={{ color: "#397ede" }} />
                                </button>
                            </Tooltip>
                        </Box>
                    </>
                )
            )}
        </Box>
    );
};

export default ChatBox;