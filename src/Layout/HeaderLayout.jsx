import Appbar from "~/components/Appbar/Appbar";
import { Outlet } from 'react-router-dom';
import Footer from "~/components/Footer/Footer";
import { useAuth } from "~/components/Authentication/Authentication";
import ChatBox from "~/components/ChatBox/ChatBox";
import { Box } from "@mui/material";
import ChatBot from "~/components/ChatBot/ChatBot";

function HeaderLayout() {
    const auth = useAuth();
    return (
        <>
            <Appbar />
            {
                auth.user && (
                    <Box sx={{position:"fixed", bottom:"0", right:"100px",zIndex:"100"}}>
                        <ChatBox />
                    </Box>
                )
            }
            <Outlet /> {/* Nơi chứa các component con */}
            <ChatBot />
            <Footer />
        </>
    );
}

export default HeaderLayout;